import React from "react";
import { useState, useEffect,useRef } from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { OSHUsageData } from "../data/OSHUsage";
import { BayData } from "../data/Bay";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  TableContainer
} from "@mui/material";
import "./styles.css";

function TableTwoTwo(props) {
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);

  function monthFilter(rawDate) {
    if (typeof rawDate === "undefined") {
      return false;
    }

    const [date, time] = rawDate.split(" ");
    const [day, month, year] = date.split("/");

    const now = props.selectedDate
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

      const tempDate = props.selectedDate
      tempDate.setHours(3)
      tempDate.setMinutes(0)
      tempDate.setSeconds(0)
      // Check if the message date is before 3AM today
      return messageDate < tempDate
    });

    const finalData = newFilteredData.map((item) => {

      let FinalRun = "Run not found"
      let BayItem

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

      OSHUsageData.OSHUsage.map((temp) => {
        if (item["PickupCourierNumber"] == temp["Run #"]) {
          BayItem =  temp["Subdepot codes"];
        }
      })

      BayData.Bay.map((temp) => {
        if(item["PickupCourierNumber"] == temp["CF"]){
          FinalRun = temp["CF"]
        }
      })


      return {
        ...item,
        "KPI Status": KPIStatus(item),
        "Final Run": FinalRun,
        "Bay": BayItem,
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
  }, [props.uploadTwoTwo,props.selectedDate]);

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
      <Table>
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

export default TableTwoTwo;
