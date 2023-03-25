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
      let checkInPM = "No Pm Check In"
      let checkOutPM = "No PM Check Out"
      let firstCheckIn
      let lastCheckOut
      let runActivity
      let totalCheck = 0
      let PMReturn
      let excludeCheck = "No"
      let DeliveryTotal
      let TotalSorted

      if(exclude.includes(item["CF run converted"])){
        excludeCheck = "Yes"
      }
          
      props?.DataTwoOne?.map((temp1) => {
        if(item["CF run converted"]==temp1["Scanner"]){
          PickupTotal = temp1["Pickup Total"]
          freight = temp1["Onboard Total"] - temp1["Delivery Total"]
          DeliveryTotal = temp1["Delivery Total"]
        }
      });

      props?.DataTwoThreeTwo?.map((temp2) => {
        if(item["CF"]==temp2["CF AM In"]){
          checkInAM = temp2["Check in AM"]
        }
        if(item["CF"]==temp2["CF AM OUT"]){
          checkOutAM = temp2["Check out AM"]
        }
      });

      props?.DataTwoFour?.map((temp) => {
        if(item["CF run converted"]==temp["Pickup CF"]){
          TotalSorted = temp["TotalSorted%"]
        }
      })

      if(excludeCheck=="Yes"){
        checkInPM = "No Check in required"
        checkOutPM = "No Check out required"
      }
      else if(PickupTotal > 0 || freight > 0){
        props?.DataTwoThreeTwo?.map((temp2) => {
            if(item["CF run converted"]==temp2["CF PM IN"]){
              checkInPM = temp2["Check in PM"]
          }
            if(item["CF run converted"]==temp2["CF PM OUT"]){
              checkOutPM = temp2["Check out PM"]
            }
        });
      }
      else{
        checkInPM = "No Check in required"
        checkOutPM = "No Check out required"
      }

      console.log("Run Number",item["CF run converted"])
      console.log("Delivery Total", DeliveryTotal)
      console.log("Freight", freight)
      console.log("Pickup Total", PickupTotal)
      console.log("Total Sorted", TotalSorted)
      if(DeliveryTotal+freight+PickupTotal==0 && (TotalSorted==undefined || TotalSorted=="0%")){
        runActivity = "Inactive"
      }
      else{
        runActivity = "Active"
      }
      console.log("Run Activity", runActivity)


      if(checkInAM){
        firstCheckIn = checkInAM
      }
      else if(checkOutAM){
        firstCheckIn = checkOutAM
      }
      else if(checkInPM && checkInPM !== "No Check in required" && checkInPM !== "No Pm Check In"){
        firstCheckIn = checkInPM
      }
      else if(checkOutPM && checkOutPM !== "No Check out required" && checkOutPM !== "No PM Check Out"){
        firstCheckIn = checkOutPM
      }

      if(checkOutPM && checkOutPM !== "No Check out required" && checkOutPM !== "No PM Check Out"){
        lastCheckOut = checkOutPM
      }
      else if(checkInPM && checkInPM !== "No Check in required" && checkInPM !== "No Pm Check In"){
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

      if(checkInPM=="No Check in required" && checkOutPM=="No Check out required"){
        PMReturn = "No PM check in required"
      }
      else if(checkInPM!="No Pm Check In" && checkOutPM!="No PM Check Out"){
        PMReturn = "PM Return"
      }
      else{
        PMReturn = "No PM Return"
      }

      if(checkInAM){totalCheck++}
      if (checkOutAM){totalCheck++}
      if (checkInPM!= "No Pm Check In"){totalCheck++}
      if (checkOutPM != "No PM Check Out"){totalCheck++}


      return {
        ...item,
        "Pickup" : PickupTotal,
        "Undelivered freight" : (freight>0) ? freight : 0,
        "Check In AM" : (checkInAM==undefined) ? "No AM Check In" : checkInAM,
        "Check Out AM" : (checkOutAM==undefined) ? "No AM Check Out" : checkOutAM,
        "Check In PM" : checkInPM,
        "Check Out PM" : checkOutPM,
        "First Check In" : firstCheckIn,
        "Last Check Out" : lastCheckOut,
        "Run Activity" : runActivity,
        "Total Check In/Out" : totalCheck,
        "No PM Return" : PMReturn,
        "Exclude from PM check in checkout" : excludeCheck
      };
    })


    props.setDataTwoThreeOne(newData)

    newData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });



    setTableRows(rowsArray[0]);
    setTableValues(valuesArray);
  },[])


  

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