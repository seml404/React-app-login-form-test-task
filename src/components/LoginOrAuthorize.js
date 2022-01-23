import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateInput, requestAuthorization } from "../services";
import FormInput from "./FormInput";
import Form from "./Form";

export default function LoginOrAuthorize() {
  let fields = { email: "" };
  let [userData, setUserData] = useState({ ...fields });
  let [entryError, setEntryError] = useState({ ...fields });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!entryError.email) {
      requestAuthorization(userData.email, navigate);
    }
  }

  function handleInputChange(event) {
    setUserData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
    let inputValidation = validateInput(event.target.name, event.target.value);
    setEntryError((prev) => {
      return {
        ...prev,
        ...inputValidation,
      };
    });
  }

  let formProps = {
    formTitle: "Вход или регистрация",
    handleSubmit: handleSubmit,
    btnTitle: "Продолжить",
    formFooterContent: (
      <div className="social-media-icons">
        <div className="social-media-icon"> </div>
      </div>
    ),
  };

  let inputProps = [
    {
      inputLabelProp: "E-mail",
      classProp: entryError.email ? "input input-error" : "input",
      valueProp: userData.email,
      typeProp: "text",
      nameProp: "email",
      placeholderProp: "E-mail",
      onChangeProp: handleInputChange,
      errorProp: entryError.email,
      errorMessage: "Неправильный формат электронной почты",
    },
  ];

  return (
    <>
      <Form formProps={formProps}>
        <FormInput inputProp={inputProps[0]}></FormInput>
      </Form>
    </>
  );
}
