import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(625);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(8);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch(
      ` https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  function handleChangePagination(e) {
    setCurrentPage(e);
    setSearchParams(`page=${e}&limit=${limit}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Food Blog</h1>
        <p className="text-gray-500 mt-2">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.length > 0 &&
          data.map((value) => (
            <div
              key={value.id}
              className="rounded overflow-hidden shadow-lg transform transition-transform duration-300 "
            >
              <img
                src={value.thumbnailUrl}
                alt={value.title}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
      </div>
      <div className="mt-8">
        <ResponsivePagination
          current={currentPage}
          total={total}
          onPageChange={handleChangePagination}
          maxWidth={500}
        />
      </div>
    </div>
  );
}

export default Home;
