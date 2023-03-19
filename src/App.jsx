import React from "react";
import Homepage from "./components/Homepage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import SingleItem from "./components/SingleItem";
import Categories from "./components/Categories";
import CategoriesTv from "./components/CategoriesTv";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-[Poppins] dark:bg-neutral-900 bg-stone-100 duration-300  ">
        <Routes>
          <Route
            path="/"
            element={<Homepage />}
          />
          <Route
            path="/:itemType/:id"
            element={<SingleItem />}
          />
          <Route
            path="/movie/category/:category/:page"
            element={<Categories />}
          />
          <Route
            path="/tv/category/:category/:page"
            element={<CategoriesTv />}
          />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
