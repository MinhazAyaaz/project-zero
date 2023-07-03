import React from "react";
import { useState, useEffect } from "react";
import { ChulloraRun } from "../data/ChulloraRun";

function Chullora(props) {
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  let bottom = 0;

  useEffect(() => {

  const rowsArray = [];
  const valuesArray = [];

  const json = ChulloraRun.ChulloraRun.map((item) => {

  let pickupScore="NA";
  let deliveryScore="NA";
  let complianceScore="NA";
  let productivityScore="NA";
  let totalScore="Run not active";

  props.DataTwoA?.map((temp) => {
    if(item["Run #"]==temp["Run #"]){
      pickupScore = temp["Pickup Score"];
      deliveryScore = temp["Delivery Score"]
      complianceScore = temp["Compliance Score"]
      productivityScore = temp["Productivity Score"]
      totalScore = temp["Overall Score"]
    }
  })

    return {
      ...item,
      "Pickup Score": pickupScore,
      "Delivery Score": deliveryScore,
      "Compliance Score": complianceScore,
      "Productivity Score": productivityScore,
      "Total Score (%)": totalScore,
    };
  });

  // Sort JSON based on "Total Score (%)"
  json.sort((a, b) => {
    const scoreA = parseFloat(a["Total Score (%)"]);
    const scoreB = parseFloat(b["Total Score (%)"]);
    return scoreB - scoreA; // Sort in descending order
  });

  const newData = json.map((item) => {
    if(item["Total Score (%)"]!="Run not active"){
      bottom++;
    }
    else{
      bottom = ""
    }
    return{
      ...item,
    "Bottom 5?":bottom,
    "OSH cost grouping" : "Chullora",
    }
  });

  newData.map((d) => {
    rowsArray.push(Object.keys(d));
    valuesArray.push(Object.values(d));
  });

  // Filtered Column Names
  setTableRows(rowsArray[0]);

  // Filtered Values
  setTableValues(valuesArray);
}, []);

  return (
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
  );
}

export default Chullora;
