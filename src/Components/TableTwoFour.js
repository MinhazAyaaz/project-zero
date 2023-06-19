import React from "react";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { OSHUsageData } from "../data/OSHUsage";
import Papa from "papaparse";

function TableTwoFour(props) {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);

  const getFileExtension = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
      return "";
    }
    return fileName.slice(lastDotIndex + 1);
  };

  const processData = (data, fileName) => {
    const rowsArray = [];
    const valuesArray = [];
    let json = [];

    if (getFileExtension(fileName) == "xlsx") {
      const workbook = XLSX.read(data, { type: "binary", cellDates: false });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      json = XLSX.utils.sheet_to_json(sheet);
    } else if (getFileExtension(fileName) == "csv") {
      const results = Papa.parse(data, { header: true });
      json = results.data;
    }

    const filteredData = json.filter(
      (item) => item["Pickup RF"] == "SYD" && item["Pickup CF"] != "Total"
    );

    const extractedData = filteredData.map((row) => {
      return {
        "Pickup RF": row["Pickup RF"],
        "Pickup CF": row["Pickup CF"],
        TotalReceived: row["Num of Parcels Received"],
        "TotalSorted%":
          Math.round(Number(row["% of Sorted to Destination"]) * 1000000000000) / 10000000000 +
          "%",
        "TotalDeparted%":
          Math.round(Number(row["% of Departed"]) * 10000) / 100 + "%",
      };
    });


    setParsedData(extractedData);

    const newData = extractedData.map((item) => ({
      ...item,
      "Count of item not sorted": Math.round(
        parseInt(item.TotalReceived, 10) -
          (parseInt(item.TotalReceived, 10) *
            parseFloat(item["TotalSorted%"])) /
            100
      ),
      Bay: OSHUsageData.OSHUsage.reduce((accumulator, temp) => {
        if (item["Pickup CF"] === temp["Run #"]) {
          return temp["Subdepot codes"];
        }
        return accumulator;
      }, null),
      "TotalSorted%": Math.round((parseFloat(item["TotalSorted%"]) * 100)/100) + "%"
    }));

    newData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });

    // Parsed Data Response in array format
    props.setDataTwoFour(newData)

    // Filtered Column Names
    setTableRows(rowsArray[0]);

    // Filtered Values
    setTableValues(valuesArray);
  };

  useEffect(() => {
    const file = props.uploadTwoFour.target.files[0];
    const fileName = file.name;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      processData(data, fileName);
    };
    reader.readAsBinaryString(file);
  }, [props.uploadTwoFour]);

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

export default TableTwoFour;
