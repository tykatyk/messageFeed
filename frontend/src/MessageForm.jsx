import React from "react";
import ShowErrors from "./ShowErrors.jsx";
import "./messageForm.css";

export default function MessageForm(props) {
  const {
    header,
    content,
    error,
    handleSubmit,
    handleHeaderChange,
    handleContentChange,
    isSubmitting,
  } = props;

  const valueIsEmpty = (str) => {
    return str.length > 0 && str.trim().length > 0 ? false : true;
  };

  return (
    <>
      {error && <ShowErrors message={error} />}
      <form>
        <p className="formItem">
          <label htmlFor="messageHeader">Заголовок</label>
          <input
            type="text"
            name="messageHeader"
            value={header}
            onChange={(e) => handleHeaderChange(e)}
          />
        </p>
        <p className="formItem">
          <label htmlFor="messageContent">Содержание</label>
          <textarea
            name="messageContent"
            rows="5"
            value={content}
            onChange={(e) => handleContentChange(e)}
          />
        </p>
        <p className="formItem">
          <button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
            disabled={
              valueIsEmpty(header) || valueIsEmpty(content) || isSubmitting
            }
          >
            Отправить
          </button>
        </p>
      </form>
    </>
  );
}
