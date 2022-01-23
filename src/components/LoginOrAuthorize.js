import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateInput, requestAuthorization } from "../services";

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

  return (
    <>
      <div className="form-wrapper">
        <div className="form-top">
          <h2 className="submain-title">Вход или регистрация</h2>
          <button className="btn btn-close">&#10006;</button>
        </div>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-container">
            <p className="input-label">E-mail</p>
            <input
              onFocus={() => setEntryError({ email: false })}
              className={entryError.email ? "input input-error" : "input"}
              value={userData.email}
              type="text"
              name="email"
              placeholder="E-mail"
              onChange={(e) => handleInputChange(e)}
            ></input>
            {entryError.email && (
              <p className="error-message">
                Неправильный формат электронной почты
              </p>
            )}
          </div>
          <button
            disabled={userData.email ? false : true}
            className="btn btn-main"
            onClick={(e) => handleSubmit(e)}
          >
            <div>Продолжить</div>
          </button>
        </form>
        <div className="form-footer">
          <div className="social-media-icons">
            <div className="social-media-icon"> </div>
          </div>
        </div>
      </div>
    </>
  );
}
