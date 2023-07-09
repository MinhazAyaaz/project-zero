import React from "react";
import { useState, useEffect } from "react";
import { ChulloraRun } from "../data/ChulloraRun";
import Detailed from "./Detailed";

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
    <div className="w-full">
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
    <div className="w-full flex flex-wrap justify-between">
    <Detailed runNumber={"055"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"358"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"257"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"155"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    </div>
    <div className="w-full flex flex-wrap justify-between">
    <Detailed runNumber={"160"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"358"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"059"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"060"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    </div>
    <div className="w-full flex flex-wrap justify-between">
    <Detailed runNumber={"152"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"153"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"155"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"156"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    </div>
    <div className="w-full flex flex-wrap justify-between">
    <Detailed runNumber={"157"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"158"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"160"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"255"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    </div>
    <div className="w-full flex flex-wrap justify-between">
    <Detailed runNumber={"256"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"257"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"258"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"260"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    </div>
    <div className="w-full flex flex-wrap justify-between">
    <Detailed runNumber={"352"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"358"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"359"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"360"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    </div>
    <div className="w-full flex flex-wrap justify-between">
    <Detailed runNumber={"452"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"458"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"460"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"558"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    </div>
    <div className="w-full flex flex-wrap justify-between">
    <Detailed runNumber={"559"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"560"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"658"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"660"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    </div>
    <div className="w-full flex flex-wrap justify-center">
    <Detailed runNumber={"758"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    <Detailed runNumber={"760"} DataTwoA={props.DataTwoAFull} DataTwoFour={props.DataTwoFour}/>
    </div>
    </div>
  );
}

export default Chullora;
