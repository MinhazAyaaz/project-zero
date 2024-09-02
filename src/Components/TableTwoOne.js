import React from "react";
import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { PaymentData } from "../data/PaymentMethod";
import { OSHUsageData } from "../data/OSHUsage";
import { FinalData } from "../data/Final";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  TableContainer,
} from "@mui/material";
import "./styles.css";

function TableTwoOne(props) {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);
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

      let finalBay = ""
      let firstCheckIn 
      let lastCheckOut
      let checkInAm
      let checkOutAm
      let checkInPm
      let checkOutPm
      let loadingtime

      props?.DataTwoThreeOne?.map((temp) => {
        if(item["CF"]==temp["CF run converted"]){
          firstCheckIn = temp["First Check In"]
          lastCheckOut = temp["Last Check Out"]
          checkInAm = temp["Check In AM"]
          checkOutAm = temp["Check Out AM"]
          checkInPm = temp["Check In PM"]
          checkOutPm = temp["Check Out PM"]
        }
      })

      const typicalPaymentTime = PaymentData.payment.reduce((acc, temp) => {
        if (item["Scanner"] === temp["Run"]) {
          return temp["Payment method"];
        }
        return acc;
      }, undefined);

      const paymentTime = typicalPaymentTime || "Not OSH"; // Use the || operator to assign "Not OSH" if paymentTime is false

      OSHUsageData.OSHUsage.map((temp) => {
        if (item["Scanner"] == temp["Run #"]) {
          finalBay = temp["Subdepot codes"]
        }
      })

      if(checkInAm == "No AM Check In" || checkOutAm == "No AM Check Out"){
        loadingtime = item["Onboard Total"] > 1 ? "Active" : "Inactive"
      }
      else{
        const dateTime1 = new Date(checkInAm);
        const dateTime2 = new Date(checkOutAm);
        const timeDifference = Math.abs(dateTime2 - dateTime1);
        loadingtime = Math.floor(timeDifference / (1000 * 60));
      }

      return {
        ...item,
        "First Check In": firstCheckIn,
        "Last Check Out": lastCheckOut,
        "Check In AM": checkInAm,
        "Check Out Am": checkOutAm,
        "Check In PM": checkInPm,
        "Check Out PM": checkOutPm,
        "Loading Time(min)": loadingtime,
        "Hours worked": isNaN(
          getHoursBetween(item["Start Time"], item["Finish Time"])
        )
          ? 0
          : getHoursBetween(item["Start Time"], item["Finish Time"]),
        "Final Bay": finalBay ? finalBay : "Other",
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
      if (row["Hours worked"]) {
        row["Hours worked"] = parseFloat(row["Hours worked"]);
      }
    });

    props.setDataTwoOne(newData);

    newData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });

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

    // Add click event listener to Paper component
    const handleOutsideClick = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedRow(null); // Clicked outside the table, deselect the row
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [props.uploadTwoOne]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (rowData) => {
    if (selectedRow === rowData) {
      setSelectedRow(null); // Deselect the row if it's already selected
    } else {
      setSelectedRow(rowData);
    }
  };


  return (
    <Paper className="w-full px-[30px]">
      <TableContainer>
      <Table style={{ overflowX: 'auto' }}>
        <TableHead className="bg-[#d32f2f]">
          <TableRow>
            {tableRows.map((row, index) => (
              <TableCell key={index} sx={{ color: "#ffffff", fontWeight: 600 }}>
                {row}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody ref={tableRef}>
          {tableValues
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((value, index) => (
              <TableRow
                selected={selectedRow === value}
                key={index}
                className={`hover:bg-red-200 ${
                  index % 2 === 0 ? "odd:bg-gray-100" : ""
                }`}
                onClick={() => handleRowClick(value)}
              >
                {value.map((val, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      color: selectedRow === value ? "#ffffff" : "",
                      fontWeight: 400,
                    }}
                  >
                    {val}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={tableValues.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableTwoOne;
