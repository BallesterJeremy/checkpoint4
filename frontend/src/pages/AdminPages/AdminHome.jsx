import Navbar from "@components/Navbar";
import TextEditor from "./TextEditor";

export default function AdminHome() {
  return (
    <>
      <Navbar />
      <section className="background-home">
        <div className="position-admin--editor">
          <div className="background-texteditor">
            <TextEditor />
          </div>
        </div>
      </section>
    </>
  );
}
