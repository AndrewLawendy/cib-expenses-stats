import React from "react";
import { useDropzone } from "react-dropzone";

import styles from "./styles.scss";

const UploadStatement = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
    multiple: false,
    onDrop: handleFileDropped,
  });

  function handleFileDropped([statementFile]) {}

  return (
    <div {...getRootProps({ className: styles.dropZone })}>
      <input multiple={false} {...getInputProps()} />
      <p>Drag and drop statement file here, or click to select the file</p>
    </div>
  );
};

export default UploadStatement;
