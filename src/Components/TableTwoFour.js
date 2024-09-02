import React from "react";
import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { OSHUsageData } from "../data/OSHUsage";
import Papa from "papaparse";
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

function TableTwoFour(props) {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);

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
          Math.round(
            Number(row["% of Sorted to Destination"]) * 1000000000000
          ) /
            10000000000 +
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
      "TotalSorted%":
        Math.round((parseFloat(item["TotalSorted%"]) * 100) / 100) + "%",
    }));

    newData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });

    // Parsed Data Response in array format
    props.setDataTwoFour(newData);

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
  }, [props.uploadTwoFour]);

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

export default TableTwoFour;
