import React, { useState } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import { getCookie } from '../../utils/helper';

export default function AddressModal({ isOpen, closeModal }) {
    const [addresses, setAddresses] = useState(['']);
    const access_token = getCookie('access_token');

    const addAddressField = () => {
        setAddresses([...addresses, '']);
    };

    const handleAddressChange = (index, value) => {
        const newAddresses = [...addresses];
        newAddresses[index] = value;
        setAddresses(newAddresses);
    };

    const handleSave = async () => {
        let data = addresses.filter((address) => address.trim() !== '');
        console.log(data);
        data = JSON.stringify({
            "addresses": data
        });
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/submitAddresses`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`,
                    }
                }
            );
            if (response.status === 200) {
                console.log(response.data);
            }
        } catch (error) {
            console.error(error);
        }
        setAddresses(['']);
        closeModal();
    };

    const deleteAddressField = (index) => {
        if (addresses.length > 1) {
            const newAddresses = addresses.filter((_, i) => i !== index);
            setAddresses(newAddresses);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
                <h3 className="text-lg font-bold leading-6 text-gray-900">Enter Addresses</h3>
                <div className="mt-2 space-y-4 max-h-60 overflow-y-auto pr-2">
                    {addresses.map((address, index) => (
                        <div key={index} className="relative">
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => handleAddressChange(index, e.target.value)}
                                placeholder={`Enter address ${index + 1}`}
                                className="w-full p-2 border rounded-md pr-10 focus:outline-none text-black"
                            />
                            {addresses.length > 1 && (
                                <button
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 text-2xl"
                                    onClick={() => deleteAddressField(index)}
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex justify-between">
                    <Button
                        children="Add Another Address"
                        className="border border-purple-400"
                        variant="white"
                        onClick={addAddressField}
                    />
                    <div className="flex space-x-2">
                        <Button
                            children="Close"
                            onClick={() => { closeModal(); setAddresses(['']) }}
                        />
                        <Button
                            children="Save"
                            onClick={handleSave}
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}
