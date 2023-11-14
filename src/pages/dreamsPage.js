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
    // 
    const [file, setFile] = useState()

    useEffect(() => {
        console.log(file)
    }, [file])

    const onFileUpload = () => {

    
        // Create an object of formData
        const formData = new FormData();
    
        // Update the formData object
        formData.append(

        );
    
        // Details of the uploaded file
        console.log(file);
    
        // Request made to the backend api
        // Send formData object
        axios.post(address + "api/dreams/uploadFileupload/", formData)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log('There was an error!', error.response.data);
            });
    };
    
    // File content to be displayed after
    // file upload is complete
    const fileData = () => {
    
        if (file) {
    
            return (
                <div>
                    <h2>File name:</h2>
                    <p>{file.name}</p>
                    <h2>File size:</h2>
                    <p>{file.size}</p>
                    <h2>Last modified date:</h2>
                    <p>{file.lastModified.toISOString}</p>
                    <p>
                        Last Modified:{" "}
                        {/* {state.selectedFile.lastModifiedDate.toDateString()} */}
                    </p>
    
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };
    // 
    const [dreamsDropdown, setDreamsDropDown] = useState(dreamsDropdownTest)
    return(
        <div>
            <div className="dreamsDropDown">
                {dreamsDropdown.map(dreamDropDown => (
                    <DreamItem
                        dreamsDropdown={dreamDropDown}
                    />
                ))}
            </div>
            <div>
                <h1>
                    Plik
                </h1>
                <h3>
                    Dodaj plik
                </h3>
                    <div>
                        <input type="file" onChange={(event)=>{setFile(event.target.files[0])}} />
                        <Button variant="outline-secondary" onClick={onFileUpload}>
                            Upload!
                        </Button>
                    </div>
                {fileData()}
            </div>
        </div>
    )
}
