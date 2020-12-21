import React from 'react';
import { Jumbotron, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import aboutbackground from '/Users/markusovich/Tweettragedy-master/src/images/aboutbackground.jpg'

const About = () => {
    return ( 
    <div style ={ { backgroundImage: "url("+aboutbackground+")",  width:"100%", height: "136vh"} }>
        <Navbar bg="primary" variant="dark" style={{width:"100vw", height: "7vh"}}>  
            <br></br>
            <Navbar.Brand href="#home"> &nbsp;&nbsp; Tweettragedy </Navbar.Brand>
            <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/#">Home</Nav.Link>
                    <Nav.Link as={Link} to="/About">About</Nav.Link>
                    <Nav.Link as={Link} to="/Sourcing">Sourcing</Nav.Link>
            </Nav>
        </Navbar>

        <br></br><br></br><br></br><br></br>
        <center>
            <Jumbotron style={{width:"60vw",height:"90vh" , textAlign:"center", fontSize:"3vh", opacity: 0.6}}>
                Dedicated to first responders and humanitarians.
                <br></br>
                <br></br>
                <br></br>
                Created as a low latency service to alert first responders as well as the general population on disasters.
                <br></br>
                <br></br>
                <br></br>
                This is created to illustrate the amount of reported tweets about a given disaster such that you could ascertain whether a disaster is occurring and how often they occur within a given timeframe, as well as how often they occur throughout a given season.
                <br></br>
                <br></br>
                <br></br>
                Brought to you by Simon M., Prem R., Claire F., Matt C., Aron M. and most importantly Southern Illinois University.
                <br></br>
            
            </Jumbotron>
        </center>
    </div>
    )
}
 
export default About;