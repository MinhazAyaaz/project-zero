import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TableOne from "./TableOne";
import TableTwoA from "./TableTwoA";
import TableTwoB from "./TableTwoB";
import TableTwoOne from "./TableTwoOne";
import TableTwoTwo from "./TableTwoTwo";
import TableTwoThreeOne from "./TableTwoThreeOne";
import TableTwoThreeTwo from "./TableTwoThreeTwo";
import TableTwoFour from "./TableTwoFour";
import Logo from "../data/logo.png";

function Main() {
  const [DataTwoOne, setDataTwoOne] = useState([]);
  const [DataTwoTwo, setDataTwoTwo] = useState([]);
  const [DataTwoFour, setDataTwoFour] = useState([]);

  const [disabledTwoOne, setDisabledTwoOne] = useState(true);
  const [disabledTwoTwo, setDisabledTwoTwo] = useState(true);
  const [disabledTwoThreeOne, setDisabledTwoThreeOne] = useState(true);
  const [disabledTwoThreeTwo, setDisabledTwoThreeTwo] = useState(true);
  const [disabledTwoFour, setDisabledTwoFour] = useState(true);

  const [uploadTwoOne, setUploadTwoOne] = useState([]);
  const [uploadTwoTwo, setUploadTwoTwo] = useState([]);
  const [uploadTwoThreeOne, setUploadTwoThreeOne] = useState([]);
  const [uploadTwoThreeTwo, setUploadTwoThreeTwo] = useState([]);
  const [uploadTwoFour, setUploadTwoFour] = useState([]);

  const [One, setOne] = useState(false);
  const [TwoA, setTwoA] = useState(false);
  const [TwoB, setTwoB] = useState(false);
  const [TwoOne, setTwoOne] = useState(false);
  const [TwoTwo, setTwoTwo] = useState(false);
  const [TwoThreeOne, setTwoThreeOne] = useState(false);
  const [TwoThreeTwo, setTwoThreeTwo] = useState(false);
  const [TwoFour, setTwoFour] = useState(false);

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

      <div className="flex justify-between mt-[3%]">
        <Button
          color="error"
          disabled={setOne}
          variant={One ? "contained" : "outlined"}
          onClick={() => {
            setOne(true);
            setTwoA(false);
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
          }}
        >
          1. Executive Summary
        </Button>
        <Button
          disabled={DataTwoOne.length===0 || DataTwoTwo.length===0 || DataTwoFour.length===0}
          variant={TwoA ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(true);
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
          }}
        >
          2.A Score Table
        </Button>
        <Button
          disabled={DataTwoOne.length===0 || DataTwoTwo.length===0 || DataTwoFour.length===0}
          variant={TwoB ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoB(true);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
          }}
        >
          2.B Score Table
        </Button>
        <Button
          disabled={disabledTwoOne}
          variant={TwoOne ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoB(false);
            setTwoOne(true);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
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
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(true);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(false);
          }}
        >
          2.2 Missed Pickup Data
        </Button>
        <Button
          disabled={disabledTwoThreeOne}
          variant={TwoThreeOne ? "contained" : "outlined"}
          color="error"
          onClick={() => {
            setOne(false);
            setTwoA(false);
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(true);
            setTwoThreeTwo(false);
            setTwoFour(false);
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
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(true);
            setTwoFour(false);
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
            setTwoB(false);
            setTwoOne(false);
            setTwoTwo(false);
            setTwoThreeOne(false);
            setTwoThreeTwo(false);
            setTwoFour(true);
          }}
        >
          2.4 Cage Scan Compliance
        </Button>
      </div>

      <div className="mt-[3%] flex justify-center">
        {One && <TableOne uploadTwoOne={uploadTwoOne} />}
        {TwoA && <TableTwoA DataTwoOne={DataTwoOne} DataTwoTwo={DataTwoTwo} DataTwoFour={DataTwoFour}/>}
        {TwoB && <TableTwoB  DataTwoOne={DataTwoOne} DataTwoTwo={DataTwoTwo} DataTwoFour={DataTwoFour}/>}
        {TwoOne && <TableTwoOne uploadTwoOne={uploadTwoOne} setDataTwoOne={setDataTwoOne}/>}
        {TwoTwo && <TableTwoTwo uploadTwoTwo={uploadTwoTwo} setDataTwoTwo={setDataTwoTwo}/>}
        {TwoThreeOne && <TableTwoThreeOne uploadTwoThreeOne={uploadTwoThreeOne} />}
        {TwoThreeTwo && <TableTwoThreeTwo uploadTwoThreeTwo={uploadTwoThreeTwo} />}
        {TwoFour && <TableTwoFour uploadTwoFour={uploadTwoFour} setDataTwoFour={setDataTwoFour}/>}
      </div>
    </>
  );
}

export default React.memo(Main);
