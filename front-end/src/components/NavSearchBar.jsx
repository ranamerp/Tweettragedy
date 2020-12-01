import React, { Component } from "react";
import { Form, Nav, Navbar } from "react-bootstrap";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import MyMap from "./MyMap";
import moment from "moment"
import Legend from "./Legend";
import TimeSeries from "./TimeSeries"
import tweets from "../data/tweets.json"
import axios from "axios"



class NavSearchBar extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            startDate: moment().startOf("week"),
            endDate: moment().startOf("week"),
            disaster: "",
            search: "",
            data: tweets,
            dummy_data: []
        }
    }
    
    updateSearch(event){
        this.setState({
            search: event.target.value
        })

     //   fetch('http://localhost:5000/refresh_data')
      //      .then(response => response.json())
       //     .then(data => this.setState({
        //        dummy_data:JSON.stringify(data)
          //  }));

        
        console.log(this.state.dummy_data)
        
    }
    updateDisaster(event){

        

        this.setState({
            disaster: event.target.value
        })

        axios.post('http://localhost:5000/refresh_data', [this.state.disaster])
            .then(function(response){
                console.log(response.data);
        })
        
    }

    
    updateDate(event){
        this.setState({
            startDate:event.target.value,
            endDate:event.target.value
        })
        
    }

     

    render() { 
        
        return(
            <div>
                
                <header style={{width:"100vw", height: "10vh"}}>
                    <Navbar bg="primary" variant="dark" style={{width:"100vw", height: "8vh"}}>
                        
                        <Navbar.Brand href="#home"> &nbsp;&nbsp; Tweetragety </Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="./Main.jsx">Home</Nav.Link>
                            <Nav.Link href="./About.jsx">About</Nav.Link>
                            <Nav.Link href="./Sourcing">Sourcing</Nav.Link>
                        </Nav>
                        <Form inline >
                            <Form.Group> 
                            <DateRangePicker
                                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                startDateId="5"
                                endDateId="5"
                                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                updateDate={this.updateDate.bind(this)}
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired, 
                                isOutsideRange={() => false}
                                style={{height:"5vh", width:"10vw"}}
                                />

                            <div>&nbsp;</div>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Location" 
                                    value = {this.state.search} 
                                    onChange={this.updateSearch.bind(this)}
                                    style={{height:"5vh", width:"10vw"}}
                                />
                                <div>&nbsp;</div>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Disaster" 
                                    value = {this.state.disaster} 
                                    onChange={this.updateDisaster.bind(this)}
                                    style={{height:"5vh", width:"10vw"}}
                                />
                                <div>&nbsp;</div>
                            

                            </Form.Group>
                            
                        </Form>
                    </Navbar>
                    
                </header>
            <div>
            {JSON.stringify(this.state.buttonClicked)}
                <center>
                <TimeSeries
                    data = {this.state.data}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                />
                </center>
                <br></br>
                <br></br>
                <MyMap
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    search={this.state.search}
                    data = {this.state.data}
                /> 
                <Legend/> 
                
            </div>
            </div>
          );
    }
}
 
export default NavSearchBar;