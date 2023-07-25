import React, { useState,useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
//import { response } from "msw";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetchShoppingList()
  },[])

  function fetchShoppingList() {
    fetch("http://localhost:4000/items")
    .then((response)=> response.json())
    .then((items)=>setItems(items))
  }
  function handleAddItem(newItem){
    setItems([...items,newItem])
  }

  function handleUpdate(updatedItem){
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItem)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay =items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

 function handleDelete(deletedItem){
  const updatedItem=items.filter((item)=>item.id !== deletedItem.id)
  setItems(updatedItem)
 }

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} 
          onUpdateItem={handleUpdate} 
          onDeleteItem={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
