//Changeallocation.jsx

import { useContext, useEffect } from 'react';
import { MdOutlineCurrencyPound, MdOutlineEuro } from "react-icons/md";
import { Usercontext } from "../hooks/Usercontext"


export const Changeallocation = () => {

    const { currency, allocations, setAllocations, remaining, setRemaining, spent, change, setChange, budget, amount, setAmount, department, setDepartment, allocated, setSpent} = useContext(Usercontext);

    const handleDepartmentChange = (label, key) => {
        setDepartment({label, key});
    }

    const handleChange = (setter) => {
        setChange(setter);
    }

    const handleChangeAmount = (e) => {
        const value = e.target.value;

        if(isNaN(value)){
            alert("Please enter a valid number");
        }
        else if (!isNaN(value)){
            const numericValue = Number(value);
            if(numericValue < 0 || numericValue > 20000){
                alert("Budget cannot be less than 0 or more than 20,000");
                return;
            }
            setAmount(numericValue);
        };
    }

const handleSave = () => {

  if(budget <= 0){
    alert(`set the budget first. `)
    return;
  }
  if (!(department.key in allocations)) {
    alert("Please select a valid department");
    return;
  }

  const oldValue = Number(allocations[department.key]);
  const delta = Number(amount);
  let newValue = oldValue;
  let newTotal = allocated;

  if (change === 'ADD') {
    newValue = oldValue + delta;
    newTotal = allocated - oldValue + newValue;

    if (newValue < 0) {
      alert("Value cannot be below 0");
      return;
    }

    if (newTotal > budget) {
      alert("Total allocated budget cannot exceed set budget. ");
      return;
    }

    setAllocations(prev => ({
      ...prev,
      [department.key]: newValue
    }));
  }

  else if (change === 'SUB') {
    newValue = oldValue - delta;
    newTotal = allocated - oldValue + newValue;

    if (newValue < 0) {
      alert("Value cannot be below 0");
      return;
    }

    if (newTotal < 0) {
      alert("Total allocation cannot be less than 0");
      return;
    }

    setAllocations(prev => ({
      ...prev,
      [department.key]: newValue
    }));
  }

  else {
    alert("Invalid change type");
  }
};

    useEffect(() => {
        setSpent(allocated)
        setRemaining(Number(budget) - Number(allocated))
        if(remaining < 0){
            alert(`The remaining cannot be 0`);
            return;
        }
    }, [allocated, budget, spent, remaining]);
        
    return (
        <>
        <h2 className='ml-16'>Change Allocation</h2>
            <div className="header-values grid grid-cols-4 gap-4 ml-20">
                <div className="card bg-base-100 bg-gray-200 card-lg shadow-sm">
                    <div className="card-body grid h-20 grid-cols-7 content-center">
                        <p className="whitespace-nowrap content-center col-span-4">Department: </p>
                        <details className="dropdown grid col-span-3">
                            <summary className="btn m-1">{department.label}</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><a onClick={() => handleDepartmentChange("Marketing", "marketing")}>Marketing</a></li>
                                <li><a onClick={() => handleDepartmentChange("Finance", "finance")}>Finance</a></li>
                                <li><a onClick={() => handleDepartmentChange("Sales", "sales")}>Sales</a></li>
                                <li><a onClick={() => handleDepartmentChange("HR", "hr")}>Human Resources</a></li>
                                <li><a onClick={() => handleDepartmentChange("IT", "it")}>IT</a></li>
                            </ul>
                        </details>
                    </div>
                </div>
                <div className="card bg-base-100 bg-gray-200 card-lg shadow-sm">
                    <div className="card-body grid h-20 grid-cols-3 content-center">
                        <p className="whitespace-nowrap content-center col-span-2">Allocation </p>
                        <details className="dropdown col-span-1">
                            <summary className="btn m-1">{change}</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><a onClick={() => handleChange("ADD")}>ADD</a></li>
                                <li><a onClick={() => handleChange("SUB")}>SUB</a></li>
                            </ul>
                        </details>
                    </div>
                </div>
                <div className="card bg-base-100 card-lg bg-gray-300 shadow-sm">
                    <div className="card-body grid h-20 grid-cols-5 content-center">
                                {currency}
                        <input type='text' className="col-span-4 bg-white" value={amount} onChange={handleChangeAmount}/>
                    </div>
                </div>
                <div className='grid w-1 content-center'>
                    <button className="btn" onClick={handleSave}>Save</button>
                </div>
            </div>

        </>
    )
}