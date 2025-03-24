import React, {useState} from 'react';

const PaymentCalculator = ({
    initialHomePrice = 2177000,
    initialInterestRate = 5.175,
    initialDownPayment = 20,
    initialTerm = 30,
    propertyTaxRate = 0.00518
}) => {
    const [homePrice,
        setHomePrice] = useState(initialHomePrice);
    const [interestRate,
        setInterestRate] = useState(initialInterestRate);
    const [downPayment,
        setDownPayment] = useState(initialDownPayment);
    const [term,
        setTerm] = useState(initialTerm);

    const loanAmount = homePrice - (homePrice * downPayment / 100);

    const numberOfPayments = term * 12;

    const propertyTaxes = (homePrice * propertyTaxRate) / 12;

    const perfectoMonthlyInterestRate = (interestRate / 100) / 12;
    const perfectoMonthlyPrincipalAndInterest = (loanAmount * perfectoMonthlyInterestRate) / (1 - Math.pow(1 + perfectoMonthlyInterestRate, -numberOfPayments));
    const perfectoTotalMonthlyPayment = perfectoMonthlyPrincipalAndInterest + propertyTaxes;

    const NormalMonthlyInterestRate = (7 / 100) / 12;
    const NormalMonthlyPrincipalAndInterest = (loanAmount * NormalMonthlyInterestRate) / (1 - Math.pow(1 + NormalMonthlyInterestRate, -numberOfPayments));
    const NormalTotalMonthlyPayment = NormalMonthlyPrincipalAndInterest + propertyTaxes;
    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options can be used to round to whole numbers.
        trailingZeroDisplay: 'stripIfInteger' // This is probably what most people
        // want. It will only stop printing the fraction when the input amount is a
        // round number (int) already. If that's not what you need, have a look at the
        // options below. minimumFractionDigits: 0, // This suffices for whole numbers,
        // but will print 2500.10 as $2,500.1 maximumFractionDigits: 0, // Causes
        // 2500.99 to be printed as $2,501
    });
    function onChange(value : Number, setValue : any) {
        setValue(value)
    }
    return (
        <div className="max-w-full mx-auto">
            Compare traditional mortgage vs Perfecto Home payments
            <div className="mb-4 pt-5">
                <div className='grid grid-cols-2'>

                    <p className=" font-bold">Purchase Price</p>

                    <p className="font-bold text-right">{formatter.format(homePrice)}</p>
                </div>
                <div className="relative mb-6">
                    <label htmlFor="labels-range-input" className="sr-only">Labels range</label>
                    <input
                        id="labels-range-input"
                        type="range"
                        onChange={(e) => onChange(Number(e.target.value), setHomePrice)}
                        defaultValue="1000000"
                        min="100000"
                        max="10000000"
                        step="10000"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#f08e80]"></input>
                    <span className="text-sm text-gray-500 absolute start-0 -bottom-6">Min ($100,000)</span>
                    <span className="text-sm text-gray-500 absolute end-0 -bottom-6">Max ($10,000,000)</span>
                </div>
            </div>
            <div className="mb-4 pt-5">
                <div className='grid grid-cols-2'>

                    <p className=" font-bold">Down Payment (%)</p>

                    <p className="font-bold text-right">{formatter.format(homePrice * downPayment / 100)}</p>
                </div>
                <div className="relative mb-6">
                    <label htmlFor="labels-range-input" className="sr-only">Labels range</label>
                    <input
                        id="labels-range-input"
                        type="range"
                        onChange={(e) => onChange(Number(e.target.value), setDownPayment)}
                        defaultValue="20"
                        min="0"
                        max="50"
                        step="1"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-[#f08e80]"></input>
                    <span className="text-sm text-gray-500 absolute start-0 -bottom-6">Min (0 %)</span>
                    <span className="text-sm text-gray-500 absolute end-0 -bottom-6">Max (50 %)</span>
                </div>
            </div>
            <div className="mb-4 py-5">
                <div className='grid grid-cols-2'>
                    <p className=" font-bold col-start-1">Traditional Rate (30-year fixed)</p>

                    <p className="font-bold col-">Perfecto Rate
                    </p>
                    <p className='font-bold py-1 text-xl'>
                        7 %</p>

                    <p className='font-bold py-1 text-xl'>
                        5.175 %</p>
                </div>
            </div>
            <div className='bg-gray-100 px-5 py-5 rounded-xl grid grid-cols-2'>
                <div className="text-xl font-semibold mb-4 ">
                    Normal Monthly Payment:
                </div>
                <div className="text-xl font-semibold mb-4 text-right">
                    {formatter.format(NormalTotalMonthlyPayment)}
                </div>
                <div className="text-xl font-semibold mb-4 ">
                    Perfecto Monthly Payment:
                </div>
                <div className="text-xl font-semibold mb-4 text-right">
                    {formatter.format(perfectoTotalMonthlyPayment)}
                </div>
            </div>
            <div className='bg-gray-100  text-green-700 px-5 py-5 mt-5 rounded-xl grid grid-cols-2'>
                <div className="text-xl font-semibold mb-4 ">
                    Total Saved over 30 Years:
                </div>
                <div className="text-xl text-green-700 font-semibold mb-4 text-right">
                    {formatter.format(((NormalTotalMonthlyPayment * term * 12) - (perfectoTotalMonthlyPayment * term * 12)))}
                </div>
            </div>
        </div>
    );
};

export default PaymentCalculator;
