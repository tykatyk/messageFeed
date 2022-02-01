import React from "react";
import ShowErrors from "./ShowErrors.jsx";
import "./messageFeed.css";

export default function MessageFeed({ messages, loading, error }) {
  if (loading) {
    return (
      <div className="messageFeed">
        <span className="loading">Загрузка...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="messageFeed">
        <ShowErrors message={error} />
      </div>
    );
  }

  if (messages) {
    return (
      <div className="messageFeed">
        <ul>
          {messages &&
            messages.map((message, index) => {
              return (
                <li className="message" key={index}>
                  <div className="messageHeader">{message.header}</div>
                  <div className="messageContent">{message.content}</div>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  return (
    <div className="messageFeed">
      <span className="noMessages"> Нет сообщений</span>
    </div>
  );
}
