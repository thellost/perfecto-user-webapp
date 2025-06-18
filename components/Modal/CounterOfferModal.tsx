import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface CounterOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalOffer: {
    offering_id: string;
    user_email: string;
    offerPrice: number;
    downPayment: number;
    loanTerm: number;
    property_id: string;
  };
}

const calculateMonthlyPayment = (principal: number, downPayment: number, annualRate: number, years: number): number => {
    const loanAmount = principal - downPayment;
    const monthlyRate = annualRate / 12 / 100;
    // Interest-only payment: only pay interest each month
    const monthlyPayment = loanAmount * monthlyRate;
    return Math.round(monthlyPayment * 100) / 100;
};

const CounterOfferModal: React.FC<CounterOfferModalProps> = ({
  isOpen,
  onClose,
  originalOffer,
}) => {
  const [counterOfferDetails, setCounterOfferDetails] = useState({
    offerPrice: originalOffer.offerPrice,
    downPayment: originalOffer.downPayment,
    loanTerm: originalOffer.loanTerm,
    message: '',
    interestRate: 6.5, // Default interest rate
  });

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  useEffect(() => {
    const payment = calculateMonthlyPayment(
      counterOfferDetails.offerPrice,
      counterOfferDetails.downPayment,
      counterOfferDetails.interestRate,
      counterOfferDetails.loanTerm
    );
    setMonthlyPayment(payment);
  }, [counterOfferDetails]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/crud/offerings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_offering_id: originalOffer.offering_id,
          propertyId: originalOffer.property_id,
          user_email: originalOffer.user_email,
          monthlyPayment: monthlyPayment,
          ...counterOfferDetails,
          type: 'counteroffer',
        }),
      });

      if (!response.ok) {
        console.log('Response status:', response);
        throw new Error('Failed to submit counter offer');
      }

      toast.success('Counter offer submitted successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to submit counter offer');
      console.error('Error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-xl w-full rounded-xl bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold">
              Make Counter Offer
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Original Offer Details:</h3>
            <div className="space-y-2">
              <p className="text-sm">Price: ${originalOffer.offerPrice.toLocaleString()}</p>
              <p className="text-sm">Down Payment: ${originalOffer.downPayment.toLocaleString()}</p>
              <p className="text-sm">Loan Term: {originalOffer.loanTerm} years</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Counter Offer Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={counterOfferDetails.offerPrice}
                  onChange={(e) => setCounterOfferDetails({
                    ...counterOfferDetails,
                    offerPrice: Number(e.target.value),
                  })}
                  className="pl-7 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Down Payment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={counterOfferDetails.downPayment}
                  onChange={(e) => setCounterOfferDetails({
                    ...counterOfferDetails,
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
                value={counterOfferDetails.loanTerm}
                onChange={(e) => setCounterOfferDetails({
                  ...counterOfferDetails,
                  loanTerm: Number(e.target.value),
                })}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value={15}>15 years</option>
                <option value={30}>30 years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={counterOfferDetails.interestRate}
                onChange={(e) => setCounterOfferDetails({
                  ...counterOfferDetails,
                  interestRate: Number(e.target.value),
                })}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Monthly Payment Estimate:</h3>
              <p className="text-2xl font-semibold text-blue-900">
                ${monthlyPayment.toLocaleString()}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Based on {counterOfferDetails.interestRate}% APR for {counterOfferDetails.loanTerm} years
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message to Buyer
              </label>
              <textarea
                value={counterOfferDetails.message}
                onChange={(e) => setCounterOfferDetails({
                  ...counterOfferDetails,
                  message: e.target.value,
                })}
                rows={3}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Explain your counter offer terms..."
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Submit Counter Offer
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CounterOfferModal;