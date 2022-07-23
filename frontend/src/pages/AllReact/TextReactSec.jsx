import { useState, useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";
import "./react.scss";

export default function TextReactSec() {
  const [textSec, setTextSec] = useState([]);

  const getText = async () => {
    try {
      const data = await axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }texts?categories=react&textSection=2`
        )
        .then((response) => response.data);
      setTextSec(data);
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
      {textSec.map((text) => (
        <div key={text.id}>{parse(text.body)}</div>
      ))}
    </div>
  );
}
