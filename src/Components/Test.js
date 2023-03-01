import React from "react";
import { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";

function getExtension(filename) {
  return filename.split(".").pop();
}

function Test() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    const rowsArray = [];
    const valuesArray = [];

    if (
      getExtension(event.target.files[0]["name"]).toLowerCase() === "xlsm" ||
      "xlsx"
    ) {
      const processData = (data) => {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);

        const newData = json.map((item) => ({
          ...item,
          "Count of item not sorted": Math.floor(
            item.TotalReceived - item.TotalReceived * item["TotalSorted%"]
          ),
        }));

        newData.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
          console.log(d);
        });

        // Parsed Data Response in array format
        setParsedData(json);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      };

      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        processData(data);
      };
      reader.readAsBinaryString(file);
    } else {
      // Passing file data (event.target.files[0]) to parse using Papa.parse
      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rowsArray = [];
          const valuesArray = [];
          // Iterating data to get column name and their values
          results.data.map((d) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });

          // Parsed Data Response in array format
          setParsedData(results.data);
          // Filtered Column Names
          setTableRows(rowsArray[0]);
          // Filtered Values
          setValues(valuesArray);
        },
      });
    }
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
            Upload .csv or .xlsm or .xlxs files only
          </label>
        </div>
      </div>
      <div className="flex justify-between mt-[3%]">
        <Button
          color="error"
          variant="outlined"
          onClick={() => {
            alert("clicked");
          }}
        >
          1. Executive Summary
        </Button>
        <Button variant="outlined" color="error">2.A Score Table(CF)</Button>
        <Button variant="outlined" color="error">2.B Score Table(Blu,OSH)</Button>
        <Button variant="outlined" color="error">2.1 Data Control Tower</Button>
        <Button variant="outlined" color="error">2.2 Missed Pickup Data</Button>
        <Button variant="outlined" color="error">2.3.1 Check in-check Analysis</Button>
        <Button variant="outlined" color="error">2.3.2 Check in-check Data</Button>
        <Button variant="outlined" color="error">2.4 Cage Scan Compliance</Button>
      </div>

      <div className="mt-[3%] flex justify-center">
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
            {values.map((value, index) => {
              return (
                <tr className="odd:bg-gray-100 hover:!bg-red-200" key={index}>
                  {value.map((val, i) => {
                    return (
                      <td
                        contenteditable="true"
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
    </>
  );
}

export default Test;
