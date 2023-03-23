import React from 'react'
import {useState,useEffect} from 'react'
import { TwoThreeOneData } from "../data/TwoThreeOne";
import { TwoA } from "../data/TwoA";

function TableTwoThreeOne(props){
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  let exclude = [];


  useEffect(() => {
    const rowsArray = [];
    const valuesArray = [];

      exclude.push("237".padStart(3, '0'))
      exclude.push("A02".padStart(3, '0'))
      exclude.push("A03".padStart(3, '0'))
      exclude.push("A04".padStart(3, '0'))
      exclude.push("A05".padStart(3, '0'))
      exclude.push("255".padStart(3, '0'))
      exclude.push("414".padStart(3, '0'))
      exclude.push("339".padStart(3, '0'))
      exclude.push("439".padStart(3, '0'))
      exclude.push("34".padStart(3, '0'))
      exclude.push("734".padStart(3, '0'))
      exclude.push("633".padStart(3, '0'))
      exclude.push("132".padStart(3, '0'))
      exclude.push("232".padStart(3, '0'))
      exclude.push("244".padStart(3, '0'))
      exclude.push("832".padStart(3, '0'))
      exclude.push("233".padStart(3, '0'))
      exclude.push("116".padStart(3, '0'))
      exclude.push("935".padStart(3, '0'))
      exclude.push("251".padStart(3, '0'))
      exclude.push("304".padStart(3, '0'))
      exclude.push("601".padStart(3, '0'))
      exclude.push("036".padStart(3, '0'))

    const json = TwoThreeOneData['TwoThreeOne'];
    const TwoAData = TwoA['TwoA']

    const newData = json.map((item) => {
      let PickupTotal
      let freight
      let checkInAM
      let checkOutAM
      let checkInPM
      let checkOutPM
      let firstCheckIn
      let lastCheckOut
      let runActivity = "Inactive"
      let totalCheck = 0
      let PMReturn

      if(exclude.includes(item["CF run converted"])){
        checkInPM = "No Check In Required";
        checkOutPM = "No Check Out Required";
        PMReturn = "No PM Check In Required"
      }
          

      props?.DataTwoOne?.map((temp1) => {
        if(item["CF run converted"]==temp1["Scanner"]){
          PickupTotal = temp1["Pickup Total"]
          freight = temp1["Onboard Total"] - temp1["Delivery Total"]
        }
      });

      props?.DataTwoThreeTwo?.map((temp2) => {
        if(item["CF"]==temp2["CF AM In"]){
          checkInAM = temp2["Check in AM"]
          totalCheck++;
        }
        if(item["CF"]==temp2["CF AM OUT"]){
          checkOutAM = temp2["Check out AM"]
          totalCheck++;
        }
        if(checkInPM==undefined){
          if(item["CF"]==temp2["CF PM IN"]){
            checkInPM = temp2["Check in PM"]
            totalCheck++;
          }
        }
        if(checkOutPM==undefined){
          if(item["CF"]==temp2["CF PM OUT"]){
            checkOutPM = temp2["Check out PM"]
            totalCheck++;
          }
        }
        
      });

      TwoAData?.map((temp3) => {
        if(item["CF"]==temp3["Run #"])
        runActivity = "Active"
      })

      if(checkInAM != undefined){
        firstCheckIn = checkInAM
      }
      else if(checkOutAM != undefined){
        firstCheckIn = checkOutAM
      }
      else if(checkInPM && checkInPM !== "No Check In Required"){
        firstCheckIn = checkInPM
      }
      else if(checkOutPM && checkOutPM !== "No Check Out Required"){
        firstCheckIn = checkOutPM
      }

      if(checkOutPM && checkOutPM !== "No Check Out Required"){
        lastCheckOut = checkOutPM
      }
      else if(checkInPM && checkInPM !== "No Check In Required"){
        lastCheckOut = checkInPM
      }
      else if(checkOutAM){
        lastCheckOut = checkOutAM
      }
      else if(checkInAM){
        lastCheckOut = checkInAM
      }

      if(!firstCheckIn && !lastCheckOut){
        firstCheckIn = "Check In Missing"
        lastCheckOut = "Check Out Missing"
      }

      if(!PMReturn){
        if(checkInPM==undefined && checkOutPM==undefined){
          PMReturn = "No PM Return"
        }
        else{
          PMReturn = "PM Return"
        }
      }

      return {
        ...item,
        "Pickup" : PickupTotal,
        "Undelivered freight" : (freight>0) ? freight : 0,
        "Check In AM" : (checkInAM==undefined) ? "No AM Check In" : checkInAM,
        "Check Out AM" : (checkOutAM==undefined) ? "No AM Check Out" : checkOutAM,
        "Check In PM" : (checkInPM==undefined) ? "No PM Check In" : checkInPM,
        "Check Out PM" : (checkOutPM==undefined) ? "No PM Check Out" : checkOutPM,
        "First Check In" : firstCheckIn,
        "Last Check Out" : lastCheckOut,
        "Run Activity" : runActivity,
        "Total Check In/Out" : totalCheck,
        "No PM Return" : PMReturn,
        "Exclude from PM check in checkout" : exclude.includes(item["CF run converted"]) ? "No" : "Yes"
      };
    },[])

    newData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });



    setTableRows(rowsArray[0]);
    setTableValues(valuesArray);
  })


  

return(
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
                      <td
                        className="p-2 border-b border-l text-left"
                        key={i}
                      >
                        {val}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
)


}

export default TableTwoThreeOne;