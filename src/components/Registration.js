import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateInput, handleInputChange, registerNewUser } from "../services";

export default function Registration() {
  let fields = { email: "", password: "", name: "", phone: "" };
  let [userData, setUserData] = useState({ ...fields });
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
        console.log(userData);
        registerNewUser(userData);
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

  return (
    <>
      <div className="form-wrapper">
        <div className="form-top">
          <h2 className="submain-title">Регистрация</h2>
          <button className="btn-close">&#10006;</button>
        </div>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-container">
            <p className="input-label">E-mail</p>
            <input
              // onFocus={() => setEntryError({ email: false })}
              className={entryError.email ? "input input-error" : "input"}
              value={userData.email}
              type="text"
              name="email"
              placeholder="E-mail"
              onChange={(e) => handleInputChange(e)}
            ></input>
            {entryError.email && (
              <p className="error-message">Error message here</p>
            )}
          </div>
          <div className="input-container">
            <p className="input-label">Пароль</p>
            <input
              className={entryError.password ? "input input-error" : "input"}
              value={userData.password}
              type="password"
              name="password"
              placeholder="Пароль"
              onChange={(e) => handleInputChange(e)}
            ></input>
            {entryError.password && (
              <p className="error-message">Error message here</p>
            )}
          </div>
          <div className="input-container">
            <p className="input-label">Имя Фамилия</p>
            <input
              className={entryError.name ? "input input-error" : "input"}
              value={userData.name}
              type="text"
              name="name"
              placeholder="Имя Фамилия"
              onChange={(e) => handleInputChange(e)}
            ></input>
            {entryError.name && (
              <p className="error-message">Error message here</p>
            )}
          </div>
          <div className="input-container">
            <p className="input-label">Телефон</p>
            <input
              className={entryError.phone ? "input input-error" : "input"}
              value={userData.phone}
              type="number"
              name="phone"
              placeholder="Телефон"
              onChange={(e) => handleInputChange(e)}
            ></input>
            {entryError.phone && (
              <p className="error-message">Error message here</p>
            )}
          </div>
          <button
            disabled={
              !userData.email ||
              !userData.password ||
              !userData.name ||
              !userData.phone
            }
            className="btn btn-main"
            onClick={(e) => handleSubmit(e)}
          >
            <div>Создать аккаунт</div>
          </button>
          <div className="form-footer">
            <p>
              Нажимая на "Создать аккаунт", вы соглашаетесь с
              <a> Политикой обработки данных</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
