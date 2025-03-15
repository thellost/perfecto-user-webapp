import React, { useEffect, useState } from 'react';
import { getCookie } from '../../utils/helper';
import axios from 'axios';
import Button from '../../components/Button/Button';
import AcceptAddressModal from '../../components/Modal/AcceptAddressModal';
import Navbar from '../../components/Navbar/Navbar';
import ToastNotificationContainer from '../../components/ToastContainer/ToastContainer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/Footer/Footer';

function ListAddress() {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null); // To store the selected address for accept
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const access_token = getCookie('access_token');

    const handleAction = async (action, address) => {
        if (action === 'Reject') {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/property/${address._id}/reject`,
                    {},
                    {
                        headers: {
                            'Authorization': `Bearer ${access_token}`,
                        }
                    }
                );
                if (response.status === 200) {
                    toast.success('Address rejected successfully');
                    // Update the state to remove the rejected address
                    setAddresses((prevAddresses) =>
                        prevAddresses.filter((item) => item._id !== address._id)
                    );
                } else {
                    toast.error('Failed to reject address');
                }
            } catch (error) {
                toast.error('Error rejecting address');
                console.error('Error rejecting address:', error);
            }
        } else if (action === 'Accept') {
            setSelectedAddress(address);
            handleOpenModal();
        } else {
            console.log(`${action} action for address: ${address.address}`);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = async (url) => {
        setIsLoading(true);
        if (selectedAddress) {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/property/${selectedAddress._id}/accept`,
                    { url },
                    {
                        headers: {
                            'Authorization': `Bearer ${access_token}`,
                        }
                    }
                );
                if (response.status === 200) {
                    toast.success('Property scrapped successfully');
                    // Handle success, such as updating UI or other state
                    setIsModalOpen(false);
                    setAddresses((prevAddresses) =>
                        prevAddresses.filter((item) => item._id !== selectedAddress._id)
                    );
                } else {
                    toast.error('Failed to scrape property');
                }
            } catch (error) {
                toast.error('Error scrapping property');
                console.error('Error scrapping property:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const fetchAddresses = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/requestedProperties`,
                {
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                    }
                }
            );
            if (response.status === 200) {
                console.log(response.data);
                setAddresses(response.data);
            }
        } catch (error) {
            toast.error('Error fetching addresses');
            console.error('Error fetching addresses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen overflow-x-hidden">
            <ToastNotificationContainer />
            <div className="w-full z-10 px-4 border-b">
                <Navbar />
            </div>
            <div className=" max-w-5xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Addresses</h1>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Address</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="2" className="py-4 px-4 text-center">
                                    <div
                                        className="w-12 h-12 border-4 border-purple-500 border-dashed rounded-full animate-spin mx-auto"
                                        style={{ animationDuration: '3s' }}
                                    ></div>
                                </td>
                            </tr>
                        ) : addresses.length === 0 ? (
                            <tr>
                                <td colSpan="2" className="py-4 px-4 text-center">
                                    No addresses found
                                </td>
                            </tr>
                        ) : (
                            addresses.map((address, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{address.address}</td>
                                    <td className="py-2 px-4 border-b flex justify-center">
                                        <Button
                                            children="Accept"
                                            className="bg-purple-500 text-white py-1 px-3 rounded mr-2 hover:bg-purple-600"
                                            onClick={() => handleAction('Accept', address)}
                                        />
                                        <Button
                                            children="Reject"
                                            className="bg-purple-500 text-white py-1 px-3 rounded hover:bg-purple-600"
                                            onClick={() => handleAction('Reject', address)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                        <AcceptAddressModal
                            isOpen={isModalOpen}
                            onCloseModal={handleCloseModal}
                            onSave={handleSave}
                        />
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default ListAddress;
