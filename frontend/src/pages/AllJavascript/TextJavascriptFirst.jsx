import { useState, useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";
import "./javascript.scss";

export default function TextJavascriptFirst() {
  const [textHome, setTextHome] = useState([]);

  const getText = async () => {
    try {
      const data = await axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }texts?categories=javascript&textSection=1`
        )
        .then((response) => response.data);
      setTextHome(data);
    } catch (err) {
      if (err.response.status === 401) {
        // eslint-disable-next-line
        alert("text doesn't exists");
      }
    }
  };
  useEffect(() => {
    getText();
  }, []);
  return (
    <div className="body1">
      {textHome.map((text) => (
        <div key={text.id}>{parse(text.body)}</div>
      ))}
    </div>
  );
}
