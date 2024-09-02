import React from 'react'
import {useState,useEffect,useRef} from 'react'
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

function TableOne(props){
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);

  const Chullora = 36
  const Matraville = 27
  const OSH = 77
  const WetherillPark = 59

  useEffect(() => {
    const rowsArray = [];
    const valuesArray = [];

    let json = [
    {
      "Bays": "Blu",
    },
    {
      "Bays": "Chullora",
    },
    {
      "Bays": "Matraville",
    },
    {
      "Bays": "OSH",
    },
    {
      "Bays": "Other",
    },
    {
      "Bays": "Parcel connect",
    },
    {
      "Bays": "Wetherill Park",
    },
  ];

  const newData = json.map((item) => {

    let activeCount = 0
    let pmCheckInCount = 0
    let overallScore = 0
    let pickupTotal = 0
    let deliveryTotal = 0
    let onboardTotal = 0
    let overdue = 0
    let sortedCageScore = 0
    let count = 0
    let hoursWorked = 0


    props.DataTwoA?.map((temp) => {
      if(item["Bays"]==temp["Bay"] && temp["Run Active Status"]=="Active"){
        activeCount = activeCount + 1;
      }
      if(item["Bays"]==temp["Bay"] && temp["PM checkout status"]=="No PM Return"){
        pmCheckInCount = pmCheckInCount + 1;
      }
      if(item["Bays"]==temp["Bay"]){
        overallScore = overallScore + parseInt(temp["Overall Score"])
      }
    })

    props.DataTwoOne?.map((temp) => {
      if(item["Bays"]==temp["Final Bay"]){
        if (temp["Pickup Total"] !== "") {
          pickupTotal += parseInt(temp["Pickup Total"]);
        }
        if (temp["Delivery Total"] !== "") {
          deliveryTotal += parseInt(temp["Delivery Total"]);
        }
        if (temp["Onboard Total"] !== "") {
          onboardTotal += parseInt(temp["Onboard Total"]);
        }
        if (temp["Overdue"] !== "") {
          overdue += parseInt(temp["Overdue"]);
        }
        if (temp["Active status"] == "Active"){
        hoursWorked = hoursWorked + temp["Hours worked"]
        }
      }

    })

    props.DataTwoFour?.map((temp) => {

      if(item["Bays"]==temp["Bay"]){
        count += 1;
        sortedCageScore = sortedCageScore + parseInt(temp["TotalSorted%"])
      }
    })

    console.log("Overall Score",overallScore/activeCount)

    return {
      ...item,
      "Active" : activeCount,
      "No PM check in" : pmCheckInCount,
      "Avg hours worked per active ID" : (activeCount==0) ? 0 : (hoursWorked/activeCount),
      "Total load time:(hour)" : 0,
      "Load speed: Item/min, per active  ID": 0,
      "Overall score (%)" : (activeCount==0) ? 0 + "%" : Math.round(overallScore / activeCount) + "%",
      "Pickup Total" : pickupTotal,
      "Delivery Total" : deliveryTotal,
      "Onboard Total" : onboardTotal,
      "Average onboard per Courier/OSH" : (activeCount==0) ? 0 : Math.round(onboardTotal / activeCount),
      "Average Delivery per Courier/OSH" : (activeCount==0) ? 0 : Math.round(deliveryTotal / activeCount),
      "Overdue" : overdue,
      "Sorted to cage score" : (count==0) ? 0 + "%" : Math.round(sortedCageScore / count) + "%",
    };
  })

  props.setDataOne(newData)

    newData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });

    setTableRows(rowsArray[0]);
    setTableValues(valuesArray);

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
  }, []);

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

export default TableOne