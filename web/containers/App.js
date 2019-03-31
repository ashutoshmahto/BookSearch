import React from "react";
import Search from "./Search/Search";
import BookDetails from "./BookDetails/BookDetails";

const App = () => {
  return (
    <div className="container">
      <Search />
      <BookDetails />
    </div>
  );
};

export default App;
