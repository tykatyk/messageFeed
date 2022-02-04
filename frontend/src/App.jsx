import React from "react";
import MessageFeed from "./MessageFeed.jsx";
import MessageForm from "./MessageForm.jsx";
import ViewSwitcher from "./ViewSwitcher.jsx";
import "./app.css";

export default function App() {
  const [header, setHeader] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [messages, setMessages] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [getMessageError, setGetMessageError] = React.useState(null);
  const [addMessageError, setAddMessageError] = React.useState(null);
  const [viewMode, setViewMode] = React.useState({
    sort: "asc",
    filter: "all",
  });
  const [selectedRadio, setSelectedRadio] = React.useState("allDesc");

  const handleHeaderChange = (e) => {
    setHeader(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitting(true);

    fetch("http://localhost:8080/messages", {
      method: "POST",
      body: JSON.stringify({ header, content }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.status === "success") {
          setHeader("");
          setContent("");
          updateMessages(viewMode);
          if (addMessageError) setAddMessageError(null);
        } else {
          setAddMessageError("Не удалось сохранить сообщение");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleViewChange = (e) => {
    const mode = e.target.value;

    setSelectedRadio(mode);

    if (mode === "allRandom") {
      setViewMode({
        sort: "random",
        filter: "all",
      });
      return;
    }

    if (mode === "allDesc") {
      setViewMode({
        sort: "desc",
        filter: "all",
      });
      return;
    }

    if (mode === "lastMinute") {
      setViewMode({
        sort: "asc",
        filter: "lastMinute",
      });
    }
    return;
  };

  const updateMessages = (viewMode) => {
    setLoading(true);
    setMessages(null);
    fetch(
      `http://localhost:8080/messages?sorting=${viewMode.sort}&filter=${viewMode.filter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.status === "success") {
          if (result.data && result.data.length > 0) setMessages(result.data);
          if (getMessageError) setGetMessageError(null);
        } else {
          setGetMessageError("Не удалось получить сообщения с сервера");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    updateMessages(viewMode);
  }, [viewMode]);

  return (
    <div className="container">
      <MessageForm
        header={header}
        content={content}
        handleHeaderChange={handleHeaderChange}
        handleContentChange={handleContentChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={addMessageError}
      />
      <ViewSwitcher
        handleViewChange={handleViewChange}
        selectedRadio={selectedRadio}
      />
      <MessageFeed
        messages={messages}
        loading={loading}
        error={getMessageError}
      />
    </div>
  );
}
