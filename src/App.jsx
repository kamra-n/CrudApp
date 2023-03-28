import { useState } from "react";

import { AddCrud } from "./Components/AddCrud/AddCrud";
import CrudList from "./Components/CrudList/CrudList";

function App() {
  const [crudArray, setCrudArray] = useState([]);

  const deleteItem = (id) => {
    const filteredArray = crudArray.filter((item) => item.id !== id);
    setCrudArray(filteredArray);
    alert("Item Deleted Successfully");
  };

  const editItem = (id, updatedValue) => {
    console.log(id, updatedValue);
    const newState = crudArray.map((obj) =>
      obj.id === id ? { ...obj, item: updatedValue } : obj
    );
    setCrudArray(newState);

    alert("value updated Successfully");
  };
  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center pt-7">
        <AddCrud setCrudArray={setCrudArray} crudArray={crudArray} />
        <CrudList
          crudArray={crudArray}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      </div>
    </>
  );
}

export default App;
