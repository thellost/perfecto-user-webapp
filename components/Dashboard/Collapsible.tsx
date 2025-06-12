import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface CollapsibleProps {
    title?: string;
    className?: string;
    children: React.ReactNode;
}

const Collapsible: React.FC<CollapsibleProps> = ({title = "default title", className = '', children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`border border-gray-200 rounded-lg shadow-sm ${className}`}>
            <div className="flex justify-between items-center px-4 py-3  hover:bg-gray-50 border-b border-gray-200 cursor-pointer " onClick={toggleCollapse}>
                <h3 className="text-lg font-medium text-gray-900">
                    {title}
                </h3>
                <button 
                    onClick={toggleCollapse} 
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                    aria-label={isOpen ? 'Collapse' : 'Expand'}
                >
                    {isOpen ? (
                        <FiChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                </button>
            </div>
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? ' opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Collapsible;