import { Button , Stack} from "react-bootstrap";
import React, {useState} from "react";
import binIcon from './img/bin_484662.png'
import checkIcon from  './img/check_1828743.png'
import uncheckIcon from './img/close_2976286.png'
import { Image } from "react-bootstrap";

export default function TaskList({
     todos,
     onChangeTodo,
     onDeleteTodo
     }) {
    return (
        <div>
            {todos.map(todo => (
                    <Task
                        todo={todo}
                        onChange={onChangeTodo}
                        onDelete={onDeleteTodo}
                    />
            ))}
        </div>
    );
}

function Task({ todo, onChange, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [tmpText, setTmpText] = useState("");
    let todoContent;
    let titleContent;
    if(isEditing){
        titleContent = (
            <input
                value={todo.title}
                onChange={e => {
                    setTmpText(e.target.value)
                }} />
        );
    } else {
        titleContent = (
        <div className={todo.done ? "p-2" : "text-decoration-line-through p-2 "}>{todo.product}</div>
        );
    }
    if (isEditing) {
        todoContent = (
                <Button variant="secondary" className="spacing" onClick={() => {
                    setIsEditing(false)
                    tmpText === "" ?
                        console.log("Text dont set")
                    :
                        onChange({
                            ...todo,
                            product: tmpText
                        });
                        setTmpText("");
                }}>
                    Zapisz
                </Button>
        );
    } else {
        todoContent = (
            <Button variant="secondary" className="spacing " onClick={() => setIsEditing(true)}>
                Edytuj
            </Button>
        );
    }
    return (
        <div className="m-3">
            <Stack direction="horizontal" gap={2}>
                {titleContent}
                <div className="p-2 ms-auto">
                    {todoContent}
                    {todo.done ?
                    <Button variant="secondary" className="spacing m-1 bg-success" onClick={() =>{
                        onChange({
                            ...todo,
                            done: false
                        });
                    } }>
                        <Image src={checkIcon} style={{height:"20px"}} />
                    </Button>
                    :
                    <Button variant="secondary" className="spacing m-1" onClick={() => {
                        onChange({
                            ...todo,
                            done: true
                        });
                    }}>
                        <Image src={uncheckIcon} style={{height:"20px"}} />
                    </Button>}
                    <Button variant="secondary" className="spacing m-1 bg-danger bg-opacity-10" onClick={() => onDelete(todo.id)}>
                        <Image src={binIcon} style={{height:"20px"}} />
                    </Button>
                </div>
            </Stack>
            <div className="hr"></div>
        </div>
    );
}