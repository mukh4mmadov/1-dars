import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [total, setTotal] = useState(625);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    let pageParams = Number(params.get("page")) || 1;
    let limitParams = Number(params.get("limit")) || 8;
    setPage(pageParams);
    setLimit(limitParams);
  }, [params]);

  useEffect(() => {
    fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`
    )
      .then((resp) => resp.json())
      .then((d) => {
        setData(d);
        setParams({ page: page, limit: limit });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, limit, setParams]);

  const handleChange = (newPage) => {
    setPage(newPage);
  };

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
                src={value.url}
                alt={value.title}
                className="w-full h-48 object-cover"
              />
              <h1>{value.id}</h1>
              <p>{value.title}</p>
            </div>
          ))}
      </div>
      <div className="mt-8">
        <ResponsivePagination
          current={page}
          total={total}
          onPageChange={handleChange}
          maxWidth={500}
        />
      </div>
    </div>
  );
}

export default Home;
