import React, {useEffect, useState} from 'react';
import TaskList from "./shoppingList/soppingItem";
import {Button, Form} from "react-bootstrap";
import axios from "axios";

const adress = "http://arektest.atthost24.pl";
const test =[
    {
        id: 1,
        product: "cos",
        done : true
    },
    {
        id: 1,
        product: "cos",
        done : true
    },
    {
        id: 1,
        product: "cos",
        done : true
    },
    {
        id: 1,
        product: "cos",
        done : true
    },
    {
        id: 1,
        product: "cos",
        done : true
    },
    {
        id: 1,
        product: "cos",
        done : true
    },
    {
        id: 1,
        product: "cos",
        done : true
    },
    {
        id: 1,
        product: "cos",
        done : true
    },
    {
        id: 1,
        product: "cos",
        done : true
    },
    {
        id: 1,
        product: "cos",
        done : true
    },
]
export default function TaskApp() {
    const [todos, setTodos] = useState(test);
    const[actualText, setActualText] = useState("")

    const fetchUserData = () => {
        axios.get(adress + "/api/")
            .then(response => {
                setTodos(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log("Error>>>>" + error));
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    function handleAddTodo(title) {
        const data =
            {
            product: actualText,
            done: true
            }
        axios.post(adress + "/api/", data)
            .then(res => {
                console.log(res.data);
                setTodos([
                    ...todos,
                    res.data
                ]);
            })
            .catch(error => {
                console.log('There was an error!', error.response.data);
            });
        setActualText('');
    }

    function handleChangeTodo(nextTodo) {
        todos.map(t => {
        if (t.id === nextTodo.id) {
            const data =
                {
                    id : nextTodo.id,
                    product: nextTodo.product,
                    done: nextTodo.done
                }
                console.log(data)
            axios.post(adress + "/api/update", data)
                .then(res => {
                    console.log(res.data);
                    setTodos(res.data)
                })
                .catch(error => {
                    console.log('There was an error!', error.response.data);
                });
        }});
    }

    function handleDeleteTodo(todoId) {
        axios.post(adress + "/api/remove", {id : todoId})
            .then(res => {
                setTodos(res.data)
                console.log(res.data);
            })
            .catch(error => {
                console.log('There was an error!', error.response.data);
            });
    }

    return (
        <div>
            <div className="m-2">{todos && todos.length ? "" : "Lista jest pusta ..."}</div>
            <TaskList
                todos={todos}
                onChangeTodo={handleChangeTodo}
                onDeleteTodo={handleDeleteTodo}
            />
            <div className="position-sticky mt-4 " style={{bottom:"0px", backgroundColor:"#fefefe"}}>
                <Form.Control size="lg" type="text" placeholder="Wpisz produkt..." value={actualText} onChange={(e) => setActualText(e.target.value)}/>
                <Button variant="secondary" className="spacing m-2 " style={{paddingLeft:"50px", paddingRight:"50px", fontSize:"20px"}} onClick={handleAddTodo}>
                    Dodaj
                </Button>
           </div>
        </div>
    );
}
