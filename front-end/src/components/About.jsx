import React from 'react';
import { Jumbotron, Nav, Navbar } from "react-bootstrap";



const About = () => {
    return ( 
    <div>
                
        <header style={{width:"100vw", height: "10vh"}}>
            <Navbar bg="primary" variant="dark" style={{width:"100vw", height: "8vh"}}>  
                <Navbar.Brand href="#home"> &nbsp;&nbsp; Tweetragety </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="./">Home</Nav.Link>
                    <Nav.Link href="./About">About</Nav.Link>
                    <Nav.Link href="./Sourcing">Sourcing</Nav.Link>
                </Nav>
                
            </Navbar>
            
        </header>
        <div>
            <br></br>
            <br></br>
            <center>
                <Jumbotron style={{width:"60vw",height:"60vh" , textAlign:"left", fontSize:"3vh"}}>
                    Dedicated to our heroes in the Fire Department.
                    <br></br>

                    Created as a low latency service to alert first responders as well as the general population to give them information on disasters.
                    Group of SIU students made this website using Machine Learning, Graphing, Mapping, and Databases. This is created to illustrate the amount of reported tweets about a given disaster such that you could ascertain whether a disaster is occurring and how often they occur within a given timeframe, as well as how often they occur throughout a given season.
                    <br></br>
                    Brought to you by, 
                    <br></br>
                    Our Team, and Our School SIU! GO SALUKIS!!!

                </Jumbotron>
            </center>
        </div>
        
    </div> 
    )
}
 
export default About;