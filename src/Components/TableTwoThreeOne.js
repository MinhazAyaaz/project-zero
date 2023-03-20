import React from 'react'
import {useState,useEffect} from 'react'
import { TwoThreeOneData } from "../data/TwoThreeOne";
import { TwoA } from "../data/TwoA";

function TableTwoThreeOne(props){
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);

  useEffect(() => {
    const rowsArray = [];
    const valuesArray = [];

    const json = TwoThreeOneData['TwoThreeOne'];
    const TwoAData = TwoA['TwoA']
    console.log(json)

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
        if(item["CF"]==temp2["CF PM IN"]){
          checkInPM = temp2["Check in PM"]
          totalCheck++;
        }
        if(item["CF"]==temp2["CF PM OUT"]){
          checkOutPM = temp2["Check out PM"]
          totalCheck++;
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
      else if(checkInPM != undefined){
        firstCheckIn = checkInPM
      }
      else if(checkOutPM != undefined){
        firstCheckIn = checkOutPM
      }

      if(checkOutPM != undefined){
        lastCheckOut = checkOutPM
      }
      else if(checkInPM != undefined){
        lastCheckOut = checkInPM
      }
      else if(checkOutAM != undefined){
        lastCheckOut = checkOutAM
      }
      else if(checkInAM != undefined){
        lastCheckOut = checkInAM
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
        "No PM Return" : (checkInPM==undefined && checkOutPM==undefined) ? "No PM Return" : "PM Return",
        "Exclude from PM check in checkout" : "No"
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