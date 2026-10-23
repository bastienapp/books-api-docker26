import { useEffect, useState } from "react";
import "./App.css";

interface Book {
  id: number;
  title: string;
  author: string;
}

function App() {
  const [bookList, setBookList] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api/books")
      .then((response) => response.json())
      .then((data: Book[]) => setBookList(data));
  }, []);

  return (
    <>
      <div>
        <ul>
          {bookList.map((eachBook) => (
            <li key={eachBook.id}>{eachBook.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
