import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateInput, submitRequest } from "../services";
import FormInput from "./FormInput";
import Form from "./Form";
import { connect } from "react-redux";

function Authorization(props) {
  const { userEmail } = props;
  let fields = { email: "", password: "" };
  let [userData, setUserData] = useState({ ...fields, email: userEmail });
  let [entryError, setEntryError] = useState({ ...fields });

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

  function handleSubmit(e) {
    e.preventDefault();
    if (!entryError.email && !entryError.password) {
      if (userData.email && userData.password) {
        submitRequest(userData, "login");
      }
    }
  }

  let formProps = {
    formTitle: "Вход",
    handleSubmit: handleSubmit,
    btnTitle: "Войти",
    disabledProp: !userData.email || !userData.password,
    formFooterContent: (
      <p>
        <a className="link-bold" href="#">
          Забыли пароль?
        </a>
      </p>
    ),
  };

  let inputProps = [
    {
      inputLabelProp: "E-mail",
      classProp: entryError.email ? "input input-error" : "input",
      valueProp: userData.email,
      typeProp: "email",
      nameProp: "email",
      placeholderProp: "E-mail",
      onChangeProp: handleInputChange,
      errorProp: entryError.email,
      errorMessage: "Неправильный формат электронной почты",
    },
    {
      inputLabelProp: "Пароль",
      classProp: entryError.password ? "input input-error" : "input",
      valueProp: userData.password,
      typeProp: "password",
      nameProp: "password",
      placeholderProp: "Пароль",
      onChangeProp: handleInputChange,
      errorProp: entryError.password,
      errorMessage:
        "Пароль должен включать прописную и заглавную буквы, цифру, спецсимвол и быть длиной мин. 6 знаков",
    },
  ];

  return (
    <>
      <Form formProps={formProps}>
        {inputProps.map((item) => {
          return (
            <FormInput key={item.inputLabelProp} inputProp={item}></FormInput>
          );
        })}
      </Form>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userEmail: state.userEmail,
  };
};

export default connect(mapStateToProps)(Authorization);
