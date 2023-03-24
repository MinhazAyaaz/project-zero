import React from "react";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { OSHUsageData } from "../data/OSHUsage";

function TableTwoTwo(props) {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);

  function monthFilter(rawDate) {
    if (typeof rawDate === "undefined") {
      return false;
    }

    const [date, time] = rawDate.split(" ");
    const [day, month, year] = date.split("/");

    const now = new Date(2023, 2, 15);
    const currentDay = now.getDate();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (
      parseInt(day) === currentDay &&
      parseInt(month) === currentMonth &&
      parseInt(year) === currentYear
    ) {
      return true;
    } else {
      return false;
    }
  }

  const processData = (data, fileName) => {
    const rowsArray = [];
    const valuesArray = [];
    let json = [];

    const getFileExtension = (fileName) => {
      const lastDotIndex = fileName.lastIndexOf(".");
      if (lastDotIndex === -1) {
        return "";
      }
      return fileName.slice(lastDotIndex + 1);
    };

    if (getFileExtension(fileName) == "xlsx") {
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      json = XLSX.utils.sheet_to_json(sheet);
    } else if (getFileExtension(fileName) == "csv") {
      const results = Papa.parse(data, { header: true });
      json = results.data;
    }

    const filteredData = json.filter(
      (item) =>
        item["MessageSentDateUtc"] != "" &&
        monthFilter(item["RequestedPickupDate"])
    );

    const sortedData = filteredData.sort((a, b) => {
      const [date1, time1] = a["MessageSentDateUtc"].split(" ");
      const [day1, month1, year1] = date1.split("/");
      const [hour1, minute1, second1] = time1.split(":");
      const dateA = new Date(year1, month1 - 1, day1, hour1, minute1, second1);

      const [date2, time2] = b["MessageSentDateUtc"].split(" ");
      const [day2, month2, year2] = date2.split("/");
      const [hour2, minute2, second2] = time2.split(":");
      const dateB = new Date(year2, month2 - 1, day2, hour2, minute2, second2);
      return dateA - dateB;
    });

    // Filter the sorted data to keep only items before 3AM today
    const newFilteredData = sortedData.filter((item) => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const currentDay = now.getDate();
      const [date, time] = item["MessageSentDateUtc"].split(" ");
      const [day, month, year] = date.split("/");
      const [hour, minute, second] = time.split(":");
      const messageDate = new Date(year, month - 1, day, hour, minute, second);

      // Check if the message date is before 3AM today
      return messageDate < new Date(currentYear, currentMonth, 15, 3, 0, 0);
    });

    const finalData = newFilteredData.map((item) => {
      function KPIStatus(data) {
        if (data["CourierMessageResultText"] == "Accepted") {
          return "Fail";
        } else if (data["CourierMessageResultText"] == "Attempted") {
          return "Futile";
        } else if (data["CourierMessageResultText"] == "Completed") {
          return "Futile";
        } else if (data["CourierMessageResultText"] == "NoResult") {
          return "Fail";
        } else if (data["CourierMessageResultText"] == "Pending") {
          return "Fail";
        } else if (data["CourierMessageResultText"] == "PendingReturn") {
          return "Fail";
        } else if (data["CourierMessageResultText"] == "Rejected") {
          return "Futile";
        } else {
          return "Fail";
        }
      }

      return {
        ...item,
        "KPI Status": KPIStatus(item),
        "Final Run":
          item["PickupCourierNumber"] == ""
            ? "Pickup CF detail missing"
            : item["PickupCourierNumber"],
        Bay: OSHUsageData.OSHUsage.map((temp) => {
          if (item["PickupCourierNumber"] == temp["Run #"]) {
            return temp["For OSH usage"];
          }
        }),
      };
    });

    finalData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });

    // Parsed Data Response in array format
    props.setDataTwoTwo(finalData);

    // Filtered Column Names
    setTableRows(rowsArray[0]);

    // Filtered Values
    setTableValues(valuesArray);
  };

  useEffect(() => {
    const file = props.uploadTwoTwo.target.files[0];
    const fileName = file.name;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      processData(data, fileName);
    };
    reader.readAsBinaryString(file);
  }, [props.uploadTwoTwo]);

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

export default TableTwoTwo;
