import React, {useState} from "react";
// import axios from "axios";
import VARIABLE from "../../VARIABLE";
// import {Button} from "react-bootstrap";

const address = VARIABLE.address

export default function DreamItem({
                                      dreamsDropdown
                                  }){

    const [isClicked, setIsClicked] = useState(false)

    return(
        <div>
            <div style={{width:"100%"}}>
                <button style={{width:"100%" , borderTop:"none", borderLeft:"none", borderRight:"none", borderBottom:"solid 2px #ffaaaa", padding:"10px", marginTop:"10px", backgroundColor:"inherit"}} onClick={()=>setIsClicked(!isClicked)}>{dreamsDropdown.title}</button>
            </div>
            <div className={isClicked ? "dreamsDropDownSpanOn" : "dreamsDropDownSpanOff"}>
                <span>{dreamsDropdown.text}</span>
            </div>
        </div>
    )
}