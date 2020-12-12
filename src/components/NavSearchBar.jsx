import React, { Component, Suspense} from "react";
import { Form, Nav, Navbar, Button } from "react-bootstrap";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./customDatePickerWidth.css";
import moment from "moment"
import Legend from "./Legend";
import Loading from "./Loading"
import tweets from "../data/tweets.json"
import axios from "axios"
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
const MyMap = React.lazy(() => import('./MyMap'));
const TimeSeries = React.lazy(() => import('./TimeSeries'));


class NavSearchBar extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            startDate: moment().startOf("week"),
            endDate: moment().startOf("week"),
            disaster: "",
            search: "",
            data: tweets,
            startDate_temp: moment().startOf("week"),
            endDate_temp: moment().startOf("week"),
            disaster_temp: "",
            search_temp: "",
            ready_state: "start"
        }
    }
    dummy_data= []
    loader = "loading"
    updateSearch(event){
        this.setState({
            search: event
        })
        
    }
    updateSearch_temp(event){
        this.setState({
            search_temp: event.target.value
        })
        
    }
    
    async updateDisaster(event){
        this.setState({
            disaster: event
        })
        var db = ""
        var temp_array = []
        this.loader = "loading"
        //change this url to whatever ip your Flask Server is running on
        await axios.post('http://localhost:5000/refresh_data', [event,this.state.startDate, this.state.endDate])
            .then((response) => {
                db = (JSON.parse(JSON.stringify(response.data)))
                for(var objects in db){
                    temp_array.push(db[objects])
                }
                this.dummy_data = temp_array
                this.loader = "done"
        })

        this.setState({
            data: this.dummy_data,
            ready_state: this.loader
        })
        
        
    }

    async updateDisaster_temp(event){
        this.setState({
            disaster_temp: event.target.value
        })
        
        
    }
    
    
    updateDate(event){
        this.setState({
            startDate:event.target.value,
            endDate:event.target.value
        })
        
    }

    updateDate_temp(event){
        this.setState({
            startDate_temp:event[0],
            endDate_temp:event[1]
        })
        
    }

    submit_Button(event){
        var e_t =this.state.startDate
        var s_t = this.state.endDate
        this.updateDate_temp([s_t,e_t])
        this.updateSearch(this.state.search_temp)
        console.log(this.state.disaster_temp)
        this.updateDisaster(this.state.disaster_temp)
        this.setState({
            ready_state: "loading"
        })
        
    }
    headers = [
        { label: 'created_at', key: 'created_at' },
        { label: 'user.location', key: 'user.location' },
      ];

    load() {
        if(this.state.ready_state === "start"){
            return(<div></div>)
        }
        if(this.state.ready_state === "loading"){
            return(<div>
                <Loading/>
            </div>)
        }
        if(this.state.ready_state === "done"){
            return ( 
                <div>
                    <Suspense fallback={Loading} >
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
                            search={this.state.search_temp}
                            data = {this.state.data}
                        /> 
                        <Legend/> 
                        
                    </Suspense>
                </div> 
                );
    }
}
     

    render() { 
        
        return(
            <div>
                
                <Navbar bg="primary" variant="dark" style={{width:"100vw", height: "10vh"}}>
                    <Navbar.Brand href="#home"> &nbsp;&nbsp; Tweettragedy </Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="./#">Home</Nav.Link>
                        <Nav.Link as={Link} to="./About">About</Nav.Link>
                        <Nav.Link as={Link} to="./Sourcing">Sourcing</Nav.Link>
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
                            block="true"
                            style={{height:"3vh", width:"10vw"}}
                            
                            />
                        <div>&nbsp;</div>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Location" 
                                value = {this.state.search_temp} 
                                onChange={this.updateSearch_temp.bind(this)}
                                style={{height:"5vh", width:"10vw"}}
                            />
                            <div>&nbsp;</div>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter Disaster" 
                                value = {this.state.disaster_temp} 
                                onChange={this.updateDisaster_temp.bind(this)}
                                style={{height:"5vh", width:"10vw"}}
                            />
                            <div>&nbsp;</div>
                            <Button
                                variant="warning"
                                onClick={this.submit_Button.bind(this)}
                                style={{height:"6vh", width:"10vw", fontWeight:"bold", }}
                            >Submit</Button>
                            &nbsp;

                            <CSVLink className="mr-auto" data={this.state.data} headers={this.headers} >

                            <Button
                                variant="success"
                                onClick={this.submit_Button.bind(this)}
                                style={{height:"6vh", width:"8vw", fontWeight:"bold", }}
                            >Download</Button>
                            </CSVLink>
                            &nbsp;
                            &nbsp;


                        </Form.Group>
                        
                    </Form>
                </Navbar>
                {this.load()}
                {this.ready_state}

            </div>
          );
    }
}
 
export default NavSearchBar;