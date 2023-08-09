import React from 'react'
import {useState,useEffect} from 'react'
import * as XLSX from "xlsx";
import Papa from 'papaparse';

export default function TableTwoThreeTwo(props) {

  const [tableRows,setTableRows] = useState([])
  const [tableValues,setTableValues] = useState([])

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


      props.setDataTwoThreeTwo(json)
      
      json.map((d) => {
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
    }, [props.uploadTwoThreeTwo,props.selectedDate]);



return(
    <table class="table-auto border-x border-b w-full text-left text-gray-800">
          <thead className="">
            <tr>
              {tableRows.map((rows, index) => {
                return (
                  <th
                    className="font-bold p-2 border-b border-l border-[#dc291e] text-left bg-[#dc291e] text-white"
                    key={index}
                  >
                    {rows}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableValues.map((value, index) => {
              return (
                <tr className="odd:bg-gray-100 hover:!bg-red-200" key={index}>
                  {value.map((val, i) => {
                    return (
                      <td
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
)

}
