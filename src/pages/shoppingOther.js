import React, {useEffect, useState} from 'react';
import ShoppingOtherList from "./shoppingOtherItem/shoppingOtherItem";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import VARIABLE from "../VARIABLE";

const address = VARIABLE.address

export default function ShoppingOther() {
    const [shoppingOtherList, setShoppingOtherList] = useState([]);
    const [actualText, setActualText] = useState("")

    const fetchUserData = () => {
        axios.get(address + "api/shoppingOther/")
            .then(response => {
                setShoppingOtherList(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log("Error>>>>" + error));
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    function handleAddShoppingOther(title) {
        const data =
            {
                product: actualText,
                done: true
            }
        axios.post(address + "api/shoppingOther/", data)
            .then(res => {
                console.log(res.data);
                setShoppingOtherList([
                    ...shoppingOtherList,
                    res.data
                ]);
            })
            .catch(error => {
                console.log('There was an error!', error.response.data);
            });
        setActualText('');
    }

    function handleChangeShoppingOther(nextShoppingOtherItem) {
        shoppingOtherList.forEach(t => {
            if (t.id === nextShoppingOtherItem.id) {
                const data =
                    {
                        id : nextShoppingOtherItem.id,
                        product: nextShoppingOtherItem.product,
                        done: nextShoppingOtherItem.done
                    }
                console.log(data)
                axios.post(address + "api/shoppingOther/update", data)
                    .then(res => {
                        console.log(res.data);
                        setShoppingOtherList(res.data)
                    })
                    .catch(error => {
                        console.log('There was an error!', error.response.data);
                    });
            }});
    }

    function handleDeleteShoppingOther(todoId) {
        axios.post(address + "api/shoppingOther/remove", {id : todoId})
            .then(res => {
                setShoppingOtherList(res.data)
                console.log(res.data);
            })
            .catch(error => {
                console.log('There was an error!', error.response.data);
            });
    }

    return (
        <div>
            <div className="m-2">{shoppingOtherList && shoppingOtherList.length ? "" : "Lista jest pusta ..."}</div>
            <ShoppingOtherList
                shoppingOtherList={shoppingOtherList}
                onChangeShoppingOther={handleChangeShoppingOther}
                onDeleteShoppingOther={handleDeleteShoppingOther}
            />
            <div className="position-sticky mt-4 " style={{bottom:"0px", backgroundColor:"#fefefe"}}>
                <Form.Control size="lg" type="text" placeholder="Wpisz produkt..." value={actualText} onChange={(e) => setActualText(e.target.value)}/>
                <Button variant="secondary" className="spacing m-2 " style={{paddingLeft:"50px", paddingRight:"50px", fontSize:"20px"}} onClick={handleAddShoppingOther}>
                    Dodaj
                </Button>
            </div>
        </div>
    );
}
