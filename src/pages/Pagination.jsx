import React, { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`
    )
      .then((resp) => resp.json())
      .then((d) => {
        setData((prevData) => [...prevData, ...d]); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  function handleScroll(event) {
    const scrollHeight = event.target.documentElement.scrollHeight;
    const currentHeight =
      event.target.documentElement.scrollTop + window.innerHeight;

    if (currentHeight + 1 >= scrollHeight) {
      setPage((prevPage) => prevPage + 1); h
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6">
      {data.length > 0 &&
        data.map((value) => (
          <div
            key={value.id}
            className="rounded overflow-hidden shadow-lg transform transition-transform duration-300"
          >
            <img
              src={value.url}
              alt={value.title}
              className="w-full h-48 object-cover"
            />
            <h1>{value.id}</h1>
            <p>{value.title}</p>
          </div>
        ))}
    </div>
  );
}

export default Home;
