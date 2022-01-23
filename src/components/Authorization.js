import React, { useState } from "react";

export default function Authorization() {
  let fields = { email: "", password: "" };
  let [userData, setUserData] = useState({ ...fields });
  let [fieldTouched, setFieldTouched] = useState({ ...fields });
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

  return (
    <>
      <div className="form-wrapper">
        <div className="form-top">
          <h2 className="submain-title">Вход или регистрация</h2>
          <button className="btn-close">&#10006;</button>
        </div>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-container">
            <p className="input-label">E-mail</p>
            <input
              className={entryError.email ? "input input-error" : "input"}
              value={userData.email}
              type="text"
              placeholder="E-mail"
              name="email"
              onChange={(e) => handleInputChange(e)}
            ></input>
            <p className="error-message">Error message here</p>
          </div>
          <div className="input-container">
            <p className="input-label">Пароль</p>
            <input
              className={entryError.password ? "input input-error" : "input"}
              value={userData.password}
              type="password"
              placeholder="Пароль"
              name="password"
              onChange={(e) => handleInputChange(e)}
            ></input>
            <p className="error-message">Error message here</p>
          </div>
          <button className="btn btn-main" onClick={(e) => handleSubmit(e)}>
            <div>Войти</div>
          </button>
        </form>
        <a className="link-bold" href="#">
          Забыли пароль?
        </a>
      </div>
    </>
  );
}
