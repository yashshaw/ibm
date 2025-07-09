//Mystates.jsx

import { useState } from "react";
import { Usercontext } from "./Usercontext"; 


export const Mystates = ({ children }) => {
    const [currency, setCurrency] = useState('$');
    const [remaining, setRemaining] = useState(0);
    const [budget, setBudget] = useState(0);
    const [spent, setSpent] = useState(0);
    const [allocated, setAllocated] = useState(0)

    const [department, setDepartment] = useState(
        {
            label: 'select',
            key: 'select'
        }
    );

    const [change, setChange] = useState('ADD');  
    const [amount, setAmount] = useState(0);

    const [allocations, setAllocations] = useState({
        marketing: 0,
        finance: 0,
        it: 0,
        sales: 0,
        hr: 0
    });

    if (!allocations) return null; // or a loading spinner

    return(
        <Usercontext.Provider value={{amount, setAmount, change, setChange, currency, setCurrency, remaining, setRemaining, budget, setBudget, spent, setSpent, allocated, setAllocated, allocations, setAllocations, department, setDepartment}}>
            {children}
        </Usercontext.Provider>
    );

};