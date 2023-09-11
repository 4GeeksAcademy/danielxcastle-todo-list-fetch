import React, {useEffect, useState} from "react";

// include images into your bundle


// create your first component
const Home = () => {
    const [inputValue, setInputValue] = useState("")
    const [todos, setTodos] = useState([])

    useEffect(async () => {
        const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/danielxcastle", {
            method: "get",
            headers: {
                "Content-Type": "applcation/json"
            }
        });

        const body = await response.json();
        setTodos(body);
    }, []);

    const clearAllTodos = async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/apis/fake/todos/user/danielxcastle",
            {
              method: "delete",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
      
          if (response.ok) {
            setTodos([]);
          } else {
            console.error("Failed to clear todos");
          }
        } catch (error) {
          console.error("Error clearing todos:", error);
        }
      };


    return (
        <div className="container">
            <h1>My To Do List:</h1>
            <ul>
                <li className="input-todo">
                    <button className="btn btn-primary" type="button" id="button-addon1"
                        onClick={
                            (e) => {
                                setTodos(todos.concat(inputValue));
                                setInputValue("");
                            }
                    }>Add</button>
                    <input type="text"
                        value={inputValue}
                        onChange={
                            (e) => setInputValue(e.target.value)
                        }
                        onKeyDown={
                            async (e) => {
                                if (e.key === "Enter") {
                                    const newTodos = todos.concat({
                                        id: Math.floor(Math.random() * 99999),
                                        done: false,
                                        label: inputValue
                                    });
                                    let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/danielxcastle", {
                                        method: "put",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(newTodos)

                                    });
                                    if (response.ok == true) {
                                        response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/danielxcastle", {
                                            method: "get",
                                            headers: {
                                                "Content-Type": "application/json"
                                            }
                                        });

                                        const body = await response.json();
                                        setTodos(body);
                                    }
                                    setInputValue("");
                                }
                            }
                        }
                        placeholder="What do you need to do"></input>
            </li>
            {
            todos.map((item, index) => (
                <li key={index}
                    className="todo-item">
                    <strong>
                        <u>{
                            index + 1
                        })</u>
                    </strong>
                    &nbsp;&nbsp; 
                    {item.label}
                    <i className="fa-solid fa-trash"
                        onClick={
                            async (e) => {
                                // if(todos.length<1) {
                                // await fetch()
                                // /////////////////////////////////////////////////////////////
                                // }
                                const newTodos = todos.filter((_item, _index) => {
                                    if (item.id === _item.id) {
                                        return false
                                    }
                                    return true
                                })

                                let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/danielxcastle", {
                                    method: "put",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(newTodos)

                                });
                                if (response.ok == true) {
                                    response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/danielxcastle", {
                                        method: "get",
                                        headers: {
                                            "Content-Type": "application/json"
                                        }
                                    });

                                    const body = await response.json();
                                    setTodos(body);
                                }
                            }
                    }></i>
            </li>
            ))
        } </ul>
        <div className="todo-tasks">
            {
            todos.length
        }
            tasks left
            <button
            className="btn btn-danger buttonReset"
            type="button"
            onClick={clearAllTodos}
            >
            Clear All
            </button>
        </div>
    </div>
    );
};


export default Home;
