import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateInput, submitRequest } from "../services";
import { setUserEmail } from "../store/actions";
import FormInput from "./FormInput";
import Form from "./Form";
import { connect } from "react-redux";

function LoginOrAuthorize(props) {
  let fields = { email: "" };
  const { setUserEmail } = props;
  let [userData, setUserData] = useState({ ...fields });
  let [entryError, setEntryError] = useState({ ...fields });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!entryError.email) {
      submitRequest({ email: userData.email }, "check-email", navigate);
      setUserEmail(userData.email);
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
    disabledProp: userData.email ? false : true,
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

const mapDispatchToProps = {
  setUserEmail,
};

export default connect(null, mapDispatchToProps)(LoginOrAuthorize);
