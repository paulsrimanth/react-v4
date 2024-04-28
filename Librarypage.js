import { useNavigate } from "react-router-dom";
import "./librarypage.css";
import BooksDisplaypage from "./BooksDisplaypage";
import { useRef } from "react";
import { useEffect, useState } from "react";
function Librarypage() {
  const navigate = useNavigate();
  const [bookdata, Setbookdata] = useState();
  const [bookid, Setbookid] = useState("");
  useEffect(() => {
    let ignore = false;

    if (!ignore) getBooks();
    return () => {
      ignore = true;
    };
    // getBooks();
  }, []);

  function getbookid(id) {
    localStorage.setItem("bookid", id);
    console.log("library page starts");
    console.log(id);
    Setbookid(id);
    // console.log(bookdata[0]);
    // console.log(typeof id + "id");
    // console.log(Number(id) + "id");
    console.log(localStorage.getItem("bookid"));
    console.log("library page ends");
    navigate("/assignbook");
  }
  async function getBooks() {
    const gotadmins = await fetch("http://localhost:8080/book/fetchbooks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "POST",
      },
    });

    const adminres = await gotadmins.json();
    console.log(adminres);
    if (adminres) {
      Setbookdata(adminres);
    }
  }

  return (
    <div className="body">
      <div className="navigation-bar">Welcome To Library 📖</div>
      <div className="side-bar">
        <div className="buttons">
          <button className="button-side" onClick={() => navigate("/addusers")}>
            ADD ADMIN
          </button>

          <button className="button-side" onClick={() => navigate("/adduser")}>
            ADD USERS
          </button>

          <button className="button-side">ADD BOOKS</button>
          <button
            className="button-side"
            onClick={() => navigate("/showadmins")}
          >
            SHOW ADMINS
          </button>
          <button
            className="button-side"
            onClick={() => navigate("/uploadbook")}
          >
            AddBook
          </button>
          <button
            className="button-side"
            onClick={() => navigate("/getmybook")}
          >
            Get My Books📘
          </button>
        </div>
      </div>
      <div className="outer-div">
        {bookdata?.map((book) => (
          <div key={book.bookid} className="books-display">
            {/* <div className="book-card"> */}
            {/* <header>Book name</header> */}
            {/* console.log(e.currentTarget.id + "") */}
            <div
              className="cards"
              onClick={(e) => getbookid(e.currentTarget.id)}
              id={book.bookid}
            >
              <img
                className="book-image"
                src={`data:image/jpeg;base64,${book.imageofbook}`}
                alt="Hot air balloons"
              />
              {/* </div> */}
              {/* <div> */}
              <p className="content">
                <i>{book.name}</i>
                by
                <b> {book.author}</b>
              </p>
            </div>
          </div>
          // </div>
        ))}
      </div>
    </div>
  );
}

export default Librarypage;
