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
  const [parsedData1, setParsedData1] = useState([]);
  const [parsedData2, setParsedData2] = useState([]);
  const [parsedData3, setParsedData3] = useState([]);
  const [parsedData4, setParsedData4] = useState([]);
  const [parsedData5, setParsedData5] = useState([]);
  const [parsedData6, setParsedData6] = useState([]);
  const [parsedData7, setParsedData7] = useState([]);
  const [parsedData8, setParsedData8] = useState([]);
  //State to store table Column name
  const [tableRows1, setTableRows1] = useState([]);
  const [tableRows2, setTableRows2] = useState([]);
  const [tableRows3, setTableRows3] = useState([]);
  const [tableRows4, setTableRows4] = useState([]);
  const [tableRows5, setTableRows5] = useState([]);
  const [tableRows6, setTableRows6] = useState([]);
  const [tableRows7, setTableRows7] = useState([]);
  const [tableRows8, setTableRows8] = useState([]);
  //State to store the values
  const [tableValues1, setTableValues1] = useState([]);
  const [tableValues2, setTableValues2] = useState([]);
  const [tableValues3, setTableValues3] = useState([]);
  const [tableValues4, setTableValues4] = useState([]);
  const [tableValues5, setTableValues5] = useState([]);
  const [tableValues6, setTableValues6] = useState([]);
  const [tableValues7, setTableValues7] = useState([]);
  const [tableValues8, setTableValues8] = useState([]);

  const [One, setOne] = useState(false);
  const [TwoA, setTwoA] = useState(false);
  const [TwoB, setTwoB] = useState(false);
  const [TwoOne, setTwoOne] = useState(false);
  const [TwoTwo, setTwoTwo] = useState(false);
  const [TwoThreeOne, setTwoThreeOne] = useState(false);
  const [TwoThreeTwo, setTwoThreeTwo] = useState(false);
  const [TwoFour, setTwoFour] = useState(false);

  const changeHandler = (event) => {

    function scanDateFormatter(scanDate){

      const [date, time] = scanDate.split(' ');
      console.log("date", date);
      console.log("time", time);
      const [month,day, year] = date.split('/');
      console.log("day", day);
      console.log("month", month);
      console.log("year", year);
      const [hours, minutes] = time.split(':');

      return day+"-0"+month+"-"+year+" "+hours+":"+minutes

    }

    function dateChecker(rawDate){
    
      const [date, time] = rawDate.split(' ');
      const [day,month, year] = date.split('-');
      const [hours, minutes] = time.split(':');
      const dateTime = new Date(parseInt(year,10)+2000,month-1,day, hours, minutes);

      const now = new Date(2023,1,24,11,59)
    
      // const now = new Date();
      // now.setHours(11);
      // now.setMinutes(59);
      // now.setSeconds(0);
    
      if (dateTime.getTime() < now.getTime()) {
        return "AM";
      } else {
        return "PM";
      }
    }

    const processData6 = (data) => {
      const rowsArray = [];
      const valuesArray = [];

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[6];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      const extractedData = json.map((row) => {
        return {
          Bay: row["Bay"],
          CF: row["CF"],
          "Courier Name": row["Courier Name"],
          "CF run converted": row["CF run converted"],
        };
      });

      extractedData.map((d) => {
        rowsArray.push(Object.keys(d));
        valuesArray.push(Object.values(d));
      });

      // Parsed Data Response in array format
      setParsedData6(extractedData);

      // Filtered Column Names
      setTableRows6(rowsArray[0]);

      // Filtered Values
      setTableValues6(valuesArray);
    };

    const processData7 = (data) => {
      const rowsArray = [];
      const valuesArray = [];

      const workbook = XLSX.read(data, { type: "binary", cellDates: true });
      const sheetName = workbook.SheetNames[7];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet,{raw: false, dateNF: 'dd-mm-yy hh:mm' });

      const extractedData = json.map((row) => {
        return {
          CourierNo: row["CourierNo"],
          ScanDate: scanDateFormatter(row["ScanDate"]),
          Description: row["Description"],
          Latitude: row["Latitude"],
          Longitude: row["Longitude"],
        };
      });

      const newData = extractedData.map((item) => ({
        ...item,
        "CF AM In": (dateChecker(item.ScanDate)=="AM" && item.Description=="Check In") ? item.CourierNo : "",
        "Check in AM": (dateChecker(item.ScanDate)=="AM" && item.Description=="Check In") ? item.ScanDate : "",
        "CF AM OUT": (dateChecker(item.ScanDate)=="AM" && item.Description=="Check Out") ? item.CourierNo : "",
        "Check out AM": (dateChecker(item.ScanDate)=="AM" && item.Description=="Check Out") ? item.ScanDate : "",
        "CF PM IN" : (dateChecker(item.ScanDate)=="PM" && item.Description=="Check In") ? item.CourierNo : "",
        "Check in PM": (dateChecker(item.ScanDate)=="PM" && item.Description=="Check In") ? item.ScanDate : "",
        "CF PM OUT": (dateChecker(item.ScanDate)=="PM" && item.Description=="Check Out") ? item.CourierNo : "",
        "Check out PM": (dateChecker(item.ScanDate)=="PM" && item.Description=="Check Out") ? item.ScanDate : "",
        
      }));

      newData.map((d) => {
        rowsArray.push(Object.keys(d));
        valuesArray.push(Object.values(d));
      });

      // Parsed Data Response in array format
      setParsedData7(newData);

      // Filtered Column Names
      setTableRows7(rowsArray[0]);

      // Filtered Values
      setTableValues7(valuesArray);
    };

    const processData8 = (data) => {
      const rowsArray = [];
      const valuesArray = [];

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[8];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet,{raw: false});

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
      setParsedData8(newData);

      // Filtered Column Names
      setTableRows8(rowsArray[0]);

      // Filtered Values
      setTableValues8(valuesArray);
    };

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      processData6(data);
      processData7(data);
      processData8(data);
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
            ParsedData={parsedData1}
            TableRows={tableRows1}
            TableValues={tableValues1}
          />
        )}
        {TwoA && (
          <TableTwoA
            ParsedData={parsedData2}
            TableRows={tableRows2}
            TableValues={tableValues2}
          />
        )}
        {TwoB && (
          <TableTwoB
            ParsedData={parsedData3}
            TableRows={tableRows3}
            TableValues={tableValues3}
          />
        )}
        {TwoOne && (
          <TableTwoOne
            ParsedData={parsedData4}
            TableRows={tableRows4}
            TableValues={tableValues4}
          />
        )}
        {TwoTwo && (
          <TableTwoTwo
            ParsedData={parsedData5}
            TableRows={tableRows5}
            TableValues={tableValues5}
          />
        )}
        {TwoThreeOne && (
          <TableTwoThreeOne
            ParsedData={parsedData6}
            TableRows={tableRows6}
            TableValues={tableValues6}
          />
        )}
        {TwoThreeTwo && (
          <TableTwoThreeTwo
            ParsedData={parsedData7}
            TableRows={tableRows7}
            TableValues={tableValues7}
          />
        )}
        {TwoFour && (
          <TableTwoFour
            ParsedData={parsedData8}
            TableRows={tableRows8}
            TableValues={tableValues8}
          />
        )}
      </div>
    </>
  );
}

export default Main;
