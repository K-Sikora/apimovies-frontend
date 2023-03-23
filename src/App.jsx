import React from "react";
import Homepage from "./components/Homepage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import SingleItem from "./components/SingleItem";
import Categories from "./components/Categories";
import CategoriesTv from "./components/CategoriesTv";
import AdvancedSearch from "./components/AdvancedSearch";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-[Poppins] dark:bg-dark-900 bg-light duration-300  ">
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
          <Route
            path="/search"
            element={<AdvancedSearch />}
          />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
