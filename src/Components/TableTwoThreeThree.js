import React from 'react'
import {useState,useEffect, useRef} from 'react'
import * as XLSX from "xlsx";
import Papa from 'papaparse';
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

function TableTwoThreeThree(props){

  const [tableRows,setTableRows] = useState([]);
  const [tableValues,setTableValues] = useState([]);
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

    function scanDateFormatter(scanDate){

      const [date, time] = scanDate.split(' ');
      const [month,day, year] = date.split('/');
      const [hours, minutes] = time.split(':');

      const formattedDay = day.padStart(2, '0');
      const formattedMonth = month.padStart(2, '0');

      return formattedDay+"-"+formattedMonth+"-"+year+" "+hours+":"+minutes

    }

    function dateChecker(rawDate){
    
      const [date, time] = rawDate.split(' ');
      const [month,day, year] = date.split('-');
      const [hours, minutes] = time.split(':');
      const dateTime = new Date(parseInt(year,10),month-1,day, hours, minutes);
    
      const now = props.selectedDate
      now.setHours(11);
      now.setMinutes(29);
      now.setSeconds(0);
    
      if (dateTime.getTime() < now.getTime()) {
        return "AM";
      } else {
        return "PM";
      }
    }

    const processData = (data,fileName) => {
      const rowsArray = [];
      const valuesArray = [];
      let json = [];

      if(getFileExtension(fileName)=="xlsx"){
        const workbook = XLSX.read(data, { type: "binary", cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        json = XLSX.utils.sheet_to_json(sheet,{raw: false, dateNF: 'dd-mm-yy hh:mm' });
      }
      else if(getFileExtension(fileName) =="csv"){
        const results = Papa.parse(data, { header: true });
        json = results.data;
      }

      const extractedData = json.map((row) => {
        return {
          CourierNo: row["CourierNo"],
          ScanDate: row["ScanDate"] ? scanDateFormatter(row["ScanDate"]) : null,
          Description: row["Description"],
          Latitude: row["Latitude"],
          Longitude: row["Longitude"],
        };
      });


      const newData = extractedData.map((item) => ({
        ...item,
        "CF AM In": (item.ScanDate && dateChecker(item.ScanDate)=="AM" && item.Description=="Check In") ? item.CourierNo : "",
        "Check in AM": (item.ScanDate && dateChecker(item.ScanDate)=="AM" && item.Description=="Check In") ? item.ScanDate : "",
        "CF AM OUT": (item.ScanDate && dateChecker(item.ScanDate)=="AM" && item.Description=="Check Out") ? item.CourierNo : "",
        "Check out AM": (item.ScanDate && dateChecker(item.ScanDate)=="AM" && item.Description=="Check Out") ? item.ScanDate : "",
        "CF PM IN" : (item.ScanDate && dateChecker(item.ScanDate)=="PM" && item.Description=="Check In") ? item.CourierNo : "",
        "Check in PM": (item.ScanDate && dateChecker(item.ScanDate)=="PM" && item.Description=="Check In") ? item.ScanDate : "",
        "CF PM OUT": (item.ScanDate && dateChecker(item.ScanDate)=="PM" && item.Description=="Check Out") ? item.CourierNo : "",
        "Check out PM": (item.ScanDate && dateChecker(item.ScanDate)=="PM" && item.Description=="Check Out") ? item.ScanDate : "",
      }));

      props.setDataTwoThreeThree(newData)
      

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
      const file = props.uploadTwoThreeThree.target.files[0];
      const fileName = file.name; // get the file name from the File object
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        processData(data,fileName);
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
    }, [props.uploadTwoThreeThree,props.selectedDate]);

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

return(
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
)


}

export default TableTwoThreeThree