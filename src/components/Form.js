import React from "react";

export default function Form(props) {
  const { formTitle, handleSubmit, btnTitle, formFooterContent, disabledProp } =
    props.formProps;

  console.log(formFooterContent);

  return (
    <div className="form-wrapper">
      <div className="form-top">
        <h2 className="submain-title">{formTitle}</h2>
        <button className="btn-close">&#10006;</button>
      </div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        {props.children}
        <div className="btn-main-container">
          <button
            className="btn btn-main"
            type="submit"
            disabled={disabledProp}
          >
            <p>{btnTitle}</p>
          </button>
        </div>
      </form>
      <div className="form-footer">{formFooterContent}</div>
    </div>
  );
}
