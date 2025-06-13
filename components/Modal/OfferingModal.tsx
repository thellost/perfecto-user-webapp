import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Button from '../Button/Button';

const calculateMonthlyPayment = (principal: number, annualRate: number, years: number) => {
  // Only calculate the monthly interest (not principal + interest)
  const monthlyRate = annualRate / 12 / 100;
  const monthlyInterest = principal * monthlyRate;
  return Math.round(monthlyInterest * 100) / 100;
};

interface OfferingModalProps {
  propertyId: string;
  defaultPrice: number;
  defaultTerm: number;
  buttonClassName?: string;
}

const OfferingModal: React.FC<OfferingModalProps> = ({
  propertyId,
  defaultPrice,
  defaultTerm,
  buttonClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [offerDetails, setOfferDetails] = useState({
    offerPrice: defaultPrice,
    downPayment: defaultPrice * 0.2, // 20% default down payment
    loanTerm: defaultTerm,
    preApproved: false,
    message: '',
  });
  const [interestRate, setInterestRate] = useState(6.5);// Default interest rate
  // Fetch rates from the API and update state
    useEffect(() => {
      const fetchRates = async () => {
        try {
          const response = await fetch("/api/crud/checkRates");
          const data = await response.json();
          if (data.perfectoHomeRate) {
            setInterestRate(data.perfectoHomeRate);
          }
        } catch (error) {
          console.error("Error fetching rates:", error);
        }
      };
  
      fetchRates();
    }, []);
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = offerDetails.offerPrice - offerDetails.downPayment;
    const monthly = calculateMonthlyPayment(principal, interestRate, offerDetails.loanTerm);
    setMonthlyPayment(monthly);
    setShowConfirmation(true);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/crud/offerings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId,
          ...offerDetails,
          monthlyPayment,
        }),
      });

      if (!response.ok) {
        
      console.log(response);
        throw new Error('Failed to submit offer');
      }

      toast.success('Offer submitted successfully!');
      setIsOpen(false);
      setShowConfirmation(false);
    } catch (error) {
      toast.error('Failed to submit offer');
      console.error('Error:', error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowConfirmation(false);
  };

  return (
    <div className='max-w-auto mx-auto p-6 border border-gray-300'>
    <div>
      <h2 className="text-lg font-semibold mb-4">Make an Offer !</h2>
      <p className="text-gray-600 mb-6">
        Not satisfied with the listed price? Enter your own offer details below and negotiate your way to a better deal!
      </p>
      
    <Button onClick={() => setIsOpen(true)}>

        Make an Offer
    </Button>
    </div>

      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Modal container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-xl w-full rounded-xl bg-white p-6">
            {!showConfirmation ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-xl font-semibold">
                    Make an Offer
                  </Dialog.Title>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleContinue} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Offer Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={offerDetails.offerPrice}
                        onChange={(e) => setOfferDetails({
                          ...offerDetails,
                          offerPrice: Number(e.target.value),
                          downPayment: Number(e.target.value) * 0.2,
                        })}
                        className="pl-7 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Down Payment
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={offerDetails.downPayment}
                        onChange={(e) => setOfferDetails({
                          ...offerDetails,
                          downPayment: Number(e.target.value),
                        })}
                        className="pl-7 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Term (years)
                    </label>
                    <select
                      value={offerDetails.loanTerm}
                      onChange={(e) => setOfferDetails({
                        ...offerDetails,
                        loanTerm: Number(e.target.value),
                      })}
                      className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    >
                      <option value={15}>15 years</option>
                      <option value={30}>30 years</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="preApproved"
                      checked={offerDetails.preApproved}
                      onChange={(e) => setOfferDetails({
                        ...offerDetails,
                        preApproved: e.target.checked,
                      })}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="preApproved" className="ml-2 text-sm text-gray-700">
                      I am pre-approved for this loan amount
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (optional)
                    </label>
                    <textarea
                      value={offerDetails.message}
                      onChange={(e) => setOfferDetails({
                        ...offerDetails,
                        message: e.target.value,
                      })}
                      rows={3}
                      className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Add any additional notes or conditions..."
                    />
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-xl font-semibold">
                    Confirm Your Offer
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Offer Price:</span>
                      <span className="font-medium">${offerDetails.offerPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment:</span>
                      <span className="font-medium">${offerDetails.downPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Term:</span>
                      <span className="font-medium">{offerDetails.loanTerm} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-medium">{interestRate}%</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-gray-900 font-medium">Monthly Payment:</span>
                        <span className="text-indigo-600 font-bold">${monthlyPayment.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowConfirmation(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      Submit Offer
                    </button>
                  </div>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default OfferingModal;