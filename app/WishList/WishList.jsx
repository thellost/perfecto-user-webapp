import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Cards from "../../components/Cards/Cards";
import { getCookie } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function WishList() {
  // Dummy data for the cards
  const [wishlistProperties, setWishlistProperties] = useState([]);
  const access_token = getCookie('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/wishlist`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch wishlist");
        }
        const data = await response.json();
        console.log("Wishlist data:", data);
        setWishlistProperties(data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }

    fetchWishList();
  }, [access_token]);

  const goToPropertyDetails = (_id) => {
    navigate(`/property-details/${_id}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="w-full z-10 px-4 border-b">
        <Navbar />
      </div>
      <div className="px-4 md:px-8 lg:px-16 py-6">
        <h2 className="text-black text-2xl md:text-3xl font-semibold">
          My Wishlisted Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {wishlistProperties.map((data, index) => (
            <div
              onClick={() => goToPropertyDetails(data._id)}
              key={index}>
              <Cards
                image={data.image}
                price={data.price}
                address={data.address}
                beds={data.beds}
                baths={data.baths}
                sqft={data.sqft}
                comingSoon={data.comingSoon}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default WishList;
