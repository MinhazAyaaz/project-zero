import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TableOne from "./TableOne";
import TableTwoA from "./TableTwoA";
import TableTwoOne from "./TableTwoOne";
import TableTwoTwo from "./TableTwoTwo";
import TableTwoThreeOne from "./TableTwoThreeOne";
import TableTwoThreeTwo from "./TableTwoThreeTwo";
import TableTwoFour from "./TableTwoFour";
import Chullora from "./Chullora";
import Logo from "../data/logo.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Matraville from "./Matraville";
import Wetherill from "./Wetherill";
import ExcludedModal from "./ExcludedModal";

function Main() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [DataTwoA, setDataTwoA] = useState([]);
  const [DataTwoAFull, setDataTwoAFull] = useState([]);
  const [DataTwoThreeOne, setDataTwoThreeOne] = useState([]);
  const [DataTwoThreeTwo, setDataTwoThreeTwo] = useState([]);
  const [DataTwoOne, setDataTwoOne] = useState([]);
  const [DataTwoTwo, setDataTwoTwo] = useState([]);
  const [DataTwoFour, setDataTwoFour] = useState([]);
  const [DataOne, setDataOne] = useState([]);

  const [disabledTwoOne, setDisabledTwoOne] = useState(true);
  const [disabledTwoTwo, setDisabledTwoTwo] = useState(true);
  const [disabledTwoThreeTwo, setDisabledTwoThreeTwo] = useState(true);
  const [disabledTwoFour, setDisabledTwoFour] = useState(true);

  const [uploadTwoOne, setUploadTwoOne] = useState([]);
  const [uploadTwoTwo, setUploadTwoTwo] = useState([]);
  const [uploadTwoThreeTwo, setUploadTwoThreeTwo] = useState([]);
  const [uploadTwoFour, setUploadTwoFour] = useState([]);

  const [One, setOne] = useState(false);
  const [TwoA, setTwoA] = useState(false);
  const [TwoOne, setTwoOne] = useState(false);
  const [TwoTwo, setTwoTwo] = useState(false);
  const [TwoThreeOne, setTwoThreeOne] = useState(false);
  const [TwoThreeTwo, setTwoThreeTwo] = useState(false);
  const [TwoFour, setTwoFour] = useState(false);
  const [chullora, setChullora] = useState(false);
  const [matraville, setMatraville] = useState(false);
  const [wetherill, setWetherill] = useState(false);

  const [modalButton, setModalButton] = useState(false);
  const [exclude,setExclude] = useState(["237","A01","A02","A03","A04","A05","255","414","339","439","034","734","633","132","232","244","124","413"]);

  useEffect(() => {}, [selectedDate]);

  const handleDateChange = (newValue) => {
    const selectedDateAsDate = newValue.toDate(); // create a new Date object from the dayjs value
    setSelectedDate(selectedDateAsDate);
  };

  const changeHandler6 = (event) => {
    setDisabledTwoFour(false);
    setUploadTwoFour(event);
  };

  const changeHandler5 = (event) => {
    setDisabledTwoThreeTwo(false);
    setUploadTwoThreeTwo(event);
  };

  const changeHandler4 = (event) => {
    setDisabledTwoOne(false);
    setUploadTwoOne(event);
  };

  const changeHandler3 = (event) => {
    setDisabledTwoTwo(false);
    setUploadTwoTwo(event);
  };

  return (
    <>
    <ExcludedModal trigger={modalButton} setTrigger={setModalButton} setExclude={setExclude}/>
      <div className="absolute mr-[8%] mt-[3%] right-10">
        <Button variant="outlined" color="error" onClick={() => setModalButton(true)} className="w-[100%]">
          Excluded Runs for 2.3.1
        </Button>
      </div>
      <div className="absolute ml-[8%] mt-[3%]">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date Picker"
            value={dayjs(selectedDate)}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
      </div>
      <div className="flex justify-center">
        <img className="w-[12%]" src={Logo} />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col px-[3%]">
          <h1 className="text-xl text-neutral-700">Upload 2.1 Here:</h1>
          {/* File Uploader */}
          <input
            type="file"
            name="file"
            onChange={changeHandler4}
            accept=".xlsm,.csv,.xlsx"
            class="mt-[5%] relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-400 dark:focus:bg-transparent"
          />
          <label className="text-neutral-500 mt-[2%] ml-[2%]">
            Upload .csv or .xlxs files only
          </label>
        </div>
        <div className="flex flex-col px-[3%]">
          <h1 className="text-xl text-neutral-700">Upload 2.2 Here:</h1>
          {/* File Uploader */}
          <input
            type="file"
            name="file"
            onChange={changeHandler3}
            accept=".xlsm,.csv,.xlsx"
            class="mt-[5%] relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-400 dark:focus:bg-transparent"
          />
          <label className="text-neutral-500 mt-[2%] ml-[2%]">
            Upload .csv or .xlxs files only
          </label>
        </div>
        <div className="flex flex-col px-[3%]">
          <h1 className="text-xl text-neutral-700">Upload 2.3.2 Here:</h1>
          {/* File Uploader */}
          <input
            type="file"
            name="file"
            onChange={changeHandler5}
            accept=".xlsm,.csv,.xlsx"
            class="mt-[5%] relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-400 dark:focus:bg-transparent"
          />
          <label className="text-neutral-500 mt-[2%] ml-[2%]">
            Upload .csv or .xlxs files only
          </label>
        </div>
        <div className="flex flex-col px-[3%]">
          <h1 className="text-xl text-neutral-700">Upload 2.4 Here:</h1>
          {/* File Uploader */}
          <input
            type="file"
            name="file"
            onChange={changeHandler6}
            accept=".xlsm,.csv,.xlsx"
            class="mt-[5%] relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-400 dark:focus:bg-transparent"
          />
          <label className="text-neutral-500 mt-[2%] ml-[2%]">
            Upload .csv or .xlxs files only
          </label>
        </div>
      </div>
      <div className="flex mt-[2%] justify-center">
        <h2>
          Note: Click Available Tables to reveal the Unavailable Tables after
          upload
        </h2>
      </div>

      <div className="flex justify-between mt-[1%]">
        <Button
          color="error"
          disabled={
            DataTwoOne.length === 0 ||
            DataTwoFour.length === 0 ||
            DataTwoA.length === 0
          }
          variant={One ? "contained" : "outlined"}
          onClick={() => {
            setOne(true);
            setTwoA(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
            setChullora(false);
            setMatraville(false);
            setWetherill(false);
          }}
        >
          1. Executive Summary
        </Button>
        <Button
          disabled={
            DataTwoOne.length === 0 ||
            DataTwoTwo.length === 0 ||
            DataTwoFour.length === 0 ||
            DataTwoThreeOne.length === 0
          }
          variant={TwoA ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(true);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
            setChullora(false);
            setMatraville(false);
            setWetherill(false);
          }}
        >
          2.A Score Table
        </Button>
        <Button
          disabled={disabledTwoOne}
          variant={TwoOne ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoOne(true);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
            setChullora(false);
            setMatraville(false);
            setWetherill(false);
          }}
        >
          2.1 Data Control Tower
        </Button>
        <Button
          disabled={disabledTwoTwo}
          variant={TwoTwo ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoOne(false);
            setTwoTwo(true);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
            setChullora(false);
            setMatraville(false);
            setWetherill(false);
          }}
        >
          2.2 Missed Pickup Data
        </Button>
        <Button
          disabled={
            DataTwoOne.length === 0 ||
            DataTwoThreeTwo.length === 0 ||
            DataTwoFour === 0
          }
          variant={TwoThreeOne ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(true);
            setTwoThreeTwo(false);
            setTwoFour(false);
            setChullora(false);
            setMatraville(false);
            setWetherill(false);
          }}
        >
          2.3.1 Check in-check Analysis
        </Button>
        <Button
          disabled={disabledTwoThreeTwo}
          variant={TwoThreeTwo ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(true);
            setTwoFour(false);
            setChullora(false);
            setMatraville(false);
            setWetherill(false);
          }}
        >
          2.3.2 Check in-check Data
        </Button>
        <Button
          disabled={disabledTwoFour}
          variant={TwoFour ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(true);
            setChullora(false);
            setMatraville(false);
            setWetherill(false);
          }}
        >
          2.4 Cage Scan Compliance
        </Button>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-between mt-[1%] w-[500px]">
          <Button
            color="error"
            disabled={DataOne.length === 0}
            variant={chullora ? "contained" : "outlined"}
            onClick={() => {
              setOne(false);
              setTwoA(false);
              setTwoOne(false);
              setTwoTwo(false);
              setTwoThreeOne(false);
              setTwoThreeTwo(false);
              setTwoFour(false);
              setChullora(true);
              setMatraville(false);
              setWetherill(false);
            }}
          >
            Chullora
          </Button>
          <Button
            color="error"
            disabled={DataOne.length === 0}
            variant={matraville ? "contained" : "outlined"}
            onClick={() => {
              setOne(false);
              setTwoA(false);
              setTwoOne(false);
              setTwoTwo(false);
              setTwoThreeOne(false);
              setTwoThreeTwo(false);
              setTwoFour(false);
              setChullora(false);
              setMatraville(true);
              setWetherill(false);
            }}
          >
            Matraville
          </Button>
          <Button
            color="error"
            disabled={DataOne.length === 0}
            variant={wetherill ? "contained" : "outlined"}
            onClick={() => {
              setOne(false);
              setTwoA(false);
              setTwoOne(false);
              setTwoTwo(false);
              setTwoThreeOne(false);
              setTwoThreeTwo(false);
              setTwoFour(false);
              setChullora(false);
              setMatraville(false);
              setWetherill(true);
            }}
          >
            Wetherill Park
          </Button>
        </div>
      </div>
      <div className="mt-[3%] flex justify-center">
        {One && (
          <TableOne
            uploadTwoOne={uploadTwoOne}
            DataTwoA={DataTwoA}
            DataTwoOne={DataTwoOne}
            DataTwoFour={DataTwoFour}
            setDataOne={setDataOne}
          />
        )}
        {TwoA && (
          <TableTwoA
            DataTwoOne={DataTwoOne}
            DataTwoTwo={DataTwoTwo}
            DataTwoFour={DataTwoFour}
            DataTwoThreeOne={DataTwoThreeOne}
            setDataTwoA={setDataTwoA}
            setDataTwoAFull={setDataTwoAFull}
          />
        )}
        {TwoOne && (
          <TableTwoOne
            uploadTwoOne={uploadTwoOne}
            setDataTwoOne={setDataTwoOne}
          />
        )}
        {TwoTwo && (
          <TableTwoTwo
            uploadTwoTwo={uploadTwoTwo}
            setDataTwoTwo={setDataTwoTwo}
            selectedDate={selectedDate}
          />
        )}
        {TwoThreeOne && (
          <TableTwoThreeOne
            DataTwoOne={DataTwoOne}
            DataTwoThreeTwo={DataTwoThreeTwo}
            DataTwoFour={DataTwoFour}
            setDataTwoThreeOne={setDataTwoThreeOne}
            exclude={exclude}
          />
        )}
        {TwoThreeTwo && (
          <TableTwoThreeTwo
            uploadTwoThreeTwo={uploadTwoThreeTwo}
            setDataTwoThreeTwo={setDataTwoThreeTwo}
            selectedDate={selectedDate}
          />
        )}
        {TwoFour && (
          <TableTwoFour
            uploadTwoFour={uploadTwoFour}
            setDataTwoFour={setDataTwoFour}
          />
        )}
        {chullora && (
          <Chullora
            DataTwoFour={DataTwoFour}
            DataTwoA={DataTwoA}
            DataTwoAFull={DataTwoAFull}
          />
        )}
        {matraville && (
          <Matraville
            DataTwoFour={DataTwoFour}
            DataTwoA={DataTwoA}
            DataTwoAFull={DataTwoAFull}
          />
        )}
        {wetherill && (
          <Wetherill
            DataTwoFour={DataTwoFour}
            DataTwoA={DataTwoA}
            DataTwoAFull={DataTwoAFull}
          />
        )}
      </div>
    </>
  );
}

export default React.memo(Main);
