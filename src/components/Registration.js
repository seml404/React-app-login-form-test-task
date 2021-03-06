import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateInput, submitRequest } from "../services";
import FormInput from "./FormInput";
import Form from "./Form";
import { connect } from "react-redux";

function Registration(props) {
  const { userEmail } = props;
  let fields = { email: "", password: "", name: "", phone: "" };
  let [userData, setUserData] = useState({ ...fields, email: userEmail });
  let [entryError, setEntryError] = useState({ ...fields });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !entryError.email &&
      !entryError.password &&
      !entryError.name &&
      !entryError.phone
    ) {
      if (
        userData.email &&
        userData.password &&
        userData.name &&
        userData.phone
      ) {
        submitRequest(userData, "register");
      }
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
    formTitle: "Регистрация",
    handleSubmit: handleSubmit,
    btnTitle: "Создать аккаунт",
    disabledProp:
      !userData.email ||
      !userData.password ||
      !userData.name ||
      !userData.phone,
    formFooterContent: (
      <p className="form-footer-text">
        Нажимая на "Создать аккаунт", вы соглашаетесь с
        <a className="link"> Политикой обработки данных</a>
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
        "Пароль должен включать прописную и заглавную буквы, цифру, спецсимвол и быть длиной мин. 8 знаков",
    },
    {
      inputLabelProp: "Имя Фамилия",
      classProp: entryError.name ? "input input-error" : "input",
      valueProp: userData.name,
      typeProp: "text",
      nameProp: "name",
      placeholderProp: "Имя Фамилия",
      onChangeProp: handleInputChange,
      errorProp: entryError.name,
      errorMessage: "Неправильный формат имени (треубется и имя, и фамилия)",
    },
    {
      inputLabelProp: "Телефон",
      classProp: entryError.email ? "input input-error" : "input",
      valueProp: userData.phone,
      typeProp: "number",
      nameProp: "phone",
      placeholderProp: "Телефон",
      onChangeProp: handleInputChange,
      errorProp: entryError.phone,
      errorMessage: "Неправильный формат номера телефона",
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

export default connect(mapStateToProps)(Registration);
