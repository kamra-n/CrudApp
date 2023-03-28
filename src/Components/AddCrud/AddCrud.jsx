import { useState } from "react";

import { Button } from "../Button/Button";

export const AddCrud = ({ crudArray, setCrudArray }) => {
  const [item, setItem] = useState("");
  const formHandler = (e) => {
    e.preventDefault();
    if (item.length === 0 && item === "") {
      alert("Please Fill Fields Properly");
      return setItem("");
    }
    const data = {
      id: Date.now(),
      item,
      status: false,
    };

    setCrudArray([...crudArray, data]);
    alert("item Added Successfully");
    setItem("");
  };

  return (
    <form
      className="flex flex-col justify-center md:flex md:flex-row gap-5"
      onSubmit={formHandler}
    >
      <input
        type="text"
        placeholder="Enter Text"
        className="border rounded-md text-center px-14 py-2 "
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <Button className="bg-green-600 font-semibold text-white py-2 px-10 outline-none rounded-md">
        Add Item
      </Button>
    </form>
  );
};
