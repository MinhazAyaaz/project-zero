import React, { useState, useEffect } from "react";
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

function ExcludedModal(props) {
  const [textField, setTextField] = useState("");
  const [elements, setElements] = useState([...props.exclude]);

  useEffect(() => {
    console.log(elements); // Logs the updated collection of elements
  }, [elements]);

  function handleInputChange(e) {
    setTextField(e.target.value);
  }

  function handleAddElement() {
    if (textField.trim() !== "") {
      setElements((prevElements) => [...prevElements, textField]);
      setTextField("");
    }
  }

  function handleDeleteElement(index) {
    setElements((prevElements) => prevElements.filter((_, i) => i !== index));
  }

  function closeModal(){
    props.setTrigger(false)
    props.setExclude(elements)
  }

  return props.trigger ? (
    <div className="fixed top-0 left-0 w-[100%] h-[100vh] bg-gray-700 bg-opacity-80 flex justify-center items-center z-10">
      <div className="relative p-10 w-[80%] h-[60%] bg-white">
        <Button
          variant="outlined"
          color="error"
          className="absolute -top-5 float-right -right-5"
          onClick={closeModal}
        >
          Close
        </Button>
        <div>
          <TextField
            className="h-10"
            id="outlined-basic"
            label="Enter Run Number"
            variant="outlined"
            color="error"
            size="small"
            value={textField}
            onChange={(e) => handleInputChange(e)}
          />
          <Button
            variant="contained"
            color="error"
            className="h-10 w-24"
            onClick={handleAddElement}
          >
            Add
          </Button>
        </div>
        <div style={{ height: "calc(100% - 60px)", overflow: "auto" }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "red", backgroundColor: "white" }}>Run Number</TableCell>
                  <TableCell style={{ color: "red", backgroundColor: "white" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {elements.map((element, index) => (
                  <TableRow key={index}>
                    <TableCell>{element}</TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDeleteElement(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ExcludedModal;
