import React, {useEffect, useState} from "react";
import axios from "axios";
import VARIABLE from "../VARIABLE";
import {Button} from "react-bootstrap";
import DreamItem from "./DreamsDir/dreamItem";

const address = VARIABLE.address

const dreamsDropdownTest = [
    {
        id: 0,
        title: "pierwszy",
        text: "daskhbdhas dashdbasbdasd skdabkbshda kjbdsakhbdahs ksjdbakbhdsa kjsbdkbakdbs kjbsdakba"
    },
    {
        id: 0,
        title: "drugi",
        text: "daskhbdhas dashdbasbdasd skdabkbshda kjbdsakhbdahs ksjdbakbhdsa kjsbdkbakdbs kjbsdakba"
    },
    {
        id: 0,
        title: "trzeci",
        text: "daskhbdhas dashdbasbdasd skdabkbshda kjbdsakhbdahs ksjdbakbhdsa kjsbdkbakdbs kjbsdakba"
    },
    {
        id: 0,
        title: "czwarty",
        text: "daskhbdhas dashdbasbdasd skdabkbshda kjbdsakhbdahs ksjdbakbhdsa kjsbdkbakdbs kjbsdakba"
    },
]
export default function DreamsPage(){
    const [dreamsDropdown, setDreamsDropDown] = useState(dreamsDropdownTest)
    return(
        <div className="dreamsDropDown">
            {dreamsDropdown.map(dreamDropDown => (
                <DreamItem
                    dreamsDropdown={dreamDropDown}
                />
            ))}
        </div>
    )
}