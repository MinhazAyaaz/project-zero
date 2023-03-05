import React from 'react'
import {useState,useEffect} from 'react'
import * as XLSX from "xlsx";
import { OSHUsageData } from "../data/OSHUsage";

function TableTwoFour(props){

  const [parsedData,setParsedData] = useState([])
  const [tableRows,setTableRows] = useState([])
  const [tableValues,setTableValues] = useState([])

  const processData = (data) => {
        const rowsArray = [];
        const valuesArray = [];
  
        const workbook = XLSX.read(data, { type: "binary", cellDates: false });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);

        const filteredData = json.filter((item) => (item["Pickup RF"] == "SYD") && (item["Pickup CF"] != "Total"));

        setParsedData(filteredData);
  
        const extractedData = filteredData.map((row) => {
          return {
            "Pickup RF": row["Pickup RF"],
            "Pickup CF": row["Pickup CF"],
            TotalReceived: row["Num of Parcels Received"],
            "TotalSorted%": Math.round(row["% of Sorted to Destination"] * 100) + "%",
            "TotalDeparted%": Math.round(row["% of Departed"] * 100) + "%",
          };
        });

        const newData = extractedData.map((item) => ({
          ...item,
          "Count of item not sorted": Math.floor(
            parseInt(item.TotalReceived,10) - (parseInt(item.TotalReceived,10) * parseFloat(item["TotalSorted%"])/100)
          ),
          Bay: OSHUsageData.OSHUsage.map((temp) => {
            if (item["Pickup CF"] == temp["Run #"]) {
              return temp["For OSH usage"];
            }
          }),
        }));
  
        newData.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });
  
        // Parsed Data Response in array format
  
        // Filtered Column Names
        setTableRows(rowsArray[0]);
  
        // Filtered Values
        setTableValues(valuesArray);
      };

      useEffect(() => {
        const file = props.uploadTwoFour.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = event.target.result;
          processData(data);
        };
        reader.readAsBinaryString(file);
      }, [props.uploadTwoFour]);

return(
    <table class="table-auto border-x border-b w-full text-left text-gray-800">
          <thead className="">
            <tr>
              {tableRows.map((rows, index) => {
                return (
                  <th
                    className="font-bold p-2 border-b border-l border-red-700 text-left bg-red-700 text-white"
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

export default TableTwoFour