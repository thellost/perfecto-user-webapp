import React, { useState } from 'react';

const ModalComponent = ({ isOpen, onCloseModal, onSave }) => {
    const [url, setUrl] = useState('');

    const handleInputChange = (e) => {
        setUrl(e.target.value);
    };

    const handleSave = () => {
        onSave(url);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-auto">
                <input
                    type="text"
                    placeholder="Enter link"
                    value={url}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 mb-4 w-full focus:outline-none"
                />
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                        onClick={onCloseModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;
