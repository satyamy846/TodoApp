import React, { useState,useEffect } from 'react';
import './todo.css';

//storing data in localstorage
const getLocalData = ()=>{
  const lists = localStorage.getItem("todolist");
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
  }
}

const Todo = () => {
  //state hooks to for input the data
  const [inputData, setInputData] = useState("");
  // state hooks to store data in an array
  const [items, setItems] = useState(getLocalData());
  const [updateItem,setUpdateItem] = useState("");
  //creating toggle hook for toggling the button
  const [toggle, setToggle] = useState(false);
  // console.log("toggle = ",toggle);

  //add items in the array
  const addItem = () => {
    if (!inputData) {
      alert("Please Enter some data");
    }
    //new field bnake update ni kre usi item ko update kre isliye ye check krrhe
    else if (inputData && toggle) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === updateItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );

      setInputData("");
      setUpdateItem(null);
      setToggle(false);
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name:inputData
      };

      //spread operator is used to combine the result pehle se jo data h or baad vala jo add krna h
      setItems([...items, myNewInputData]);
      setInputData(""); //jo bhi data change hoga vo reflect ho jayega it's a property of hooks
    }
  }
  const editItem = (index)=>{
    const updatedItem = items.find((curElem)=>{
      return curElem.id === index;
    });
    setInputData(updatedItem.name); //jo bhi data edit krna h vo uss data ko dikhayega input filed mae
    setUpdateItem(index); //changing the state of while editing any item (jab update pe click krenge toh uski Id aa jayegi jisko update krrhe)
    setToggle(true);
    console.log(toggle);
    
  }

  const deleteItem = (index)=>{
    const deletedItem = items.filter((currEle)=>{
      //hum vo item return krenge jiski Id match ni hoti h mtlb jo delete ni hue h
      return currEle.id !== index;
    });
    setItems(deletedItem);
  }

  const removeAll = (()=>{
    //setting items array value null will delete all the items present in an array
    setItems([]);
  });

  

  //adding data in localstorage (useEffect hooks helps us to automatically update the states)
  useEffect(()=>{
      localStorage.setItem("todolist",JSON.stringify(items));
  },[items])
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src='./images/todo.svg' alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}

            />

            {/* <i className="far fa-edit add-btn" ></i> */}
            {toggle ? (<i className="fa fa-plus edit-btn" onClick={addItem}></i>) 
            :(<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
            

          </div>
          {/* show our items  */}
          <div className="showItems">

            {
              items.map((currEle) => {
                return (
                  <div className="eachItem" key={currEle.id}>
                    {/* <h3>{curElem.name}</h3> */}
                    <h3>{currEle.name}</h3>
                    <div className="todo-btn">
                      <i
                        className="far fa-edit add-btn"
                       onClick={()=> editItem(currEle.id)}></i>
                      <i
                        className="far fa-trash-alt add-btn"
                       onClick={()=> deleteItem(currEle.id)}></i>
                    </div>
                  </div>
                )
              })
            }


          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo;