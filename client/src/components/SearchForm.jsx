import React from "react";

function SearchForm() {

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <>
      <h2>Search Form</h2>
      <form action=""
        onSubmit={handleSubmit}
      >
        <label htmlFor="">Airline </label>
        <input type="text"></input>
        <br />
        <input type="submit" />
      </form>
    </>
  );
}

export default SearchForm;
