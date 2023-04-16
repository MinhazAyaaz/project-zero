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
      "Total map run" : "-",
    },
    {
      "Bays": "Chullora",
      "Total map run" : "36",
    },
    {
      "Bays": "Courier Lite",
      "Total map run" : "-",
    },
    {
      "Bays": "Matraville",
      "Total map run" : "27",
    },
    {
      "Bays": "OSH",
      "Total map run" : "77",
    },
    {
      "Bays": "Other",
      "Total map run" : "-",
    },
    {
      "Bays": "Parcel connect",
      "Total map run" : "-",
    },
    {
      "Bays": "Wetherill Park",
      "Total map run" : "59",
    },
  ];

  const newData = json.map((item) => {

    let activeCount = 0
    let pmCheckInCount = 0

    console.log(props.DataTwoA)

    props.DataTwoOne?.map((temp) => {
      if(item["Bays"]==temp["Final Bay"] && temp["Active status"]=="Active"){
        activeCount = activeCount + 1;
      }
    })

    props.DataTwoA?.map((temp) => {
      if(item["Bays"]==temp["Bay"]){
        pmCheckInCount = pmCheckInCount + 1;
      }
    })

    return {
      ...item,
      "Active" : activeCount,
      "No PM check in" : pmCheckInCount,
      "Overall score (%)" : "",
      "Pickup Total" : "",
      "Delivery Total" : "",
      "Onboard Total" : "",
      "Average onboard per Courier/OSH" : "",
      "Average Delivery per Courier/OSH" : "",
      "Overdue" : "",
      "Sorted to cage score" : "",
    };
  })

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