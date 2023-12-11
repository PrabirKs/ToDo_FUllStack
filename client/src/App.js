import React from "react";
import { useState,useEffect } from "react";

const API_BASE = "http://localhost:3001" ;

function App() {
  const [todos,setTodos] = useState([]) ;
  const [popupActive, setPopupActive] = useState(false) ;
  const [newTodo,setNewTodo] = useState("");

  useEffect(()=>{
    GetTodos() ;
  },[])

  const GetTodos = () =>{
    fetch("http://localhost:3001/todos")
         .then(res => res.json())
         .then(data => setTodos(data))
         .catch(err => console.err("Error: " , err))
  }
  return (
    <div className="App">
       <h1> WElcome, Prabir</h1>
       <h4>Your Task</h4>

       <div className="todos">
          <div className="todo">
              <div className="checkbox"></div>

              <div className="text">Clean Your bed</div>

              <div className="delete-todo"></div>
          </div>
          <div className="todo">
              <div className="checkbox"></div>

              <div className="text">finish toilet and bath</div>

              <div className="delete-todo"></div>
          </div>
          <div className="todo is-complete">
              <div className="checkbox"></div>

              <div className="text">take your breakfast</div>

              <div className="delete-todo"></div>
          </div>
       </div>
    </div>
  );
}

export default App;
