import React, { useEffect, useState } from "react";

function Pagination() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(`Fetching data for page: ${offset}`);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/photos?_page=${offset}&_limit=5`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched Data:", data);
        setData((prev) => [...prev, ...data]);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [offset]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight >= scrollHeight) {
        setOffset((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center h-48">
              <h1 className="text-xl font-bold text-gray-600">Loading...</h1>
            </div>
          ) : data.length > 0 ? (
            data.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
              >
                <img
                  src={product.thumbnailUrl}
                  alt=""
                  className="w-full h-48 object-cover rounded"
                />
                <h1 className="mt-2 text-lg font-semibold">
                  <strong>ID: {product.id}</strong>
                </h1>
                <h1 className="text-sm text-gray-500">
                  <strong>Title: {product.title}</strong>
                </h1>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-48">
              <h1 className="text-xl font-bold text-gray-600">No Data Available</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pagination;
