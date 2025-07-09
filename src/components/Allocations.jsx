//Allocations.jsx

import { FaPlusCircle, FaMinusCircle} from "react-icons/fa";
import { Usercontext } from "../hooks/Usercontext";
import { useContext, useEffect} from "react";

export const Allocations = () => {

    const { currency, allocated, setAllocated, allocations, setAllocations, setSpent, remaining } = useContext(Usercontext);

    const handleDecreaseBy10 = (departToChange) => {
        if (!(departToChange in allocations)) return;

        const oldValue = Number(allocations[departToChange]);
        const newValue = oldValue - 10;

        // Prevent negative allocation for the department
        if (newValue < 0) {
            alert("Value cannot be below 0");
            return;
        }

        // Calculate what the new total allocated would be
        const newTotal =
            allocations.marketing +
            allocations.finance +
            allocations.it +
            allocations.sales +
            allocations.hr -
            oldValue +
            newValue;

        // Prevent total allocated from going below 0
        if (newTotal < 0) {
            alert("Total allocated cannot be less than 0");
            return;
        }

        setAllocations(prev => ({
            ...prev,
            [departToChange]: newValue
        }));
    };

    const handleIncreaseBy10 = (departToChange) => {
    if (remaining < 10) {
        alert("The remaining cannot be below 0");
        return;
    }
    if (allocated <= 20000 && allocated >= 0) {
        if (departToChange in allocations) {
        setAllocations(prev => {
            const oldValue = Number(prev[departToChange]);
            const newValue = oldValue + 10;
            const newTotal = allocated - oldValue + newValue;
            let myValid = remaining - 10;

            if (myValid < 0) {
                alert(`The remaining cannot be below 0`);
                myValid = remaining; // Reset to previous value
                console.log("myValid" + myValid);
                console.log("newValue" + newValue);
            
                return prev;
            }

            if (newValue < 0) {
            alert(`Value cannot be below 0`);
            return prev;
            }

            if (newTotal > 20000) {
            alert(`Total allocation cannot be more than 20000`);
            return prev;
            }

            // ✅ All good — update allocation
            return {
            ...prev,
            [departToChange]: newValue
            };
        });
        }
    } else {
        alert(`Total allocation cannot be more than 20000`);
    }
    };

    
    useEffect(()=> {
        setAllocated(allocations.marketing + allocations.finance + allocations.it + allocations.sales + allocations.hr);
    }, [allocations.marketing, allocations.finance, allocations.it, allocations.sales, allocations.hr])

    useEffect(() => {
        setSpent(allocated)
    }, [allocated]);


    
    
    return (
        <>
            <h1 className="ml-8 pl-5 text-4xl font-bold">Allocations</h1>
            <div>
                <fieldset className="p-4 pl-5 ml-5">
                    <div className="font-bold grid grid-cols-4 gap-4">
                        <span>Departments</span>
                        <span>Allocated Budget</span>
                        <span>Increase By 10</span>
                        <span>Decrease By 10</span>
                    </div>
                    <ul className="pl-5 ml-5">
                        <li className="grid grid-cols-4 gap-4"><span> Marketing</span> <span className="flex items-center">{currency} {allocations.marketing}</span> <button className="p-0 m-0 text-green-500 w-fit h-fit" onClick={() => handleIncreaseBy10("marketing")}><FaPlusCircle /></button> <button className="p-0 m-0 text-red-500 w-fit h-fit" onClick={() => handleDecreaseBy10("marketing")}><FaMinusCircle /></button></li>
                        <li className="grid grid-cols-4 gap-4"><span> Finance</span> <p className="flex items-center">{currency} {allocations.finance}</p> <button className="p-0 m-0 text-green-500 w-fit h-fit" onClick={() => handleIncreaseBy10("finance")}><FaPlusCircle /></button> <button className="p-0 m-0 text-red-500 w-fit h-fit" onClick={() => handleDecreaseBy10("finance")}><FaMinusCircle /></button></li>
                        <li className="grid grid-cols-4 gap-4"><span> Sales</span> <p className="flex items-center">{currency} {allocations.sales}</p> <button className="p-0 m-0 text-green-500 w-fit h-fit" onClick={() => handleIncreaseBy10("sales")}><FaPlusCircle /></button> <button className="p-0 m-0 text-red-500 w-fit h-fit" onClick={() => handleDecreaseBy10("sales")}><FaMinusCircle /></button></li>
                        <li className="grid grid-cols-4 gap-4"><span> Human Resources</span> <p className="flex items-center">{currency} {allocations.hr}</p> <button className="p-0 m-0 text-green-500 w-fit h-fit" onClick={() => handleIncreaseBy10("hr")}><FaPlusCircle /></button> <button className="p-0 m-0 text-red-500 w-fit h-fit" onClick={() => handleDecreaseBy10("hr")}><FaMinusCircle /></button></li>
                        <li className="grid grid-cols-4 gap-4"><span> IT</span> <p className="flex items-center">{currency} {allocations.it}</p> <button className="p-0 m-0 text-green-500 w-fit h-fit" onClick={() => handleIncreaseBy10("it")}><FaPlusCircle /></button> <button className="p-0 m-0 text-red-500 w-fit h-fit" onClick={() => handleDecreaseBy10("it")}><FaMinusCircle /></button></li>
                    </ul>
                </fieldset>
            </div>
        </>
    )
};


//     const handleDecreaseBy10 = (departToChange) => {

    //     if(departToChange in allocations) {
    //         setAllocations(prev => {
    //             const oldValue = Number(prev[departToChange]);
    //             let newValue = oldValue - 10;
    //             const newTotal = allocated - oldValue + newValue;
    //             if(newValue < 0){
    //                 alert(`value cannot be below 0`)
    //                 newValue = oldValue;
    //                 console.log("newValue" + newValue);
    //                 return prev; // Do not update if result is negative
    //             }else if(newTotal <= 2000){
    //                 return{
    //                     ...prev,
    //                     [departToChange]: newValue
    //                 };
    //             }else{
    //                 alert(`Total allocated cannot be less than 0`)
    //                 return prev;
    //             }

    //         });
    //     }
    // }