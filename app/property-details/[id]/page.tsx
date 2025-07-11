'use client'
import { useParams } from 'next/navigation'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Navbar from "../../../components/Navbar/Navbar";
import { useAppSelector, useAppDispatch } from '@/app/hook'
import Button from "../../../components/Button/Button";
import {IoMdStar, IoMdStarOutline} from "react-icons/io";
import {FiShare} from "react-icons/fi";
import Slider from "../../../components/Slider/Slider";
import agent from "@/public/images/Perfecto Homes Final Logo .png";
import AgentFrom from "../../../components/AgentForm/AgentForm";
import PaymentCalculator from "../../../components/PaymentCalculator/PaymentCalculator";
import Cards from "../../../components/Cards/Cards";
import GoogleMaps from "../../../components/GoogleMaps";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";
import {ToastContainer, toast} from "react-toastify";
import axios, { AxiosError } from "axios";
import {getCookie} from "../../../utils/helper_async";
import {FaPen} from "react-icons/fa";
import LoanModal from "../../../components/Modal/LoanModal";
import OfferingModal from '@/components/Modal/OfferingModal';
import Footer from "../../../components/Footer/Footer";
import 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import {Bar} from "react-chartjs-2";
import {Properties, UserState} from "@/app/types/DefaultType";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PropertyDetails = () => {
    const id = useParams<{ id: string }>().id
    const navigate = useRouter();

    const [visibleSchools,
        setVisibleSchools] = useState<number>(4);
    const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
    const [othersMonthlyPayment, setothersMonthlyPayment] = useState<number | null>(null);
    const [showMore,
        setShowMore] = useState(true);
    const [properties,
        setProperties] = useState<Properties>();
    const [loading,
        setLoading] = useState(true);
    const [similarProperties,
        setSimilarProperties] = useState<Properties[]>([]);
    const [showFullDescription,
        setShowFullDescription] = useState(false);
    const [isModalOpen,
        setIsModalOpen] = useState(false);
    const access_token = getCookie("access_token");

    const user = useAppSelector((state) => state.users.user);

    const dispatch = useAppDispatch();

    const handleToggleView = () => {
        if (showMore) {
            setVisibleSchools(schools.length);
        } else {
            setVisibleSchools(4);
        }
        setShowMore(!showMore);
    };


    const fetchPropertyDetails = async() => {
        try {
            console.log("fetching...")
            const url = await access_token
                ? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/crud/property?id=${id}`
                : `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/api/crud/property?id=${id}`;

            const response = await fetch(url);
            console.log(response)
            if (!response.ok) {
                throw new Error("Failed to fetch property details");
            }
            const data = await response.json();
            
            setProperties(data);
            console.log(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching property details:", error);
        }
    };

    useEffect(() => {
        const fetchSimilarProperties = async() => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/similarProperties`);
                if (!response.ok) {
                    throw new Error("Failed to fetch similar properties");
                }
                const data = await response.json();
                setSimilarProperties(data);
            } catch (error) {
                console.error("Error fetching similar properties:", error);
            }
        };

        fetchPropertyDetails();
        fetchSimilarProperties();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <CustomLoader loading={undefined}/>
            </div>
        );
    }

    const transformKeyForDisplay = (key : string) => {
        return key
            .split(/(?=[A-Z])/)
            .map((word : string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const renderList = (data : string) => {
        return (
            <ul className="pl-5 list-disc mt-2">
                {Object.entries(data)
                    .map(([key, value]) => (
                        <li key={key}>
                            <span>{transformKeyForDisplay(key)}:</span>
                            {value}
                        </li>
                    ))}
            </ul>
        );
    };

    const {
        name,
        image,
        price,
        address,
        beds,
        baths,
        sqft,
        schools,
        propertyListingDetails,
        amenities,
        buildingInfo,
        propertyHistory,
        homeFacts,
        latitude,
        longitude,
        description,
        propertyInformation,
        publicRecords,
        wishlisted,
        propertyImages,
        downPayment = (price * 0.2),
        terms = 30,
    } = (properties as unknown as Properties);

    const goToPropertyDetails = (id : string) => {
        navigate?.push(`/property-details/${id}`);
        window.scrollTo({top: 0, behavior: "smooth"});
    };

    const copyToClipboard = async() => {
        try {
            await navigator
                .clipboard
                .writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        } catch (err) {
            toast.error("Failed to copy the link");
        }
    };

    const handleSaveProperty = async() => {
        if (!access_token) {
            toast.error("Please login first.");
            return;
        }

        try {
            const reponse = await axios.post(`${process.env.REACT_APP_API_URL}/wishlist/add/${id}`, {}, { // Empty payload
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            if (reponse.status === 200) {
                toast.success("Property saved successfully to wishlist");
                fetchPropertyDetails();
            } else {
                toast.error("Failed to save property");
            }
        } catch (error) {
            console.error("Error saving property:", error);
            toast.error("Failed to save property");
        }
    };

    const handleRemoveProperty = async() => {
        try
        {
            const reponse = await axios.post(`${process.env.REACT_APP_API_URL}/wishlist/remove/${id}`, {}, { // Empty payload
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            if (reponse.status === 200) {
                toast.success("Property removed successfully from wishlist");
                fetchPropertyDetails();
            } else {
                toast.error("Failed to remove property");
            }
        } catch (error) {
            console.error("Error removing property:", error);
            toast.error("Failed to remove property");
        }
    };

    const handleSaveLoanDetails = (loanDetails : any) => {
        console.log("Saved loan details:", loanDetails);
        setIsModalOpen(false);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const truncateDescription = (text : string, wordLimit : number) => {
        const words = text.split(" ");
        if (words.length <= wordLimit) {
            return text;
        } else {

            return words?.slice(0, wordLimit).join(" ") + "...";
        }
    };

    const wordLimit = 100;
    const displayDescription = showFullDescription
        ? description
        : truncateDescription(description, wordLimit);

    // Monthly Payment Calculationconst
    const calculateMonthlyPayment = (principal : number, rate : number, term : number) => {
        const monthlyRate = rate / 100 / 12;
        const numPayments = term * 12;
        return ((principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments))).toFixed(2);
    };

    // Calculating "Others Monthly Payment"
    const othersInterestRate = 7.25; //  interest rate for others const
    const principal = price - downPayment;

    // Bar chart data and optionsconst
    const data = {
        labels: [
            "Perfecto Monthly Payment", "Others Monthly Payment"
        ],
        datasets: [
            {
                label: "Monthly Payments",
                data: [
                    monthlyPayment, othersMonthlyPayment
                ],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)"
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"
                ],
                borderWidth: 1,
                barThickness: 80,
                maxBarThickness: 80
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem : {
                        raw: any;
                    }) {
                        const value = tooltipItem.raw;
                        return `$${value.toLocaleString()}`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    callback: function (value : any, index : number) {
                        return data.labels[index];
                    }
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value : {
                        toLocaleString: () => string;
                    }) {
                        return "$" + value.toLocaleString();
                    }
                }
            }
        }
    };

    return (
        <div className="min-h-screen overflow-x-hidden">
            <LoanModal
                isOpen={isModalOpen}
                onCloseModal={() => setIsModalOpen(false)}
                onSave={handleSaveLoanDetails}
                propertyId={id}/>
            <div className="w-full z-10 px-4 border-b">
                <Navbar searchedValue={undefined} setSearch={undefined} onPlaceSelect={undefined} properties={undefined} setProperties={undefined}/>
            </div>
            <div className="px-[150px] mt-2 sm:block hidden ">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-black text-[20px] font-semibold">{name}</h2>
                        <p className="text-[#6c6c6c]">{address}</p>
                    </div>
                    <div className="flex">
                        <div className="text-center border-r my-4 px-4">
                            <h2 className="text-black text-[20px] font-semibold">
                                ${price.toLocaleString()}
                            </h2>
                            <p className="text-[#6c6c6c]">Price</p>
                        </div>
                        <div className="text-center border-r my-4 px-4">
                            <h2 className="text-black text-[20px] font-semibold">
                                ${monthlyPayment ? monthlyPayment.toLocaleString() : calculateMonthlyPayment(price, 7.25, terms) }
                            </h2>
                            <p className="text-[#6c6c6c]">Monthly</p>
                        </div>
                        <div className="text-center border-r my-4 px-4">
                            <h2 className="text-black text-[20px] font-semibold">{beds}</h2>
                            <p className="text-[#6c6c6c]">Beds</p>
                        </div>
                        <div className="text-center border-r my-4 px-4">
                            <h2 className="text-black text-[20px] font-semibold">{baths}</h2>
                            <p className="text-[#6c6c6c]">Baths</p>
                        </div>
                        <div className="text-center my-4 px-4">
                            <h2 className="text-black text-[20px] font-semibold">
                                {sqft}
                                <span className="font-normal text-[16px]">Sq. Ft.</span>
                            </h2>
                            <p className="text-[#6c6c6c]">$1,175 / Sq. Ft.</p>
                        </div>
                        <div className="flex gap-4 items-center justify-center ml-2">
                            {wishlisted
                                ? (
                                    <Button variant="blue" onClick={handleRemoveProperty} className={undefined} placeholder={undefined}>
                                        <IoMdStar className="text-[24px] mr-2 text-white"/>
                                        Saved
                                    </Button>
                                )
                                : (
                                    <Button variant="blue" onClick={handleSaveProperty} className={undefined} placeholder={undefined}>
                                        <IoMdStarOutline className="text-[24px] mr-2 text-white"/>
                                        Save
                                    </Button>
                                )}
                            <Button
                                className={"border-[2px]"}
                                placeholder="Share"
                                variant="white"
                                onClick={copyToClipboard}>
                                <FiShare className="ml-2 text-[18px] text-[#f08e80] transform rotate-90"/>
                            </Button>
                            {user
                                ?.role === "admin" && (
                                    <Button onClick={() => setIsModalOpen(true)} className={undefined} placeholder={undefined} variant={undefined}>
                                        <FaPen className="text-[14px] mr-2"/>
                                        Edit
                                    </Button>
                                )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-[40px] ">
                <div className="border-b"></div>
            </div>
            <div
                className="grid sm:grid-cols-5 grid-cols-1 sm:px-[150px] px-0 sm:mt-4 gap-6">
                <div className="col-span-3">
                    <Slider propertyImages={propertyImages} image={image}/>
                    <div className="sm:hidden block px-[24px]">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-black text-[16px] font-semibold">
                                    {price}
                                </h2>
                                <p className="text-[#6c6c6c] text-[14px]">Price</p>
                            </div>
                            <div className="flex">
                                <div className="text-center px-2">
                                    <h2 className="text-black text-[16px] font-semibold">
                                        {beds}
                                    </h2>
                                    <p className="text-[#6c6c6c] text-[14px]">Beds</p>
                                </div>
                                <div className="text-center px-2">
                                    <h2 className="text-black text-[16px] font-semibold">
                                        {baths}
                                    </h2>
                                    <p className="text-[#6c6c6c] text-[14px]">Baths</p>
                                </div>
                                <div className="text-center px-2">
                                    <h2 className="text-black text-[16px] font-semibold">
                                        {sqft}{" "}
                                    </h2>
                                    <p className="text-[#6c6c6c] text-[14px]">$1,175 / Sq. Ft.</p>
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <h2 className="text-black text-[16px] font-semibold">{name}</h2>
                            <p className="text-[#6c6c6c] text-[14px]">{address}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button className="w-full" variant="blue" placeholder={undefined} onClick={undefined}>
                                <IoMdStarOutline className="text-[24px] mr-2 text-white"/>
                                Save
                            </Button>
                            <Button className={"border-[2px] w-full"} placeholder="Share" variant="white" onClick={undefined}>
                                <FiShare className="ml-2 text-[18px] text-[#f08e80] transform rotate-90"/>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-[18px] sm:px-0 px-[24px]">
                            {displayDescription}
                        </h3>
                        {description?.split(" ")
                                .length > wordLimit && (
                                <button
                                    className="text-[#f08e80] font-semibold hover:underline mt-2"
                                    onClick={toggleDescription}>
                                    {showFullDescription
                                        ? "See Less"
                                        : "See More"}
                                </button>
                            )}
                    </div>
                    {/* <div className="mt-[42px] sm:px-0 px-[24px]">
            <h3 className="font-semibold text-[24px]">Listing Agent</h3>
            <div className="flex items-center mt-4">
              <img className="w-[100px] h-[100px] rounded-full" src={agent} />
              <div className="ml-4 text-start">
                <p className="font-semibold sm:text-[18px] text-[16px] text-[#f08e80]">
                  Shana Rohde-Lynch
                </p>
                <div className="sm:flex items-center gap-[150px]">
                  <div className="sm:text-[16px] text-[14px]">
                    <p>Listing Agent</p>
                    <p>Compass</p>
                    <p>DRE #01079806</p>
                  </div>
                  <div className="text-[#6c6c6c] sm:text-[16px] text-[14px]">
                    <p>srl@compass.com</p>
                    <p>P: 415.264.7101</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
                    {amenities && Object
                        .keys(amenities)
                        .length > 0 && (
                        <div className="mt-[42px] sm:px-0 px-[24px]">
                            <h3 className="font-semibold text-[24px]">Amenities</h3>
                            <div className="grid grid-cols-2 gap-[40px] mt-4">
                                {Object
                                    .entries(amenities)
                                    .map(([
                                        title, value
                                    ], index) => (
                                        <React.Fragment key={`${title}-${index}`}>
                                            <div className="sm:py-2 py-1 border-b col-span-1 sm:text-[16px] text-[14px]">
                                                {value}
                                            </div>
                                        </React.Fragment>
                                    ))}
                            </div>
                        </div>
                    )}
                    <div className="mt-[42px] sm:px-0 px-[24px] min-w-[420px] block">
                        <h3 className="font-semibold text-[24px]">Location</h3>
                        <GoogleMaps
                locations={[{
                  latitude: latitude,
                  longitude: longitude,
                  propertyName: name,
                  propertyID: id
                }
                ]}
                isDetail={true} highlightedLocation={undefined} initialCenter={undefined}/>
                    </div>
                </div>

                <div className="col-span-2 mt-2 sm:px-0 px-[24px]">
                    {monthlyPayment && (
                        <div className="col-span-2 mt-2 sm:px-0 px-[24px]">
                            <p className="text-[14px] text-[#6c6c6c] font-semibold">
                                LISTING UPDATE
                            </p>
                            <div>
                                <div
                                    className="flex justify-between items-center sm:text-[16px] text-[14px] mt-2 border-b">
                                    <p>Monthly Payment</p>
                                    <p>
                                        <strong>${monthlyPayment
                                                ?.toLocaleString()}
                                            / month</strong>
                                    </p>
                                </div>
                                <div
                                    className="flex justify-between items-center sm:text-[16px] text-[14px] mt-2 border-b">
                                    <p>Down Payment</p>
                                    <p>
                                        <strong>${downPayment
                                                ?.toLocaleString()}
                                        </strong>
                                    </p>
                                </div>
                                <div
                                    className="flex justify-between items-center sm:text-[16px] text-[14px] mt-2 border-b">
                                    <p>Terms</p>
                                    <p>
                                        <strong>{terms}</strong>
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-semibold text-[20px]">Property Prices</h3>
                                    <div className="mt-2 h-auto w-auto">
                                        {monthlyPayment && <Bar data={data} options={options}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* <p className="text-[14px] text-[#6c6c6c] font-semibold">
            LISTING UPDATED: 05/24/2024 07:46 PM
          </p>
          <div>
            {Object.entries(propertyListingDetails).map(
              ([key, value], index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center sm:text-[16px] text-[14px] mt-2 ${index < Object.entries(propertyListingDetails).length - 1
                    ? "border-b"
                    : ""
                    }`}
                >
                  <p>{transformKeyForDisplay(key)}</p>
                  <p>
                    <strong
                      className={
                        key === "county" ? "underline text-[#5f218c]" : ""
                      }
                    >
                      {key === "lotSize" ? `${value} SqFt` : value}
                    </strong>
                  </p>
                </div>
              )
            )}
          </div> */}
                    <div className="flex items-center mt-2">
   
                    

                    </div>
                    <div className="mt-4">
                        <AgentFrom propertyId={id} />
                    </div>
                    <div className='mt-4'>
                        <OfferingModal propertyId={id} defaultPrice={price} defaultTerm={30}>

                        </OfferingModal>
                    </div>
                </div>
            </div>
            
            <div className="sm:px-[150px] px-[24px] py-10">
                <h2 className="text-[24px] font-semibold mb-2">Home Facts</h2>
                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-4">
                    {Object
                        .entries(homeFacts)
                        .map(([
                            key, value
                        ], index) => (
                            <React.Fragment key={`${key}-${index}`}>
                                <div
                                    className="grid sm:grid-cols-3 grid-cols-2 border-b text-[14px] sm:text-[16px]">
                                    <div>{transformKeyForDisplay(key)}</div>
                                    <div>
                                        <strong>
                                            {key === "aboveGradeFinishedSqFt" || key === "totalFinishedSqFt" || key === "lotSize"
                                                ? `${value} SqFt`
                                                : value}
                                        </strong>
                                    </div>
                                    <div></div>
                                </div>
                            </React.Fragment>
                        ))}
                </div>
            </div>
            <div className="py-[42px] sm:px-[150px] px-[24px]">
                <h3 className="font-semibold text-[24px] mb-2">
                    Building Information for {name}
                </h3>
                <div className="grid sm:grid-cols-4 grid-cols-2 sm:gap-8">
                    {buildingInfo && Object
                        .entries(buildingInfo)
                        .map(([
                            title, value
                        ], index) => (
                            <React.Fragment key={`${title}-${index}`}>
                                <div className="sm:py-2 py-1 border-b sm:text-[16px] text-[14px]">
                                    {transformKeyForDisplay(title)}
                                </div>
                                <div className="sm:py-2 py-1 border-b sm:text-[16px] text-[14px]">
                                    <strong>{title === "lotSize"
                                            ? `${value} SqFt`
                                            : value}</strong>
                                </div>
                                <div></div>
                                <div></div>
                            </React.Fragment>
                        ))}
                </div>
            </div>

            <div className="sm:px-[150px] pb-[30px] px-[24px]">
                <h2 className="text-[24px] font-semibold mb-2">
                Buyer Savings Calculator</h2>
                <PaymentCalculator initialHomePrice={price} setMonthlyPayment={setMonthlyPayment} setOthersMonthlyPayment={setothersMonthlyPayment}/>
            </div>
            <div className="py-[24px] sm:px-[150px] px-[24px]">
                <h2 className="text-[24px] font-semibold mb-2">
                    Property Information for {name}
                </h2>
                {Object
                    .entries(propertyInformation)
                    .map(([sectionKey, sectionValue]) => (
                        <div key={sectionKey} className="mt-4 border">
                            <div className="bg-[#f4f4f4] py-4 sm:px-6 px-4">
                                <h3 className="sm:text-[16px] text-[14px] font-semibold">
                                    {transformKeyForDisplay(sectionKey)}
                                </h3>
                            </div>
                            <div className="px-6 sm:text-[16px] text-[14px]">
                                {Object
                                    .entries(sectionValue)
                                    .map(([subKey, subValue]) => (
                                        <div
                                            key={subKey}
                                            className="grid sm:grid-cols-2 grid-cols-1 sm:gap-0 gap-4 py-4">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {transformKeyForDisplay(subKey)}
                                                </h3>
                                                {renderList(subValue)}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
            </div>

            {/* <div className="sm:px-[150px] px-[24px]">
        <h2 className="text-[24px] font-semibold mb-2">
          Property History for {name}
        </h2>
        <div className="mt-4">
          <div className="grid sm:grid-cols-4 grid-cols-3 font-semibold py-4 border-b sm:text-[16px] text-[14px] gap-4 sm:gap-0">
            <h3>Date</h3>
            <h3>Event & Source</h3>
            <h3>Price</h3>
            <h3 className="sm:block hidden">Appreciation</h3>
          </div>
          {propertyHistory.map((history, index) => (
            <div
              key={index}
              className="grid sm:grid-cols-4 grid-cols-3 py-4 border-b sm:text-[16px] text-[14px]"
            >
              {Object.entries(history).map(([key, value]) => (
                <React.Fragment key={`${key}-${index}`}>
                  {key === "price" ? (
                    <h3>${value}</h3>
                  ) : key === "appreciation" ? (
                    <h3>{`${value}%`}</h3>
                  ) : (
                    <h3>{value}</h3>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div> */}
            <div className="sm:px-[150px] px-[24px] py-[24px]">
                <h2 className="text-[24px] font-semibold mb-2">
                    Public Records for {name}
                </h2>
                <div className="sm:grid sm:grid-cols-4 flex flex-col sm:gap-16 mt-4">
                    <div>
                        <h3 className="font-semibold">Taxable Value</h3>
                        <div className="flex justify-between">
                            <div className="py-2">Land</div>
                            <div className="py-2">
                                <strong>{publicRecords
                                        ?.taxAbleValue
                                            ?.land}</strong>
                            </div>
                        </div>
                        <div className="border-b"></div>
                    </div>
                    <div>
                        <h3 className="font-semibold">
                            Tax Record</h3>
                        <div className="py-2">
                            {publicRecords
                                ?.taxes?.map((taxRecord , index) => (
                                        <div key={index}>
                                            {Object
                                                .entries(taxRecord)
                                                .map(([year, amount]) => (
                                                    <div key={year}>
                                                        <strong>{year}:</strong>
                                                        ${amount}
                                                        ($ {(amount / 12).toFixed(2)}
                                                        / month)
                                                    </div>
                                                ))}
                                        </div>
                                    ))}
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="grid grid-cols-4 sm:py-4"></div>
                <div className="grid sm:grid-cols-6 grid-cols-2 pb-2">
                    <div className="border-b border-black py-2">Additions</div>
                    <div className="border-b border-black py-2">
                        <strong>{publicRecords
                                ?.taxAbleValue
                                    ?.addition}</strong>
                    </div>
                </div>
                <div className="grid sm:grid-cols-6 grid-cols-2 pb-4">
                    <div>
                        <strong>Total</strong>
                    </div>
                    <div>
                        <strong>$714,651</strong>
                    </div>
                </div>
            </div>
            <div className="sm:px-[150px] px-[24px]">
                <h2 className="text-[24px] font-semibold mb-2">Home Facts</h2>
                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-4">
                    {Object
                        .entries(homeFacts)
                        .map(([
                            key, value
                        ], index) => (
                            <React.Fragment key={`${key}-${index}`}>
                                <div
                                    className="grid sm:grid-cols-3 grid-cols-2 border-b text-[14px] sm:text-[16px]">
                                    <div>{transformKeyForDisplay(key)}</div>
                                    <div>
                                        <strong>
                                            {key === "aboveGradeFinishedSqFt" || key === "totalFinishedSqFt" || key === "lotSize"
                                                ? `${value} SqFt`
                                                : value}
                                        </strong>
                                    </div>
                                    <div></div>
                                </div>
                            </React.Fragment>
                        ))}
                </div>
            </div>
            <div className="sm:px-[150px] px-[24px] py-[24px]">
                <h2 className="text-[24px] font-semibold mb-2">Schools near {name}</h2>
                <p>This home is within Tamalpais Union High School District.</p>
                <div className="overflow-x-auto mt-2">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-left py-3 px-4 font-semibold text-sm">
                                    Rating
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">
                                    School
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-sm sm:table-cell hidden">
                                    Type
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-sm sm:table-cell hidden">
                                    Grades
                                </th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">
                                    Distance
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools && schools
                                .slice(0, visibleSchools)
                                .map((school , index) => (
                                    <tr key={index} className="border-t">
                                        <td className="py-3 px-4">{school.rating}/10</td>
                                        <td className="py-3 px-4 text-[#f08e80]">{school.name}</td>
                                        <td className="py-3 px-4 sm:table-cell hidden whitespace-normal">
                                            {school.type}
                                            - Serves this home
                                        </td>
                                        <td className="py-3 px-4 sm:table-cell hidden whitespace-normal">
                                            {school.gradesFrom}
                                            to {school.gradesTo}
                                        </td>
                                        <td className="py-3 px-4">{school.distance}
                                            mi</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4">
                    <button
                        onClick={handleToggleView}
                        className="text-[#f08e80] focus:outline-none">
                        {showMore
                            ? "View more"
                            : "View less"}
                    </button>
                </div>
                <p className="text-xs mt-2 text-gray-600">
                    School ratings and boundaries are provided by{" "}
                    <a href="https://www.greatschools.org" className="text-[#f08e80]">
                        GreatSchools.org
                    </a>{" "}
                    and Pitney Bowes. This information should only be used as a reference. Proximity
                    or boundaries shown here are not a guarantee of enrollment. Please reach out to
                    schools directly to verify all information and enrollment eligibility.
                </p>
            </div>
            <div className=" sm:px-[150px] sm:bg-white bg-[#f4f4f4] ">
                <div className="p-[24px] sm:p-0 grid sm:grid-cols-2 grid-cols-1">
                    <div>
                        <img className="object-cover" src={image} alt=""/>
                    </div>
                    <div
                        className="text-start flex flex-col justify-center  bg-[#f4f4f4] px-8 sm:mt-0 mt-6">
                        <h1 className="text-[40px]">Tiburon</h1>
                        <p className="py-4">
                            Where views of the San Francisco Bay, the city skyline and the Golden Gate
                            Bridge abound. Tiburon is a gorgeous enclave, hidden on a lush, hilly peninsula
                            that is set apart from the rest of Marin County and overlooks the glistening San
                            Francisco Bay.
                        </p>
                        <div className="text-[#f08e80] flex sm:gap-[100px] gap-[60px]">
                            <a href="">Tiburon Guide</a>
                            <a href="">All Neighborhoods</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:px-[150px] px-[24px] pt-[24px] pb-[90px]">
                <h2 className="text-[24px] font-semibold my-4">Similar Homes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {similarProperties.map((property, index) => (
                        <div key={index} onClick={() => goToPropertyDetails(property.id)}>
                            <Cards
                                            image={property.image}
                                            price={0}
                                            address={property.address}
                                            beds={property.beds}
                                            baths={property.baths}
                                            sqft={property.sqft}
                                            comingSoon={property.comingSoon}
                                            monthlyPayment={property.monthlyPayment}
                                            downPayment={property.downPayment}
                                            terms={property.terms}
                                        />
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export
default
PropertyDetails;
