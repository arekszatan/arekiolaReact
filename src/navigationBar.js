import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";

function Navigation() {
    return (
        <div className="position-sticky" style={{top:"0px", backgroundColor:"#fefefe"}}>
            <Navbar expand="lg" className="mb-2">
                <Container>
                    <Navbar.Brand href="/" style={{fontSize: "3rem",margin:"auto"}}>Ola i Arek</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="">
                        <Nav className="mx-sm-auto">
                            <Nav.Link href="/" className="mx-3">Strona główna</Nav.Link>
                            <Nav.Link href="/shopping" className="mx-3">Zakupy</Nav.Link>
                            <Nav.Link href="/wallet" className="mx-3">Portfel</Nav.Link>
                            <NavDropdown title="Wkrótce" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/test" className="h5">
                                    Test
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.2" className="h5">
                                    Strona 2
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="hr"></div>
        </div>
    );
}

export default Navigation;