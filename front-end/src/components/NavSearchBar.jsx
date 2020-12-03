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
import { CSVLink, CSVDownload } from "react-csv";


class NavSearchBar extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            startDate: moment().startOf("week"),
            endDate: moment().startOf("week"),
            disaster: "",
            search: "",
            data: tweets,
            
        }
    }
    dummy_data= []
    updateSearch(event){
        this.setState({
            search: event.target.value
        })
        
    }
    async updateDisaster(event){

        this.setState({
            disaster: event.target.value
        })
        var db = ""
        var temp_array = []
        await axios.post('http://localhost:5000/refresh_data', [this.state.disaster])
            .then((response) => {
                db = (JSON.parse(JSON.stringify(response.data)))
                for(var objects in db){
                    temp_array.push(db[objects])
                }
                this.dummy_data = temp_array
                
        })
        

        this.setState({
            data: this.dummy_data
        })
        
        console.log(this.state.data)
        
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
                            <Nav.Link href="./">Home</Nav.Link>
                            <Nav.Link href="./About">About</Nav.Link>
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
                                style={{height:"5%", width:"10vw"}}
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
                    
                    <CSVLink data={this.state.data}>Download me</CSVLink>;

                </div>
            </div>
          );
    }
}
 
export default NavSearchBar;