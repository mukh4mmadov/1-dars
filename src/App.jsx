import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pagination from "./pages/Pagination";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/pagination"
          element={
            <MainLayout>
              <Pagination />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
