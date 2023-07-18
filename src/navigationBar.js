import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {useEffect, useState} from "react";
import axios from "axios";
import VARIABLE from "./VARIABLE";

const address = VARIABLE.address

function Navigation() {
    const [colorText, setColorText] = useState([
        {
            id: 3,
            name: "Arek",
            textColor: "#f01a1a"
        },
        {
            id: 4,
            name: "Ola",
            textColor: "#123456"
        }
    ])

    const fetchUserData = () => {
        axios.get(address + "api/setting/textColor")
            .then(response => {
                setColorText(response.data)
                console.log(response.data)
            })
            .catch((error) => console.log("Error>>>>" + error));
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <div className="position-sticky" style={{top:"0px", backgroundColor:"#fefefe"}}>
            <Navbar expand="lg" className="mb-2 ">
                <Container>
                    <Navbar.Brand  href="/" style={{fontSize: "3rem",margin:"auto"}}><span style={{color:colorText[1].textColor}}>Ola</span> i <span style={{color:colorText[0].textColor}}>Arek</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="">
                        <Nav className="mx-sm-auto">
                            <Nav.Link href="/" className="mx-3">Strona główna</Nav.Link>
                            <NavDropdown title="Zakupy" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/shopping" className="h5">
                                    Codzienne
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/shoppingOther" className="h5">
                                    Reszta
                                </NavDropdown.Item>
                            </NavDropdown>
                            {/*<Nav.Link href="/shopping" className="mx-3">Zakupy</Nav.Link>*/}
                            {/*<Nav.Link href="/shopping" className="mx-3">Zakupy</Nav.Link>*/}
                            <Nav.Link href="/wallet" className="mx-3">Portfel</Nav.Link>
                            <Nav.Link href="/settings" className="mx-3">Ustawienia</Nav.Link>
                            {/*<NavDropdown title="Wkrótce" id="basic-nav-dropdown" >*/}
                            {/*    <NavDropdown.Item href="/test" className="h5">*/}
                            {/*        Test*/}
                            {/*    </NavDropdown.Item>*/}
                            {/*    <NavDropdown.Divider />*/}
                            {/*    <NavDropdown.Item href="#action/3.2" className="h5">*/}
                            {/*        Strona 2*/}
                            {/*    </NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="hr"></div>
        </div>
    );
}

export default Navigation;