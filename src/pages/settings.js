import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {SketchPicker} from "react-color";
import axios from "axios";
import VARIABLE from "../VARIABLE";

const address = VARIABLE.address
export default function Settings(){
    const [isEditing, setIsEditing] = useState(false)
    const [displayName, setDisplayName] = useState(false)
    const [displayColor, setDisplayColor] = useState(false)
    const [editingName, setEditingName] = useState("")
    const [actualColor, setActualColor] = useState("black")

    useEffect(() => {
        console.log(actualColor)
    }, [actualColor])

    function postApi(apiAddress, data){
        axios.post(address + apiAddress, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log('There was an error!', error.response.data);
            });
    }
    function buttonClicked(){
        if (isEditing){
            const data =
                {
                    name: editingName,
                    textColor: actualColor
                }
            console.log(data)
            postApi('api/setting/textColor', data)
            setIsEditing(false)
            setDisplayColor(false)
        }else{
            setDisplayName(true)
            setIsEditing(true)
        }
    }

    function buttonNameClicked(isWoman){
        setDisplayColor(true)
        setDisplayName(false)
        if(isWoman){
            setEditingName("Ola")
        } else {
            setEditingName("Arek")
        }

    }

    const changeColor = (color) => {
        setActualColor(color.hex)
    }

    return(
        <div>
            {displayColor ?
                <div>
                    <div style={{color:actualColor}}>{editingName}</div>
                    <div className="m-3">
                        <SketchPicker className="m-auto"
                        color={ actualColor }
                        onChangeComplete={ changeColor }
                        />
                    </div>
                </div>
            :
                <div>

                </div>}

            {displayName ?
                <div>
                    <Button size="lg" variant="outline-success" className="m-4" onClick={()=>{buttonNameClicked(true)}}>Ola</Button>
                    <Button size="lg" variant="outline-success" className="m-4" onClick={()=>{buttonNameClicked(false)}}>Arek</Button>
                </div>
                :
                <Button variant="outline-danger" className="spacing" onClick={()=>{buttonClicked()}}>
                    {isEditing ? "Zapisz": "Wybierz kolory"}
                </Button>}
        </div>
    )
}



