import React from 'react'
import {useState,useEffect} from 'react'

function TableOne(props){
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const Chullora = 36
  const Matraville = 27
  const OSH = 77
  const WetherillPark = 59

  useEffect(() => {
    const rowsArray = [];
    const valuesArray = [];

    let json = [
    {
      "Bays": "Blu",
    },
    {
      "Bays": "Chullora",
    },
    {
      "Bays": "Matraville",
    },
    {
      "Bays": "OSH",
    },
    {
      "Bays": "Other",
    },
    {
      "Bays": "Parcel connect",
    },
    {
      "Bays": "Wetherill Park",
    },
  ];

  const newData = json.map((item) => {

    let activeCount = 0
    let pmCheckInCount = 0
    let overallScore = 0
    let pickupTotal = 0
    let deliveryTotal = 0
    let onboardTotal = 0
    let overdue = 0
    let sortedCageScore = 0
    let count = 0
    let hoursWorked = 0


    props.DataTwoA?.map((temp) => {
      if(item["Bays"]==temp["Bay"] && temp["Run Active Status"]=="Active"){
        activeCount = activeCount + 1;
      }
      if(item["Bays"]==temp["Bay"] && temp["PM checkout status"]=="No PM Return"){
        pmCheckInCount = pmCheckInCount + 1;
      }
      if(item["Bays"]==temp["Bay"]){
        overallScore = overallScore + parseInt(temp["Overall Score"])
      }
    })

    props.DataTwoOne?.map((temp) => {
      if(item["Bays"]==temp["Final Bay"]){
        if (temp["Pickup Total"] !== "") {
          pickupTotal += parseInt(temp["Pickup Total"]);
        }
        if (temp["Delivery Total"] !== "") {
          deliveryTotal += parseInt(temp["Delivery Total"]);
        }
        if (temp["Onboard Total"] !== "") {
          onboardTotal += parseInt(temp["Onboard Total"]);
        }
        if (temp["Overdue"] !== "") {
          overdue += parseInt(temp["Overdue"]);
        }
        if (temp["Active status"] == "Active"){
        hoursWorked = hoursWorked + temp["Hours worked"]
        }
      }

    })

    props.DataTwoFour?.map((temp) => {

      if(item["Bays"]==temp["Bay"]){
        count += 1;
        sortedCageScore = sortedCageScore + parseInt(temp["TotalSorted%"])
      }
    })

    console.log("Overall Score",overallScore/activeCount)

    return {
      ...item,
      "Active" : activeCount,
      "No PM check in" : pmCheckInCount,
      "Avg hours worked per active ID" : (activeCount==0) ? 0 : (hoursWorked/activeCount),
      "Total load time:(hour)" : 0,
      "Load speed: Item/min, per active  ID": 0,
      "Overall score (%)" : (activeCount==0) ? 0 + "%" : Math.round(overallScore / activeCount) + "%",
      "Pickup Total" : pickupTotal,
      "Delivery Total" : deliveryTotal,
      "Onboard Total" : onboardTotal,
      "Average onboard per Courier/OSH" : (activeCount==0) ? 0 : Math.round(onboardTotal / activeCount),
      "Average Delivery per Courier/OSH" : (activeCount==0) ? 0 : Math.round(deliveryTotal / activeCount),
      "Overdue" : overdue,
      "Sorted to cage score" : (count==0) ? 0 + "%" : Math.round(sortedCageScore / count) + "%",
    };
  })

  props.setDataOne(newData)

    newData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });

    setTableRows(rowsArray[0]);
    setTableValues(valuesArray);
  }, []);


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

export default TableOne