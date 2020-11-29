import React from "react";
import { useDropzone } from "react-dropzone";
import excelToJson from "convert-excel-to-json";
import { encode } from "base64-arraybuffer";

import styles from "./styles.scss";

const UploadStatement = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".xls",
    multiple: false,
    onDrop: handleFileDropped,
  });

  function handleFileDropped([statementFile]) {
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      const { Sheet1 } = excelToJson({
        source: encode(result),
      });
      console.log(Sheet1);
    };
    reader.readAsArrayBuffer(statementFile);
  }

  return (
    <div {...getRootProps({ className: styles.dropZone })}>
      <input multiple={false} {...getInputProps()} />
      <p>Drag and drop statement file here, or click to select the file</p>
    </div>
  );
};

export default UploadStatement;
