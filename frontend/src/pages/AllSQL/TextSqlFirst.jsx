import { useState, useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";
import "./sql.scss";

export default function TextSqlFirst() {
  const [textSql, setTextSql] = useState([]);

  const getText = async () => {
    try {
      const data = await axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }texts?categories=mysql&textSection=1`
        )
        .then((response) => response.data);
      setTextSql(data);
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
      {textSql.map((text) => (
        <div key={text.id}>{parse(text.body)}</div>
      ))}
    </div>
  );
}
