import React from 'react'
import {useState,useEffect,useRef} from 'react'
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

export default function TableTwoThreeTwo(props) {

  const [tableRows,setTableRows] = useState([])
  const [tableValues,setTableValues] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);

  let previousRun
  let IsOut = false

    const getFileExtension = (fileName) => {
      const lastDotIndex = fileName.lastIndexOf(".");
      if (lastDotIndex === -1) {
        return "";
      }
      return fileName.slice(lastDotIndex + 1);
    };

    function scanDateFormatter(scanDate){
      const [date, time, period] = scanDate.split(' ');
      const [day, month, year] = date.split('/');
    
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours, 10);
    
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }
    
      return `${day}/${month}/${year} ${hours.toString().padStart(2, '0')}:${minutes}`;
    }

    function dateChecker(rawDate){
      const [date, time, period] = rawDate.split(' ');
      const [day, month, year] = date.split('/');
    
      let [hours, minutes] = time.split(':');
      hours = parseInt(hours, 10);
    
      if (period === 'PM' && hours !== 12) {
        hours += 12;
      } else if (period === 'AM' && hours === 12) {
        hours = 0;
      }

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
        const results = Papa.parse(data, { header: true,dynamicTyping: false });
        json = results.data;
      }

      const updatedData = json.map((item, index) => {

        if(previousRun){
          if(previousRun["Item Name"]!==item["Item Name"]){
            IsOut=false
          }
        }
        previousRun = item

        let Run1 = "";
        let Run2 = "";
        let Run3 = "";
        let Run4 = "";
        let CheckInAM = "";
        let CheckOutAM = "";
        let CheckInPM = "";
        let CheckOutPM = "";

        if (item["Date Moved"] && !IsOut && dateChecker(item["Date Moved"]) === "AM") {
          Run1 = item["Item Name"];
          CheckInAM = item["Date Moved"];
        }
        else if(item["Date Moved"] && IsOut && dateChecker(item["Date Moved"]) === "AM"){
          Run2 = item["Item Name"];
          CheckOutAM = item["Date Moved"];
        }
        else if(item["Date Moved"] && !IsOut && dateChecker(item["Date Moved"]) === "PM"){
          Run3 = item["Item Name"];
          CheckInPM = item["Date Moved"];
        }
        else if(item["Date Moved"] && IsOut && dateChecker(item["Date Moved"]) === "PM"){
          Run4 = item["Item Name"];
          CheckOutPM = item["Date Moved"];
        }

        IsOut = !IsOut
        
        return{
        ...item,
        "Date Moved" : item["Date Moved"] ? scanDateFormatter(item["Date Moved"]) : null,
        "Cycle": "",
        "Run #1": Run1,
        "Check In AM": CheckInAM,
        "Run #2": Run2,
        "Check Out AM": CheckOutAM,
        "Run #3": Run3,
        "Check In PM": CheckInPM,
        "Run #4": Run4,
        "Check Out PM": CheckOutPM,
        }
      })


      props.setDataTwoThreeTwo(updatedData)
      
      updatedData.map((d) => {
        rowsArray.push(Object.keys(d));
        valuesArray.push(Object.values(d));
      });

      // Filtered Column Names
      setTableRows(rowsArray[0]);

      // Filtered Values
      setTableValues(valuesArray);
    };

    useEffect(() => {
      const file = props.uploadTwoThreeTwo.target.files[0];
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
    }, [props.uploadTwoThreeTwo,props.selectedDate]);

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
