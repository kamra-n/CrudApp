import { useState } from "react";

import { Button } from "../Button/Button";

export default function CrudList({ crudArray, deleteItem, editItem }) {
  console.log(crudArray);
  const [updatedValue, setUpdatedValue] = useState("");
  const [checkIsOpen, setCheckIsOpen] = useState("");

  const updateFunc = (id) => {
    editItem(id, updatedValue);
    setCheckIsOpen("");
    setUpdatedValue("");
  };
  return (
    <div className="h-fit max-h-[500px] overflow-y-scroll bg-red w-[98%] lg:w-[500px] mt-10">
      {crudArray && crudArray.length === 0 ? (
        <h1 className="text-center">List is Empty</h1>
      ) : (
        <ul className="flex justify-center flex-col gap-4">
          {crudArray.map((item, index) => {
            return (
              <li
                key={index}
                className="flex justify-center items-center gap-4"
              >
                {checkIsOpen === item.id ? (
                  <>
                    <input
                      className="lg:flex-1"
                      placeholder="enter Updated Value"
                      value={updatedValue}
                      onChange={(e) => setUpdatedValue(e.target.value)}
                    />
                    <Button
                      className="bg-green-600 font-semibold text-white py-2 px-5 outline-none rounded-md lg:flex-1"
                      onClick={() => {
                        updateFunc(item.id);
                      }}
                    >
                      Update Item
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="lg:flex-1">{item.item}</span>
                    <Button
                      className="bg-red-600 font-semibold text-white py-2 px-5 outline-none rounded-md lg:flex-1"
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                    >
                      Delete Item
                    </Button>
                    <Button
                      className="bg-blue-600 font-semibold text-white py-2 px-5 outline-none rounded-md lg:flex-1"
                      onClick={() => {
                        // editItem(item.id);
                        setCheckIsOpen(item.id);
                      }}
                    >
                      Edit Item
                    </Button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
