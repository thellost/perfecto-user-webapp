import React, { useState, useEffect } from "react";
type props = {
    initialHomePrice?: number;
    initialInterestRate?: number;
    initialDownPayment?: number;
    initialTerm?: number;
    propertyTaxRate?: number;
    setMonthlyPayment?: React.Dispatch<React.SetStateAction<number | null>> | undefined;
    setOthersMonthlyPayment?: React.Dispatch<React.SetStateAction<number | null>> | undefined;
}
const PaymentCalculator = ({
  initialHomePrice = 750000,
  initialInterestRate = 5.175,
  initialDownPayment = 20,
  initialTerm = 30,
  propertyTaxRate = 0.00518,
  setMonthlyPayment,
  setOthersMonthlyPayment,
  
} : props ) => {
  const [homePrice, setHomePrice] = useState<number>(initialHomePrice);
  const [interestRate, setInterestRate] = useState<number>(initialInterestRate); // Normal rate
  const [perfectoInterestRate, setPerfectoInterestRate] = useState<number>(1); // Perfecto rate
  const [downPayment, setDownPayment] = useState<number>(initialDownPayment);
  const [term, setTerm] = useState<number>(initialTerm);

  const loanAmount = homePrice - (homePrice * downPayment) / 100;
  const numberOfPayments = term * 12;
  const propertyTaxes = (homePrice * propertyTaxRate) / 12;

  /* Make the perfecto monthly only interest rate */
  const perfectoMonthlyInterestRate = perfectoInterestRate / 100 / 12;
  const perfectoMonthlyPrincipalAndInterest = perfectoMonthlyInterestRate * loanAmount;
  const perfectoTotalMonthlyPayment =
    perfectoMonthlyPrincipalAndInterest + propertyTaxes;
        
  const normalMonthlyInterestRate = interestRate / 100 / 12;
  const normalMonthlyPrincipalAndInterest =
    (loanAmount * normalMonthlyInterestRate) /
    (1 - Math.pow(1 + normalMonthlyInterestRate, -numberOfPayments));
  const normalTotalMonthlyPayment =
    normalMonthlyPrincipalAndInterest + propertyTaxes;


    // Set the monthly payment in the parent component
    if (setMonthlyPayment !== undefined) {
        setMonthlyPayment(parseFloat(perfectoTotalMonthlyPayment.toFixed(0)));
    }
    if (setOthersMonthlyPayment !== undefined) {
        setOthersMonthlyPayment(parseFloat(normalTotalMonthlyPayment.toFixed(0)));
    }

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    trailingZeroDisplay: "stripIfInteger",
  });
  // Fetch rates from the API and update state
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("/api/crud/checkRates");
        const data = await response.json();

        if (data.perfectoHomeRate) {
          setPerfectoInterestRate(data.perfectoHomeRate);
        }
        if (data.normalRate) {
          setInterestRate(data.normalRate);
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };

    fetchRates();
  }, []);

  function onChange(value: number, setValue: any) {
    setValue(value);
  }

  return (
    <div className="max-w-full mx-auto">
      Compare traditional mortgage vs Perfecto Home payments
      <div className="mb-4 pt-5">
        <div className="grid grid-cols-2">
          <p className="font-bold">Purchase Price</p>
          <p className="font-bold text-right">{formatter.format(homePrice)}</p>
        </div>
        <div className="relative mb-6">
          <label htmlFor="labels-range-input" className="sr-only">
            Labels range
          </label>
          <input
            id="labels-range-input"
            type="range"
            onChange={(e) => onChange(Number(e.target.value), setHomePrice)}
            defaultValue={homePrice}
            min="100000"
            max="2000000"
            step="10000"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#f08e80]"
          ></input>
          <span className="text-sm text-gray-500 absolute start-0 -bottom-6">
            Min ($100,000)
          </span>
          <span className="text-sm text-gray-500 absolute end-0 -bottom-6">
            Max ($2,000,000)
          </span>
        </div>
      </div>
      <div className="mb-4 pt-5">
        <div className="grid grid-cols-2">
          <p className="font-bold">Down Payment (%)</p>
          <p className="font-bold text-right">
            {formatter.format((homePrice * downPayment) / 100)}
          </p>
        </div>
        <div className="relative mb-6">
          <label htmlFor="labels-range-input" className="sr-only">
            Labels range
          </label>
          <input
            id="labels-range-input"
            type="range"
            onChange={(e) => onChange(Number(e.target.value), setDownPayment)}
            defaultValue="20"
            min="0"
            max="50"
            step="1"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-[#f08e80]"
          ></input>
          <span className="text-sm text-gray-500 absolute start-0 -bottom-6">
            Min (0 %)
          </span>
          <span className="text-sm text-gray-500 absolute end-0 -bottom-6">
            Max (50 %)
          </span>
        </div>
      </div>
      <div className="mb-4 py-5">
        <div className="grid grid-cols-2">
          <p className="font-bold col-start-1">Traditional Rate (30-year fixed)</p>
          <p className="font-bold col-">Perfecto Rate</p>
          <p className="font-bold py-1 text-xl">{interestRate} %</p>
          <p className="font-bold py-1 text-xl">{perfectoInterestRate} %</p>
        </div>
      </div>
      <div className="bg-gray-100 px-5 py-5 rounded-xl grid grid-cols-2">
        <div className="text-xl font-semibold mb-4 ">
          Normal Monthly Payment:
        </div>
        <div className="text-xl font-semibold mb-4 text-right">
          {formatter.format(normalTotalMonthlyPayment)}
        </div>
        <div className="text-xl font-semiboldw ">
          Perfecto Monthly Payment:
        </div>
        <div className="text-xl font-semibold text-right">
          {formatter.format(perfectoTotalMonthlyPayment)}
        </div>
      </div>
      <div className="bg-gray-100 text-green-700 px-5 py-5 mt-5 rounded-xl grid grid-cols-2">
        <div className="text-xl font-semibold ">
          Total Saved over 30 Years:
        </div>
        <div className="text-xl text-green-700 font-semibold text-right">
          {formatter.format(
            normalTotalMonthlyPayment * term * 12 -
              perfectoTotalMonthlyPayment * term * 12
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCalculator;
