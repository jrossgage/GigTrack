import React from "react";
import { Line } from 'react-chartjs-2';

const MainChart = ({ gigArr, expenseArr }) => {

    let orderedGigArr = gigArr.reverse();
    let orderedExpenseArr = expenseArr.reverse();

    let incomeArr = [];
    let costArr = [];
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    //Get the income
    orderedGigArr.forEach(gig => {
        incomeArr.push(gig.pay)
    });
    //Get the Cost
    orderedExpenseArr.forEach(expense => {
        costArr.push(expense.cost)
    })

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Income',
                data: incomeArr,
                fill: false,
                backgroundColor: '#fd5401',
                borderColor: '#fd5401',
            },
            {
                label: 'Expenses',
                data: costArr,
                fill: false,
                backgroundColor: '#fd541',
                borderColor: '#fd541',
            },
        ],
    };
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false,
                    },
                },
            ],
        },
    };
    return (

        <Line data={data} options={options} />

    );
}
export default MainChart;