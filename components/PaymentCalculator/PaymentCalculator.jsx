import React, { useState } from 'react';

const PaymentCalculator = ({
  initialHomePrice = 2177000,
  initialInterestRate = 7.25,
  initialDownPayment = 435400,
  initialTerm = 30,
  propertyTaxRate = 0.00518,
}) => {
  const [homePrice, setHomePrice] = useState(initialHomePrice);
  const [interestRate, setInterestRate] = useState(initialInterestRate);
  const [downPayment, setDownPayment] = useState(initialDownPayment);
  const [term, setTerm] = useState(initialTerm);

  const loanAmount = homePrice - downPayment;
  const monthlyInterestRate = (interestRate / 100) / 12;
  const numberOfPayments = term * 12;

  const monthlyPrincipalAndInterest = 
    (loanAmount * monthlyInterestRate) / 
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  const propertyTaxes = (homePrice * propertyTaxRate) / 12;
  const totalMonthlyPayment = monthlyPrincipalAndInterest + propertyTaxes;

  return (
    <div className="max-w-full mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700">Term</label>
        <input
          type="number"
          value={term}
          onChange={(e) => setTerm(+e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
          placeholder="Enter term in years"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Home Price</label>
        <input
          type="number"
          value={homePrice}
          onChange={(e) => setHomePrice(+e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Interest Rate (%)</label>
        <input
          type="number"
          step="0.01"
          value={interestRate}
          onChange={(e) => setInterestRate(+e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Down Payment</label>
        <input
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(+e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>
      <div className="text-xl font-semibold mb-4">
        Monthly Payment: ${totalMonthlyPayment.toFixed(2)}
      </div>
      <div className="flex gap-6 text-[16px] text-gray-600 mb-2">
        <span>Principal and Interest:</span>
        <span>${monthlyPrincipalAndInterest.toFixed(2)}</span>
      </div>
      <div className="flex gap-6 text-[16px] text-gray-600 mb-2">
        <span>Property Taxes:</span>
        <span>${propertyTaxes.toFixed(2)}</span>
      </div>
      <div className="flex gap-6 text-[16px] text-gray-600">
        <span>HOA Dues:</span>
        <span>$0</span>
      </div>
    </div>
  );
};

export default PaymentCalculator;
