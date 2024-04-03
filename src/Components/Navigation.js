import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from '../Images/logo.jpg';
import Cart from '../Images/chariot-de-chariot.png';
import Call from '../Images/service-client.png';
import '../Styles/Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import LanguageSelector from './LanguageSelector';
import Panier from './panier'; 
import AssistanceTelephonique from './AssistanceTelephonique';

function Navigation() {
  const ProductsPlaceholder = 'Rechercher des produits';
  const [showPanier, setShowPanier] = useState(false);
  const [showAssistance, setShowAssistance] = useState(false);

  const togglePanier = () => {
    setShowPanier(!showPanier);
    setShowAssistance(false);
  };

  const toggleAssistance = () => {
    setShowAssistance(!showAssistance);
    setShowPanier(false);
  };

  return (
    <Navbar expand="lg" className='bg-body-tertiary'>
      <Container style={{ padding: "0%" }}>
        <Navbar.Brand href="#home" className="d-flex align-items-center brand">
          <img src={Image} alt="image" />
          <span className="brand-text">FarmConnect</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex justify-content-between">
            <Nav.Link href="#home" className="ms-3" style={{ marginRight: '1rem' }}>Accueil</Nav.Link>
            <Nav.Link href="#link" className="ms-3" style={{ marginRight: '1rem' }}>A propos</Nav.Link>
            <NavDropdown title="Produits" id="basic-nav-dropdown" style={{ marginRight: '1rem' }}>
              <NavDropdown.Item href="#action/3.1">
                Fruits
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Légumes
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Autres" id="basic-nav-dropdown" style={{ marginRight: '1rem' }}>
              <NavDropdown.Item href="#action/3.1">
                Équipements
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Terrains
              </NavDropdown.Item>
            </NavDropdown>
            <SearchBar placeholderText={ProductsPlaceholder} />
            <div style={{ padding: '7px'}}>
              <LanguageSelector />
            </div>
            <Nav.Link onClick={togglePanier}>
              <img src={Cart} alt="Panier" style={{ width: '30px' }} />
            </Nav.Link>
            <Nav.Link onClick={toggleAssistance}>
              <img src={Call} alt="Appel" style={{ width: '30px' }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {showPanier && <Panier />}
      {showAssistance && <AssistanceTelephonique />} 
    </Navbar>
  );
}

export default Navigation;
