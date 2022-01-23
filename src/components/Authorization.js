import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateInput } from "../services";
import FormInput from "./FormInput";
import Form from "./Form";

export default function Authorization() {
  let fields = { email: "", password: "" };
  let [userData, setUserData] = useState({ ...fields });
  let [entryError, setEntryError] = useState({ ...fields });

  function handleInputChange(event) {
    console.log(event);
    setUserData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userData);
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
