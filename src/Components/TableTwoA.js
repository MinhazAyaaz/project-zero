import React from 'react'
import {useState,useEffect} from 'react'
import { TwoA } from "../data/TwoA";

function TableTwoA(props){
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);

  useEffect(() => {
    const rowsArray = [];
    const valuesArray = [];

    const json = TwoA['TwoA'];

    const newData = json.map((item) => {
      let PickupTotal
      let FutilePickup = 0
      let FailPickup = 0
      let DeliveryTotal
      let OnboardTotal
      let OOT
      let SortCageScore
      let RunStatus
      let OnTimeDelivery
      let OverDue
      let StopsPerHour
      let HoursWorked
      let TotalReceived
      let checkCompliance

      props?.DataTwoOne?.map((temp1) => {
        if(item["Run #"]==temp1["Scanner"]){
          PickupTotal = temp1["Pickup Total"]
          DeliveryTotal = temp1["Delivery Total"]
          OnboardTotal = temp1["Onboard Total"]
          OOT = temp1["OOT"]
          console.log("temp1",temp1)
          OnTimeDelivery = temp1["Yesterday Performence"]
          OverDue = temp1["Overdue"]
          StopsPerHour = temp1["Stops Per Hour"]
          HoursWorked = temp1["Hours worked"]
        }
      })
      props?.DataTwoTwo?.map((temp2) => {
        if(item["Run #"]==temp2["PickupCourierNumber"] && temp2["KPI Status"]=="Futile"){
          console.log(item["Run #"])
          FutilePickup = FutilePickup + 1;
        }
        if(item["Run #"]==temp2["PickupCourierNumber"] && temp2["KPI Status"]=="Fail"){
          FailPickup = FailPickup + 1;
        }
      })
      props?.DataTwoFour?.map((temp3) => {
        if(item["Run #"]==temp3["Pickup CF"]){
          SortCageScore = temp3["TotalSorted%"]
          TotalReceived = temp3["TotalReceived"]
        }
      })
      if((parseInt(PickupTotal)+parseInt(DeliveryTotal)+(OnboardTotal - DeliveryTotal)+parseInt(SortCageScore))==0){
        RunStatus="Inactive"
      }
      else{
        RunStatus="Active"
      }
      return {
        ...item,
        "1.0 Pickup Total" : (PickupTotal=="") ? 0 : PickupTotal,
        "1.1 Futile Pickup" : FutilePickup,
        "1.2 Failed Pickup" : FailPickup,
        "2.0 Delivery Total" : (DeliveryTotal=="") ? 0 : DeliveryTotal,
        "2.1 Onboard Total" : (OnboardTotal=="") ? 0 : OnboardTotal,
        "2.2 Not delivered" : OnboardTotal - DeliveryTotal,
        "2.3 OOT" : (OOT=="") ? 0 : OOT,
        "2.4 On-Time Delivery(%)-Yestarday" : OnTimeDelivery,
        "2.5 Overdue freight" : (OverDue=="") ? 0 : OverDue,
        "Run Active Status" : RunStatus,
        "3.1 Onboard Compliance": (parseInt(DeliveryTotal) > parseInt(OnboardTotal)) ? "Fail" : "Pass",
        "3.2 Compliance OOT" : (((OnboardTotal - DeliveryTotal) != 0) && OOT=="") ? "Fail" : "Pass",
        "4.0 Productivity Stops Per Hour" : Math.round(StopsPerHour),
        "4.1 Productivity Hours worked" : HoursWorked,
        "4.3 Sort To Cage Score(%)" : (SortCageScore==undefined) ? "0%" : SortCageScore,
        "4.4 Count of item sorted" : (TotalReceived==undefined) ? 0 : TotalReceived
      };
    });

    newData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });



    setTableRows(rowsArray[0]);
    setTableValues(valuesArray);
  }, []);


return(
  <div style={{ width: "100%", overflowX: "auto",overflow: "visible" }}>
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
        </div>
)


}

export default TableTwoA;