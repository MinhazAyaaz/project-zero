import React from "react";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { PaymentData } from "../data/PaymentMethod";

function TableTwoOne(props) {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const runNumbers = [];

  useEffect(() => {
    // This function will only run once, when the component is mounted
    PaymentData.payment.map((temp) => {
      runNumbers.push(temp["Run"]);
    });
  }, []);

  const getFileExtension = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
      return "";
    }
    return fileName.slice(lastDotIndex + 1);
  };

  function getHoursBetween(startTime, endTime) {
    const start = new Date("2023-03-08 " + startTime); // set date to today, but only use the time part
    const end = new Date("2023-03-08 " + endTime); // set date to today, but only use the time part

    // handle cases where the end time is before the start time (e.g. 10:00 PM to 3:00 AM)
    if (end.getTime() < start.getTime()) {
      end.setDate(end.getDate() + 1); // add one day to the end date
    }

    const diff = end.getTime() - start.getTime(); // get the difference in milliseconds
    const hours = diff / (1000 * 60 * 60); // convert to hours

    return hours;
  }

  const processData = (data, fileName) => {
    const rowsArray = [];
    const valuesArray = [];
    let json = [];

    if (getFileExtension(fileName) == "xlsx") {
      const workbook = XLSX.read(data, { type: "binary", cellDates: true });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const headers = [
        "RF Code",
        "CF",
        "Scanner",
        "Courier Group",
        "Stem Time",
        "Stops Per Hour",
        "Overdue",
        "Due Today",
        "Total Due",
        "Days Behind",
        "MultiONB Scans",
        "In Transit",
        "In Transit-Arrived Dest",
        "Start Time",
        "Finish Time",
        "Pickup Total",
        "Delivery Total",
        "Onboard Total",
        "Given to Blu",
        "OOT",
        "Avg Daily Pickup",
        "Avg Daily Delivery",
        "Avg Performence",
        "Yesterday Performence",
      ];
      json = XLSX.utils.sheet_to_json(sheet, {
        header: headers,
        defval: "",
        raw: false,
        dateNF: "dd-mm-yy hh:mm",
      });
    } else if (getFileExtension(fileName) == "csv") {
      const results = Papa.parse(data, { header: true });
      json = results.data;
    }

    const trimmedSheetData = json.slice(2);

    let newData = trimmedSheetData.map((item) => {
      const typicalPaymentTime = PaymentData.payment.reduce((acc, temp) => {
        if (item["Scanner"] === temp["Run"]) {
          return temp["Payment method"];
        }
        return acc;
      }, undefined);
      const paymentTime = typicalPaymentTime || "Not OSH"; // Use the || operator to assign "Not OSH" if paymentTime is falsy
      return {
        ...item,
        "Hours worked": isNaN(
          getHoursBetween(item["Start Time"], item["Finish Time"])
        )
          ? 0
          :
              getHoursBetween(item["Start Time"], item["Finish Time"])
            ,
        "Active status": item["Onboard Total"] > 1 ? "Active" : "Inactive",
        "Typical Payment Time":
          paymentTime !== null && paymentTime !== "" ? paymentTime : "Not OSH", // Check for empty string or null
      };
    });

    newData = newData.map((item) => {
      const isActive = item["Active status"] === "Active";
      const isParcelRate = item["Typical Payment Time"] === "Parcel rate";
      const isDayRate = item["Typical Payment Time"] === "Day rate";
      const oshCost =
        isActive && isParcelRate
          ? "$" + (item["Pickup Total"] * 1.1 + item["Delivery Total"] * 4.08)
          : isDayRate
          ? "$" + 400
          : "$";
      return {
        ...item,
        "OSH cost($AUD)": oshCost,
      };
    });

    // Loop through each row of the object and round the value of the "Stops Per Hour" column
    newData.forEach((row) => {
      if (row["Stops Per Hour"]) {
        row["Stops Per Hour"] = parseFloat(row["Stops Per Hour"]);
      }
      if(row["Hours worked"]){
        row["Hours worked"] = parseFloat(row["Hours worked"]);
      }
    });

    console.log("First",newData)

    props.setDataTwoOne(newData);
    console.log(newData)

    // // Loop through each row of the object and round the value of the "Stops Per Hour" column
    // newData.forEach((row) => {
    //   if (row["Stops Per Hour"]) {
    //     row["Stops Per Hour"] = Math.round(row["Stops Per Hour"]);
    //   }
    //   if(row["Hours worked"]){
    //     row["Hours worked"] = Math.round(row["Hours worked"]);
    //   }
    // });

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
    const file = props.uploadTwoOne.target.files[0];
    const fileName = file.name;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      processData(data, fileName);
    };
    reader.readAsBinaryString(file);
  }, [props.uploadTwoOne]);

  return (
    <div style={{ width: "100%", overflowX: "auto", overflow: "visible" }}>
      <table
        class="table-auto border-x border-b w-full text-left text-gray-800"
        style={{ tableLayout: "fixed" }}
      >
        <thead className="">
          <tr>
            {tableRows.map((rows, index) => {
              return (
                <th
                  className="font-bold p-2 border-b border-l border-[#dc291e] text-left bg-[#dc291e] text-white"
                  key={index}
                  style={{ width: "200px" }}
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
                      style={{ width: "200px" }}
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
  );
}

export default TableTwoOne;
