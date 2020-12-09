import React from 'react';
import { Jumbotron, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


const Sourcing = () => {
    return ( 
    <div>
                
        <header style={{width:"100vw", height: "10vh"}}>
            <Navbar bg="primary" variant="dark" style={{width:"100vw", height: "10vh"}}>  
                <Navbar.Brand href="#home"> &nbsp;&nbsp; Tweettragedy </Navbar.Brand>
                <Nav className="mr-auto">
                        <Nav.Link as={Link} to="./">Home</Nav.Link>
                        <Nav.Link as={Link} to="/About">About</Nav.Link>
                        <Nav.Link as={Link} to="/Sourcing">Sourcing</Nav.Link>
                </Nav>
                
            </Navbar>
            
        </header>
        <div>
            <br></br>
            <br></br>
            <center>
                <Jumbotron style={{width:"60vw",height:"80vh" , textAlign:"left", fontSize:"3vh"}}>
                    Thanks to all the creators of the resources we used
                    <br></br>
                    Following Resources we used
                    <br></br>
                    React
                    <br></br>
                    Flask
                    <br></br>
                    Bootstrap
                    <br></br>
                    Leaflet
                    <br></br>
                    Python
                    <br></br>
                    Javascript
                    <br></br>
                    MongoDB
                    <br></br>
                    Chart2-React-JS
                    <br></br>
                    Pandas
                    <br></br>
                    Scikit-Learn
                    <br></br>
                    Tweepy
                    <br></br>
                    Pymongo
                    
                </Jumbotron>
            </center>
        </div>
        
    </div> 
    )
}
 
export default Sourcing;