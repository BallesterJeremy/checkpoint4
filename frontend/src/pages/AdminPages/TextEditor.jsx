/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import Upload from "@pages/Upload";
import "./editor.scss";

const TextEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  let updatedContent = "";
  const [getText, setGetText] = useState([]);
  const [currentId, setCurrentId] = useState();
  const [categories, setCategories] = useState("");

  const config = {
    readonly: false,
    height: 400,
    allowResizeX: false,
    allowResizeY: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "brush",
      "|",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "|",
      "symbol",
      "print",
    ],
    buttonsXS: [
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "brush",
      "|",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "|",
      "symbol",
      "print",
    ],
    controls: {
      font: {
        list: {
          "Montserrat,sans-serif": "Montserrat",
          "Poppins, sans-serif": "Poppins",
        },
      },
    },
  };
  // const handleUpdate = (e) => {
  //   const editorContent = e.target.value;
  //   updatedContent = editorContent;
  // };
  const fetchAllText = async () => {
    try {
      const data = await axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/texts?categories=${categories}`
        )
        .then((response) => response.data);
      setGetText(data);
    } catch (err) {
      if (err.sendStatus === 401) {
        // eslint-disable-next-line
        alert("can't fetch anything");
      }
    }
  };
  useEffect(() => {
    fetchAllText();
  }, [categories]);

  const fetchTextById = (id) => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/texts/${id}`)
      .then((result) => {
        setCurrentId(result.data.id);
        updatedContent = result.data.body;
        return setContent(result.data.body);
      });
  };

  const insertTextById = (id) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}texts/${id}`, {
        body: updatedContent,
      })
      .then((response) => {
        setContent(response.data);
      });
  };

  return (
    <section className="main-section">
      <label className="label-language" htmlFor="textes-languages">
        Select a language :
        <select
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        >
          <option value="select">Select</option>
          <option value="react">React</option>
          <option value="python">Python</option>
          <option value="typescript">Typescript</option>
          <option value="javascript">Javascript</option>
          <option value="elixir">Elixir</option>
          <option value="mysql">SQL</option>
        </select>
      </label>
      <div className="button-style">
        {getText.map((allTexts) => (
          <button
            type="button"
            onClick={() => fetchTextById(allTexts.id)}
            className="button-texts"
            key={allTexts.id}
          >
            {allTexts.title}
          </button>
        ))}
      </div>
      <div className="text-editor">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          // onBlur={handleUpdate}
          onChange={(newContent) => {
            updatedContent = newContent;
          }}
        />
        <div className="insert-button">
          <button
            type="button"
            onClick={() => insertTextById(currentId)}
            className="editor-btn"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="button-container--adminhome">
        <Upload />
      </div>
    </section>
  );
};
export default TextEditor;
