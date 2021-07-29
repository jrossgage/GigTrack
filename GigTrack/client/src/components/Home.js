import React, { useEffect, useState } from "react";
import { getAllGigs } from "../modules/gigManager";

export default function Home() {
    const [gigs, setGigs] = useState([]);
    const [totalPay, setTotalPay] = useState(0);


    const getGigPay = () => {
        getAllGigs().then(g => {
            setGigs(g);
            getTotalPay(g);
        })
    };

    const getTotalPay = (gigs) => {
        let total = 0;
        for (let g of gigs) {
            total += g.pay
        }
        setTotalPay(total);
    }

    useEffect(() => {
        getGigPay();
    }, []);

    return (
        <>
            <div className='container'>
                <div>
                    <h4>Total Income for the year:</h4>
                    <p>{`$${totalPay}`}</p>
                </div>
            </div>
            <span style={{
                position: "fixed",
                left: 0,
                right: 0,
                top: "50%",
                marginTop: "-0.5rem",
                textAlign: "center",
            }}>don't panic.</span>
        </>
    );
}