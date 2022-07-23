import { useState, useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";
import "./python.scss";

export default function TextPythonFirst() {
  const [textPyt, setTextPyt] = useState([]);

  const getText = async () => {
    try {
      const data = await axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }texts?categories=python&textSection=1`
        )
        .then((response) => response.data);
      setTextPyt(data);
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
      {textPyt.map((text) => (
        <div key={text.id}>{parse(text.body)}</div>
      ))}
    </div>
  );
}
