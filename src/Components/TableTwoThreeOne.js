import React from 'react'
import {useState,useEffect} from 'react'
import { TwoThreeOneData } from "../data/TwoThreeOne";

function TableTwoThreeOne(props){
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  let exclude = props.exclude;

  //Using useEffect hook to make sure page doesn't render infinite times
  useEffect(() => {
    const rowsArray = [];
    const valuesArray = [];

    //Storing data imported from 2.3.1 and 2.A
    const json = TwoThreeOneData['TwoThreeOne'];

    const newData = json.map((item) => {
      //Defining all the variables which are needed to populate the tables
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

      props?.DataTwoThreeThree?.map((temp) => {
        if(item["CF"]==temp["CF AM In"]){
          checkInAM = temp["Check in AM"]
        }
        if(item["CF"]==temp["CF AM OUT"]){
          checkOutAM = temp["Check out AM"]
        }
      });

      props.DataTwoThreeTwo?.map((temp) => {
        if(item["CF"]==temp["Run #1"]){
          checkInAM = temp["Check In AM"]
        }
        if(item["CF"]==temp["Run #2"]){
          checkOutAM = temp["Check Out AM"]
        }
      })

      props?.DataTwoFour?.map((temp) => {
        if(item["CF run converted"]==temp["Pickup CF"]){
          TotalSorted = temp["TotalSorted%"]
        }
      })

      if(excludeCheck=="Yes"){
        checkInPM = "No Pm Check In"
        checkOutPM = "No PM Check Out"
      }
      else{
        props?.DataTwoThreeThree?.map((temp) => {
            if(item["CF"]==temp["CF PM IN"]){
              checkInPM = temp["Check in PM"]
          }
            if(item["CF"]==temp["CF PM OUT"]){
                checkOutPM = temp["Check out PM"]
            }
        });

        props?.DataTwoThreeTwo?.map((temp) => {
          if(item["CF"]==temp["Run #3"]){
            checkInPM = temp["Check In PM"]
        }
          if(item["CF"]==temp["Run #4"]){
            if(checkInPM == "No Pm Check In"){
              checkOutPM = "No PM Check Out"
            }
            else{
              checkOutPM = temp["Check Out PM"]
            }
            
          }
      });
      }

      if (DeliveryTotal === undefined || DeliveryTotal === null || DeliveryTotal === ""){
        DeliveryTotal = 0;
      }
      if(freight === undefined || freight === null || freight === ""){
        freight = 0;
      }
      if(PickupTotal === undefined || PickupTotal === null || PickupTotal === ""){
        PickupTotal = 0;
      }
      if(TotalSorted === undefined || TotalSorted === null || TotalSorted === "0%"){
        TotalSorted = 0;
      }

      if (parseInt(DeliveryTotal)+freight+PickupTotal+TotalSorted===0) {
        runActivity = "Inactive";
      } else {
        runActivity = "Active";
      }

      if(checkInAM){
        firstCheckIn = checkInAM
      }
      else if(checkOutAM){
        firstCheckIn = checkOutAM
      }
      else if(checkInPM && checkInPM !== "No Pm Check In"){
        firstCheckIn = checkInPM
      }
      else if(checkOutPM && checkOutPM !== "No PM Check Out"){
        firstCheckIn = checkOutPM
      }

      if(checkOutPM && checkOutPM !== "No PM Check Out"){
        lastCheckOut = checkOutPM
      }
      else if(checkInPM && checkInPM !== "No Pm Check In"){
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

      if(checkInPM!="No Pm Check In" || checkOutPM!="No PM Check Out"){
        PMReturn = "PM Return"
      }
      else{
        PMReturn = "No PM Return"
      }

      
      if (checkInAM){totalCheck++}
      if (checkOutAM){totalCheck++}
      if (checkInPM != "No Pm Check In" && checkInPM != "No Check in required"){totalCheck++}
      if (checkOutPM != "No PM Check Out" && checkOutPM != "No Check out required"){totalCheck++}



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
  },[props.exclude])

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