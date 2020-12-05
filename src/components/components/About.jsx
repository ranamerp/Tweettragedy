import React from 'react';
import { Jumbotron, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


const About = () => {
    return ( 
    <div>
            
            <Navbar bg="primary" variant="dark" style={{width:"100vw", height: "10vh"}}>  
            <br></br>
                <Navbar.Brand href="#home"> &nbsp;&nbsp; Tweettragedy </Navbar.Brand>
                <Nav className="mr-auto">
                        <Nav.Link as={Link} to="./">Home</Nav.Link>
                        <Nav.Link as={Link} to="./About">About</Nav.Link>
                        <Nav.Link as={Link} to="./Sourcing">Sourcing</Nav.Link>
                </Nav>
                <br></br>
                <div style={{height: "12vh"}}>
                    <br></br>
                </div>
                <br></br>
                <br></br>
                
            </Navbar>
            
        <div>
            <br></br>
            <br></br>
            <center>
                <Jumbotron style={{width:"60vw",height:"60vh" , textAlign:"left", fontSize:"3vh"}}>
                    Dedicated to first responders and humanitarians 
                    <br></br>
                    <br></br>

                    Created as a low latency service to alert first responders as well as the general population to give them information on disasters.
                    A group of SIU students made this website using Machine Learning, Graphing, Mapping, and Databases. This is created to illustrate the amount of reported tweets about a given disaster such that you could ascertain whether a disaster is occurring and how often they occur within a given timeframe, as well as how often they occur throughout a given season.
                    <br></br>
                    <br></br>
                    Brought to you by Simon M., Prem R., Claire F., Matt C., Aron M. and most importantly Southern Illinois University.

                </Jumbotron>
            </center>
        </div>
        
    </div> 
    )
}
 
export default About;