import React from "react";
import { useState, useEffect } from "react";

function Detailed(props) {
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);

  useEffect(() => {
    const rowsArray = [];
    const valuesArray = [];
    let pickupTotal = 0;
    let futilePickup = 0;
    let failedPickup = 0;
    let onboardComp;
    let overdueFreight;
    let inOutComp;
    let interbranchComp = "0%";
    let outOfTimeComp;
    let stopsPerHour;
    let minimumHour;

    let pickupPerformence = 0;
    let deliveryPerformence = 0;
    let compliancePerformence = 0;
    let productivityPerformence = 0;
    let overallScore = 0;

    props.DataTwoA?.map((temp) => {
      if (props.runNumber == temp["Run #"]) {
        pickupTotal = temp["1.0 Pickup Total"];
        futilePickup = temp["1.1 Futile Pickup"];
        failedPickup = temp["1.2 Failed Pickup"];
        onboardComp = temp["3.1 Onboard Compliance"];
        overdueFreight = temp["2.5 Overdue freight"];
        inOutComp = temp["3.0 Check In and Out Compliance"];
        outOfTimeComp = temp["3.2 Compliance OOT"];
        stopsPerHour = temp["4.0 Productivity Stops Per Hour"];
        minimumHour = temp["4.1 Productivity Hours worked"];
        overallScore = temp["Overall Score"]
      }
    });

    props.DataTwoFour?.map((temp) => {
      if (props.runNumber == temp["Pickup CF"]) {
        interbranchComp = temp["TotalSorted%"];
      }
    });

    //calculating Pickup Performence
    //checking if denominator is gonna be 0, else make it 100
    if (parseInt(pickupTotal) + parseInt(failedPickup) != 0) {
      pickupPerformence =
        ((parseInt(pickupTotal) + parseInt(futilePickup)) /
          (parseInt(pickupTotal) + parseInt(failedPickup))) *
        100;
    } else {
      pickupPerformence = 100;
    }

    //calculating deliveryPerformence
    if(overdueFreight<15){
      deliveryPerformence = deliveryPerformence + 50
    }
    if(onboardComp=="Pass"){
      deliveryPerformence = deliveryPerformence + 50
    }

    //calculating compliancePerformence
    if(!isNaN(interbranchComp)){
      compliancePerformence = compliancePerformence + ((interbranchComp/100)*(100/3))
    }
    if(inOutComp=="Pass"){
      compliancePerformence = compliancePerformence + 100/3
    }
    if(outOfTimeComp=="Pass"){
      compliancePerformence = compliancePerformence + 100/3
    }

    //calculating productivityPerformence
    if(stopsPerHour/15 > 1){
      productivityPerformence = productivityPerformence + 50
    }
    else{
      productivityPerformence = productivityPerformence + ((stopsPerHour/15.0)*50)
    }
    if(minimumHour/9 > 1){
      productivityPerformence = productivityPerformence + 50
    }
    else{
      productivityPerformence = productivityPerformence + ((minimumHour/9.0)*50)
    }


    const json = [
      {
        " ": "1. Pick Up Performance:",
        Target: "100%",
        Result: Math.round(pickupPerformence) + "%",
      },
      { " ": "1.0 Pickup Total:", Target: "-", Result: pickupTotal },
      { " ": "1.1 Futile Pickup:", Target: "-", Result: futilePickup },
      { " ": "1.3 Failed Pickup:", Target: "-", Result: failedPickup },
      { " ": "2. Delivery Performence:", Target: "95%", Result: deliveryPerformence + "%" },
      { " ": "2.1 Onboard compliance:", Target: "Pass", Result: onboardComp },
      { " ": "2.2 Overdue Freight:", Target: "-", Result: overdueFreight },
      { " ": "3. Compliances:", Target: "100%", Result: Math.round(compliancePerformence) + "%" },
      {
        " ": "3.0 Check in and out compliance:",
        Target: "Pass",
        Result: inOutComp,
      },
      {
        " ": "3.1 Interbranch pickup RF-Scaning compliance:",
        Target: "100%",
        Result: interbranchComp,
      },
      {
        " ": "3.2 Out of time scan compliance:",
        Target: "Pass",
        Result: outOfTimeComp,
      },
      { " ": "4. On road Productivity:", Target: "95%", Result: Math.round(productivityPerformence) + "%" },
      {
        " ": "4.0 Productivity Stops Per Hour:",
        Target: "15",
        Result: stopsPerHour,
      },
      {
        " ": "4.1 Productivity mininmum Hours worked:",
        Target: "9",
        Result: minimumHour,
      },
      { " ": "Overall Score:", Target: " ", Result: overallScore },
    ];

    json.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });

    // Filtered Column Names
    setTableRows(rowsArray[0]);

    // Filtered Values
    setTableValues(valuesArray);
  }, []);

  return (
    <>
      <div className="my-[2%] mx-5 w-[22%]">
        <h4 className="mb-5">Run: {props.runNumber}</h4>
        <table class="table-auto border-x border-b w-full text-left text-gray-800">
          <thead className="">
            <tr>
              {tableRows.map((rows, index) => {
                return (
                  <th
                    className="font-bold p-2 border-b border-l border-[#dc291e] text-left bg-[#dc291e] text-white"
                    key={index}
                  >
                    {rows}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableValues.map((value, index) => {
              return (
                <tr className="odd:bg-gray-100 hover:!bg-red-200" key={index}>
                  {value.map((val, i) => {
                    return (
                      <td className="p-2 border-b border-l text-left" key={i}>
                        {val}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Detailed;
