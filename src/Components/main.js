import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import TableOne from "./TableOne";
import TableTwoA from "./TableTwoA";
import TableTwoB from "./TableTwoB";
import TableTwoOne from "./TableTwoOne";
import TableTwoTwo from "./TableTwoTwo";
import TableTwoThreeOne from "./TableTwoThreeOne";
import TableTwoThreeTwo from "./TableTwoThreeTwo";
import TableTwoFour from "./TableTwoFour";
import { OSHUsageData } from "../data/OSHUsage";

function Main() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);
  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  //State to store the values
  const [tableValues, setTableValues] = useState([]);

  const [One, setOne] = useState(false);
  const [TwoA, setTwoA] = useState(false);
  const [TwoB, setTwoB] = useState(false);
  const [TwoOne, setTwoOne] = useState(false);
  const [TwoTwo, setTwoTwo] = useState(false);
  const [TwoThreeOne, setTwoThreeOne] = useState(false);
  const [TwoThreeTwo, setTwoThreeTwo] = useState(false);
  const [TwoFour, setTwoFour] = useState(false);

  const changeHandler = (event) => {
    const rowsArray = [];
    const valuesArray = [];

    const processData = (data) => {
      const workbook = XLSX.read(data, { type: "binary" });
      //const sheetName = workbook.SheetNames[0];
      //const sheetName = workbook.SheetNames[1];
      //const sheetName = workbook.SheetNames[2];
      //const sheetName = workbook.SheetNames[3];
      //const sheetName = workbook.SheetNames[4];
      //const sheetName = workbook.SheetNames[5];
      //const sheetName = workbook.SheetNames[6];
      //const sheetName = workbook.SheetNames[7];
      const sheetName = workbook.SheetNames[8];
      const sheet = workbook.Sheets[sheetName];
      //using range to only pick A to C coulmns, must change for different sheets
      const json = XLSX.utils.sheet_to_json(sheet);

      const extractedData = json.map((row) => {
        return {
          "Pickup RF": row["Pickup RF"],
          "Pickup CF": row["Pickup CF"],
          TotalReceived: row["TotalReceived"],
          "TotalSorted%": row["TotalSorted%"],
          "TotalDeparted%": row["TotalDeparted%"],
        };
      });

      const newData = extractedData.map((item) => ({
        ...item,
        "Count of item not sorted": Math.floor(
          item.TotalReceived - item.TotalReceived * item["TotalSorted%"]
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
      setParsedData(json);

      // Filtered Column Names
      setTableRows(rowsArray[0]);

      // Filtered Values
      setTableValues(valuesArray);
    };

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <div className="flex justify-center mt-[3%]">
        <div className="flex flex-col">
          <h1 className="text-2xl text-neutral-700">Upload File Here:</h1>
          {/* File Uploader */}
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept=".xlsm,.csv,.xlsx"
            class="mt-[5%] relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-400 dark:focus:bg-transparent"
          />
          <label className="text-neutral-500 mt-[2%] ml-[2%]">
            Upload .xlsm or .xlxs files only
          </label>
        </div>
      </div>
      <div className="flex justify-between mt-[3%]">
        <Button
          color="error"
          variant={One ? "contained" : "outlined"}
          onClick={() => {
            setOne(true);
            setTwoA(false);
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
          }}
        >
          1. Executive Summary
        </Button>
        <Button
          variant={TwoA ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(true);
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
          }}
        >
          2.A Score Table(CF)
        </Button>
        <Button
          variant={TwoB ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoB(true);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
          }}
        >
          2.B Score Table(Blu,OSH)
        </Button>
        <Button
          variant={TwoOne ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoB(false);
            setTwoOne(true);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
          }}
        >
          2.1 Data Control Tower
        </Button>
        <Button
          variant={TwoTwo ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(true);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
          }}
        >
          2.2 Missed Pickup Data
        </Button>
        <Button
          variant={TwoThreeOne ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(true);
            setTwoThreeTwo(false);
            setTwoFour(false);
          }}
        >
          2.3.1 Check in-check Analysis
        </Button>
        <Button
          variant={TwoThreeTwo ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(true);
            setTwoFour(false);
          }}
        >
          2.3.2 Check in-check Data
        </Button>
        <Button
          variant={TwoFour ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(true);
          }}
        >
          2.4 Cage Scan Compliance
        </Button>
      </div>

      <div className="mt-[3%] flex justify-center">
        {One && (
          <TableOne
            ParsedData={parsedData}
            TableRows={tableRows}
            TableValues={tableValues}
          />
        )}
        {TwoA && (
          <TableTwoA
            ParsedData={parsedData}
            TableRows={tableRows}
            TableValues={tableValues}
          />
        )}
        {TwoB && (
          <TableTwoB
            ParsedData={parsedData}
            TableRows={tableRows}
            TableValues={tableValues}
          />
        )}
        {TwoOne && (
          <TableTwoOne
            ParsedData={parsedData}
            TableRows={tableRows}
            TableValues={tableValues}
          />
        )}
        {TwoTwo && (
          <TableTwoTwo
            ParsedData={parsedData}
            TableRows={tableRows}
            TableValues={tableValues}
          />
        )}
        {TwoThreeOne && (
          <TableTwoThreeOne
            ParsedData={parsedData}
            TableRows={tableRows}
            TableValues={tableValues}
          />
        )}
        {TwoThreeTwo && (
          <TableTwoThreeTwo
            ParsedData={parsedData}
            TableRows={tableRows}
            TableValues={tableValues}
          />
        )}
        {TwoFour && (
          <TableTwoFour
            ParsedData={parsedData}
            TableRows={tableRows}
            TableValues={tableValues}
          />
        )}
      </div>
    </>
  );
}

export default Main;
