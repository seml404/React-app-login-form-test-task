import React from "react";

export default function FormInput(props) {
  const {
    inputLabelProp,
    typeProp,
    classProp,
    valueProp,
    nameProp,
    placeholderProp,
    onChangeProp,
    errorProp,
    errorMessage,
  } = props.inputProp;

  return (
    <div className="input-container">
      <p className="input-label">{inputLabelProp}</p>
      <input
        className={classProp}
        value={valueProp}
        type={typeProp}
        placeholder={placeholderProp}
        name={nameProp}
        onChange={(e) => onChangeProp(e)}
      ></input>
      {errorProp && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
