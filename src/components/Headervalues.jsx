// Headervalues.jsx

import { useState, useContext } from "react";
import { Usercontext } from "../hooks/Usercontext";
import { MdOutlineCurrencyPound, MdOutlineEuro } from "react-icons/md"



export const Headervalues = () => {
    const [draftAmount, setDraftAmount] = useState(0);
    const { 
        currency,
        setCurrency,
        remaining, 
        setRemaining,
        budget,
        setBudget,
        spent,
        setSpent,
        allocated,
        setAllocated
     } = useContext(Usercontext);

    const handleCurrencyChange = (setter) => {
        setCurrency(setter);
    }
    const handleChange = (e) => {
        const value = e.target.value;

        if(isNaN(value)){
            alert("Please enter a valid number");
        }

        else if (!isNaN(value)){
            const numericValue = Number(value);
            if(numericValue < 0 || numericValue > 20000){
                alert("Budget cannot be less than 0 or more than 20000");
                setDraftAmount(budget); // Reset to last valid budget
                return;
            }else if(numericValue < spent){
                alert(`The total budget cannot be lower than the amount spent so far.`)
                setDraftAmount(budget); // Reset to last valid budget
                return;
            }else{
                setBudget(numericValue);
            }
        };
    }

    return (
        <>
        <h1 className="ml-4 pb-5 text-6xl">Company's Budget Allocation</h1>
            <div className="header-values grid grid-cols-4 gap-x-4 ml-8 mr-8">
                <div className="card bg-base-100 bg-gray-300 card-lg shadow-sm">
                    <div className="card-body grid h-20 grid-cols-2 content-center">
                    <p className="whitespace-nowrap content-center">Budget: {currency}</p>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 no-spinner"
                        value={draftAmount}
                        min="0"
                        max="20000"
                        onChange={(e) => setDraftAmount(e.target.value)}
                        onBlur={handleChange}
                    />
                    </div>
                </div>
                <div className="card bg-base-100 bg-green-200 card-lg shadow-sm">
                    <div className="card-body grid h-20 grid-cols-2 content-center">
                    <p className="whitespace-nowrap content-center">Remaining: {currency} {remaining}</p>
                    </div>
                </div>
                <div className="card card-lg bg-blue-300 shadow-sm">
                    <div className="card-body grid h-20 grid-cols-2 content-center">
                        <p className="whitespace-nowrap content-center">spent so far: {currency} {spent}</p>
                    </div>
                </div>
                <div className="card card-sm bg-pink-100 shadow-sm">
                    <div className="card-body grid h-20 grid-cols-2 content-center">
                        <span className="text-lg">Currency:</span>
                        <details className="dropdown grid content-center">
                            <summary className="btn w-fit">{currency}</summary>
                            <ul className="dropdown-content menu bg-base-100 bg-green-100 rounded-box z-10 w-52 p-2 shadow-sm">
                                <li><a onClick={() => handleCurrencyChange("$")}>$ Dollar</a></li>
                                <li><a onClick={() => handleCurrencyChange("£")}>£ Pound</a></li>
                                <li><a onClick={() => handleCurrencyChange("€")}>€ Euro</a></li>
                                <li><a onClick={() => handleCurrencyChange("₹")}>₹ Rupee</a></li>
                            </ul>
                        </details>
                    </div>
                </div>


            </div>
        </>
    )
}