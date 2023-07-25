import React, {useEffect, useState} from "react";
import WalletItem from "./WalletDir/walletItem";
import VARIABLE from "../VARIABLE";
import axios from "axios";
import {Alert, Button, Form, Stack} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import LoadingSpinner from "../loadingSpinner";

const address = VARIABLE.address

export default function WalletPage() {
    const [walletList, setWalletList] = useState([]);
    const [colorText, setColorText] = useState([])
    const [sumArek, setSumArek] = useState(0)
    const [sumOla, setSumOla] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    const [deleteAll, setDeleteAll] = useState(false)
    const [actualPrize, setActualPrize] = useState("")
    const [actualChosen, setActualChosen] = useState("0")
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingAccount, setIsLoadingAccount] = useState(false);

    const fetchUserData = () => {
        axios.get(address + "api/setting/textColor")
            .then(response => {
                setColorText(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log("Error>>>>" + error));

        axios.get(address + "api/wallet/List/")
            .then(response => {
                setWalletList(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log("Error>>>>" + error));
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(()=>{
        function getSumFamale(){
            let sumFamale = 0
            walletList.forEach((wallet) => {
                if (wallet.female)
                    sumFamale += wallet.price
            })
            setSumOla(sumFamale)

        }

        function getSumMale(){
            let sumMale = 0
            walletList.forEach((wallet)=>{
                if (!wallet.female)
                    sumMale += wallet.price
            })
            setSumArek(sumMale)

        }
        getSumMale()
        getSumFamale()
    }, [walletList])

    function getDiff(){
        const diff = sumArek - sumOla
        return diff > 0;

    }
    function addButton(){
        console.log(actualPrize, actualChosen)
        if (actualPrize === "0" || actualPrize === "" || Number(actualPrize) < 0)
            return
        let famale = false
        let person = ""
        switch (actualChosen){
            case '0':
                person = "Ola"
                famale = true
                break
            case '1':
                person = "Arek"
                famale = false
                break
            default:
        }
        const data = {
            female : famale,
            person : person,
            price : Number(actualPrize)
        }
        setIsLoading(true)
        axios.post(address + "api/wallet/list/add/", data)
            .then(res => {
                console.log(res.data);
                setIsLoading(false)
                setIsEditing(false)
                setWalletList([
                    ...walletList,
                    res.data])
            })
            .catch(error => {
                setIsEditing(false)
                console.log('There was an error!', error.response.data);
            });
        setActualPrize("")
        setActualChosen("0")
    }

    function deleteAllPrize(){
        setIsLoadingAccount(true)
        axios.post(address + "api/wallet/list/remove/")
            .then(res => {
                setIsLoadingAccount(false)
                setDeleteAll(false)
                console.log(res.data);
                setWalletList(res.data)
            })
            .catch(error => {
                setDeleteAll(false)
                console.log('There was an error!', error.response.data);
            });
    }

    return (
        <div style={{color:"black"}}>
            {walletList.map(wallet => (
                <WalletItem
                    colorText={colorText}
                    id={wallet.id}
                    female={wallet.female}
                    person={wallet.person}
                    price={wallet.price}
                />
            ))}
            <div className="hr"></div>
            <Stack direction="horizontal" gap={2} className="">
                <Stack direction="vertical">
                    <div style={{color: colorText.length !== 0 ? colorText[0].textColor : "black"}}>
                        Suma Arek:
                    </div>
                    <div style={{color: colorText.length !== 0 ? colorText[0].textColor : "black"}}>
                        {sumArek.toFixed(2)}
                    </div>
                </Stack>
                <Stack className="ms-auto">
                    <div style={{color: colorText.length !== 0 ? colorText[1].textColor : "black"}}>
                        Suma Ola:
                    </div>
                    <div style={{color: colorText.length !== 0 ? colorText[1].textColor : "black"}}>
                        {sumOla.toFixed(2)}
                    </div>
                </Stack>
            </Stack>
            <div className="hr"></div>
            {getDiff() ?
                <div>
                    <div>
                        Arek <FontAwesomeIcon icon={faArrowCircleLeft} /> <FontAwesomeIcon icon={faArrowCircleLeft} /> Ola
                    </div>
                    <div>
                        {((sumArek - sumOla)/2).toFixed(2)}
                    </div>
                </div>
                :
                <div>
                    <div>
                        Arek <FontAwesomeIcon icon={faArrowCircleRight} /> <FontAwesomeIcon icon={faArrowCircleRight} /> Ola
                    </div>
                    <div>
                        {((sumOla - sumArek)/2).toFixed(2)}
                    </div>
                </div>
               }
            {isEditing ?
                <div className="position-sticky mt-4 " style={{bottom:"0px", backgroundColor:"#fefefe"}}>
                    <div className="position-sticky mt-4 m-auto" style={{bottom:"0px", backgroundColor:"#fefefe", maxWidth:"600px"}}>
                        <Stack direction="horizontal">
                            <Form.Select size="lg" className="my-2 m-auto" style={{maxWidth:"150px"}} onChange={(e)=>setActualChosen(e.target.value)}>
                                <option value="0">Ola</option>
                                <option value="1">Arek</option>
                            </Form.Select>
                            <Form.Control className="m-auto" size="lg" type="number" placeholder="Wpisz kwotę..." value={actualPrize} onChange={(e) =>setActualPrize(e.target.value)} style={{maxWidth:"200px"}}/>
                        </Stack>
                        <Button variant="success" className="spacing m-2 " style={{minWidth:"150px", fontSize:"20px"}} onClick={()=>addButton()}>
                            {isLoading ? <LoadingSpinner/> : "Dodaj"}
                        </Button>
                    </div>
                </div>
                :
                <div className="position-sticky mt-4 " style={{bottom:"0px", backgroundColor:"#fefefe"}}>
                    <Button variant="outline-secondary" className="spacing m-2" style={{minWidth:"200px", fontSize:"20px"}} onClick={()=>setIsEditing(true)}>
                        Dodaj
                    </Button>
                </div>


            }
            <Button variant="outline-danger" className="spacing m-2" style={{minWidth:"200px", fontSize:"20px"}} onClick={()=>setDeleteAll(true)}>
                Rozlicz
            </Button>
            {deleteAll?
                <div style={{position:"fixed", top:"40%", left:"10%", right:"10%"}}>
                    <Alert variant="dark">
                        <Alert.Heading>Rozlicz</Alert.Heading>
                        <p className="text-danger-emphasis">
                            Rozliczyć wszystko?
                        </p>
                        <hr />
                        <Stack direction="horizontal" gap={1}>
                            <div className="d-flex justify-content-end">
                                <Button className="spacing" onClick={() => deleteAllPrize()} variant="outline-success">
                                    {isLoadingAccount ? <LoadingSpinner/> : "Rozlicz"}
                                </Button>
                            </div>
                            <div className="d-flex ms-auto">
                                <Button className="spacing" onClick={() => setDeleteAll(false)} variant="outline-danger">
                                    Rezygnuje
                                </Button>
                            </div>
                        </Stack>
                    </Alert>
                </div>
                :
                ""
            }
        </div>

    );
}