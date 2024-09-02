import React from 'react'
import {useState,useEffect,useRef} from 'react'
import { TwoA } from "../data/TwoA";
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

function TableTwoA(props){
  const [tableRows, setTableRows] = useState([]);
  const [tableValues, setTableValues] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {

    if (dataFetched) {
      // Data has already been fetched and processed, no need to do it again
      return;
    }
    
    const rowsArray = [];
    const valuesArray = [];

    const json = TwoA['TwoA'];

    const newData = json.map((item) => {
      let PickupTotal = 0
      let FutilePickup = 0
      let FailPickup = 0
      let DeliveryTotal = 0
      let OnboardTotal = 0
      let OOT
      let SortCageScore = "0%"
      let RunStatus
      let OnTimeDelivery
      let OverDue
      let StopsPerHour = 0
      let HoursWorked = 0
      let TotalReceived
      let checkCompliance = "Pass"
      let PMReturn
      let pickupScore
      let deliveryScore
      let complianceScore
      let sortedCageScore
      let productivityScore
      let overallScore

      //Convert run value to integer with 0 prefix

      props?.DataTwoOne?.map((temp1) => {
        if(item["Run #"]==temp1["Scanner"]){
          PickupTotal = temp1["Pickup Total"]
          if(temp1["Delivery Total"]!=""){DeliveryTotal = temp1["Delivery Total"]}
          if(temp1["Onboard Total"]!=""){OnboardTotal = temp1["Onboard Total"]}
          OOT = temp1["OOT"]
          OnTimeDelivery = temp1["Yesterday Performence"]
          OverDue = temp1["Overdue"]
          StopsPerHour =temp1["Stops Per Hour"]
          HoursWorked = temp1["Hours worked"]
        }
      })
      props?.DataTwoTwo?.map((temp2) => {
        if(item["Run #"]==temp2["PickupCourierNumber"] && temp2["KPI Status"]=="Futile"){
          FutilePickup = FutilePickup + 1;
        }
        if(item["Run #"]==temp2["PickupCourierNumber"] && temp2["KPI Status"]=="Fail"){
          FailPickup = FailPickup + 1;
        }
      })
      props?.DataTwoThreeOne?.map((temp4) => {
        if(item["Run #"]==temp4["CF run converted"] && temp4["No PM Return"] == "No PM Return"){
          checkCompliance = "Fail"
        }
        if(item["Run #"]==temp4["CF run converted"]){
          PMReturn = temp4["No PM Return"]
        }
      })
      props?.DataTwoFour?.map((temp3) => {
        if(item["Run #"]==temp3["Pickup CF"]){
          sortedCageScore  = temp3["TotalSorted%"]
          SortCageScore = temp3["TotalSorted%"]
          TotalReceived = temp3["TotalReceived"]
        }
      })

      //If PickupTotal,HoursWorked or StopsPerHour is undefined or empty, we equal the value to 0
      if(PickupTotal=="" || PickupTotal==undefined){PickupTotal=0}
      if(StopsPerHour=="" || StopsPerHour==undefined){StopsPerHour=0}
      if(HoursWorked=="" || HoursWorked==undefined){HoursWorked=0}

      if((PickupTotal+parseInt(DeliveryTotal)+(OnboardTotal - DeliveryTotal))==0 && (SortCageScore==undefined || SortCageScore=="0%")){
        RunStatus="Inactive"
      }
      else{
        RunStatus="Active"
      }

      //Caculating Pickup Score
      if(RunStatus=="Inactive"){
        pickupScore = "NA"
      }
      else if(PickupTotal+FutilePickup+FailPickup==0){
        pickupScore = "100%"
      }
      else{
        if(!PickupTotal){
          PickupTotal = 0
        }
        const PickupTotalTemp = parseInt(PickupTotal)
        pickupScore = ((PickupTotalTemp+FutilePickup) / (PickupTotalTemp+FutilePickup+FailPickup)) * 100
      }

      //Calculating Delivery Score
      if(RunStatus=="Inactive"){
        deliveryScore = "NA"
      }
      else if(OverDue < 15 && (parseInt(DeliveryTotal) <= parseInt(OnboardTotal))){
        deliveryScore = "100%"
      }
      else if(OverDue < 15 || (parseInt(DeliveryTotal) <= parseInt(OnboardTotal))){
        deliveryScore = "50%"
      }
      else{
        deliveryScore = "0%"
      }

      //Calculating Compliance Score
      if (RunStatus == "Inactive") {
        complianceScore = "NA";
      }
      else{
        complianceScore = (parseInt(SortCageScore) / 100) * (100 / 3);
      if (checkCompliance === "Pass") {
        complianceScore += 100 / 3;
      }
      if (!(((OnboardTotal - DeliveryTotal) != 0) && OOT=="")) {
        complianceScore += 100 / 3;
      }
      complianceScore = complianceScore
      }

      //Calculating Productivity Score
      if (RunStatus == "Inactive") {
        productivityScore = "NA";
      }
      else{
        const xRatio =  HoursWorked / 9;
        const wRatio = StopsPerHour / 15;
        const xScore = xRatio > 1 ? 50 : xRatio * 50;
        const wScore = wRatio > 1 ? 50 : wRatio * 50;
        productivityScore = (xScore + wScore);
      }

      //Calculating Overall Score
      if(RunStatus == "Inactive"){
        overallScore = "Run not active"
      }
      else{
        overallScore = Math.round((parseFloat(pickupScore)*0.35)+(parseFloat(deliveryScore)*0.35)+(parseFloat(complianceScore)*0.25)+(parseFloat(productivityScore)*0.05)) + "%"
      }

      return {
        ...item,
        "Pickup Score": (pickupScore=="NA") ? pickupScore : Math.round(parseFloat(pickupScore)) + "%",
        "Delivery Score" : deliveryScore,
        "Compliance Score" : (complianceScore=="NA") ? complianceScore : Math.round(complianceScore) + "%",
        "Sorted to Cage Score" : (sortedCageScore) ? sortedCageScore : "No interstate pickups",
        "Productivity Score" : (productivityScore=="NA") ? productivityScore : Math.round(productivityScore) + "%",
        "Overall Score" : overallScore,
        "1.0 Pickup Total" : PickupTotal,
        "1.1 Futile Pickup" : FutilePickup,
        "1.2 Failed Pickup" : FailPickup,
        "2.0 Delivery Total" : (DeliveryTotal=="") ? 0 : DeliveryTotal,
        "2.1 Onboard Total" : (OnboardTotal=="") ? 0 : OnboardTotal,
        "2.2 Not delivered" : OnboardTotal - DeliveryTotal,
        "2.3 OOT" : (OOT=="") ? 0 : OOT,
        "2.4 On-Time Delivery(%)-Yestarday" : OnTimeDelivery,
        "2.5 Overdue freight" : (OverDue=="") ? 0 : OverDue,
        "Run Active Status" : RunStatus,
        "3.0 Check In and Out Compliance" : checkCompliance,
        "3.1 Onboard Compliance": (parseInt(DeliveryTotal) <= parseInt(OnboardTotal)) ? "Pass" : "Fail",
        "3.2 Compliance OOT" : (((OnboardTotal - DeliveryTotal) != 0) && OOT=="") ? "Fail" : "Pass",
        "4.0 Productivity Stops Per Hour" : Math.round(StopsPerHour),
        "4.1 Productivity Hours worked" : Math.round(HoursWorked),
        "4.3 Sort To Cage Score(%)" : SortCageScore,
        "4.4 Count of item sorted" : (TotalReceived==undefined) ? 0 : TotalReceived,
        "PM checkout status" : PMReturn
      };
    });

    const filteredData = newData.filter((item) => item["Overall Score"] != "Run not active")
    .sort((a, b) => {
      const overallScoreA = a["Overall Score"];
      const overallScoreB = b["Overall Score"];
    
      // Sort the data based on the "Overall Score" values
      if (overallScoreA === "Run not active") {
        return 1; // "Run not active" comes after percentage values
      } else if (overallScoreB === "Run not active") {
        return -1; // Percentage values come before "Run not active"
      } else {
        // Parse the percentage values and compare numerically
        const percentageA = parseInt(overallScoreA);
        const percentageB = parseInt(overallScoreB);
        return percentageA - percentageB; // Sort in descending order
      }
    });

    props.setDataTwoAFull(newData)
    props.setDataTwoA(filteredData)


    filteredData.map((d) => {
      rowsArray.push(Object.keys(d));
      valuesArray.push(Object.values(d));
    });

    setTableRows(rowsArray[0]);
    setTableValues(valuesArray);
    setDataFetched(true);

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
  },[]);

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

export default TableTwoA;