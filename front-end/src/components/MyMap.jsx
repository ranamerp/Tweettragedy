import React, { Component } from 'react';
import countries from './../data/countries.json';
import states from './../data/states.json';
import {Map, GeoJSON} from "react-leaflet"
import "leaflet/dist/leaflet.css";
import "./MyMap.css";


class MyMap extends Component {
   
    
    stateStyle = {
        fillColor: "white",
        fillOpacity: 1,
        color: "black",
        weight: 0.5

    };

    countryStyle = {
        fillColor: "white",
        fillOpacity: 1,
        color: "black",
        weight: 2

    };
    convertDate(date){
        var date2 = ""
        switch(date.substring(5,8)){
            case "Jan":
                date2 = date2.concat("1");
            break;
            case "Feb":
                date2 = date2.concat("2");
            break;
            case "Mar":
                date2 = date2.concat("3");
            break;
            case "Apr":
                date2 = date2.concat("4");
            break;
            case "May":
                date2 = date2.concat("5");
            break;
            case "Jun":
                date2 = date2.concat("6");
            break;
            case "Jul":
                date2 = date2.concat("7");
            break;
            case "Aug":
                date2 = date2.concat("8");
            break;
            case "Sep":
                date2 = date2.concat("9");
            break;
            case "Oct":
                date2 = date2.concat("10");
            break;
            case "Nov":
                date2 = date2.concat("11");
            break;
            case "Dec":
                date2 = date2.concat("12");
            break;
            default:
                date2 = date2.concat("??");
                break;
            }
        date2 = date2.concat("/");
        date2 = date2.concat(date.substring(9,11)); //day
        date2 = date2.concat("/");
        date2 = date2.concat(date.substring(27,31)); //year
        return date2;
    }

    convertDate2(date){
        var date2 = "";
        date2 = date2.concat(date.substring(6,8)); //month
        date2 = date2.concat("/");
        date2 = date2.concat(date.substring(9,11)); //day
        date2 = date2.concat("/");
        date2 = date2.concat(date.substring(1,5)); //year
        return date2;
    }

    compareDate(start,end,date){
        if(parseInt(start.substring(6)) > parseInt(date.substring(6))){ // if the year is bigger in chosen start date over tweet
            return false;
        }
        if((parseInt(start.substring(6)) === parseInt(date.substring(6)) && // if its in the same year
            parseInt(start.substring(0,2)) > parseInt(date.substring(0,2)))){ // month diff
            return false;
        }
        if((parseInt(start.substring(6)) === parseInt(date.substring(6)) && // if its in the same year
            parseInt(start.substring(0,2)) === parseInt(date.substring(0,2)) && // if its in the same month too
            parseInt(start.substring(3,5)) > parseInt(date.substring(3,5)))){ // day diff
            return false;
        }
        if(parseInt(end.substring(6)) < parseInt(date.substring(6))){ // if the year is smaller in chosen end date over tweet
            return false;
        }
        if((parseInt(end.substring(6)) === parseInt(date.substring(6)) && // if its in the same year
            parseInt(end.substring(0,2)) < parseInt(date.substring(0,2)))){ // month diff
            return false;
        }
        if((parseInt(end.substring(6)) === parseInt(date.substring(6)) && // if its in the same year
            parseInt(end.substring(0,2)) === parseInt(date.substring(0,2)) && // if its in the same month too
            parseInt(end.substring(3,5)) < parseInt(date.substring(3,5)))){ // day diff
            return false;
        }
        return true;
        
    }

    //`````````````````````````````````````````````````````````````````````````

    OnEachState = (state, layer) => { // loops thru every state
        const state_name = state.properties.NAME; // name of state
        var Start = this.convertDate2(JSON.stringify(this.props.startDate)); 
        var End = this.convertDate2(JSON.stringify(this.props.endDate)); 
        var Dte = this.convertDate(JSON.stringify(this.props.data[1].created_at)); 
       // var Date = this.props.startDate;
        state.properties.reported_incidents = 0; // reported incidents
        for(var tweet2 = 0; tweet2<this.props.data.length;tweet2++){ // loops thru tweet list
            Dte = this.convertDate(JSON.stringify(this.props.data[tweet2].created_at)); 
            var Location_Name = JSON.stringify(this.props.data[tweet2].user.location);
            if( (Location_Name.includes(this.props.search))
            && (Location_Name.includes(state.properties.NAME) || Location_Name.includes(state.properties.STUSPS)) 
            && (this.compareDate(Start,End,Dte)) ){ // checks if the tweet location matches any state name
                state.properties.reported_incidents++;
            }
        }
        const state_Count = state.properties.reported_incidents;
 
        if(state_Count === 0){
            layer.options.fillColor = "white";
        }else if(state_Count < 5){
            layer.options.fillColor = "gray";
        }else if(state_Count < 100){
            layer.options.fillColor = "yellow";
        }else if(state_Count < 500){
            layer.options.fillColor = "orange";
        }else if(state_Count < 1000){
            layer.options.fillColor = "red";
        }else if(state_Count < 5000){
            layer.options.fillColor = "dark red";
        }
        
        layer.bindPopup(`State: ${state_name} <br> Tweets: ${state_Count}`);
        
    }

    //```````````````````````````````````````````````````````````````````````

    OnEachCountry = (country, layer) => { // loops thru every country

        const country_name = country.properties.NAME; // name of country
        var Start = this.convertDate2(JSON.stringify(this.props.startDate)); 
        var End = this.convertDate2(JSON.stringify(this.props.endDate)); 
        var Dte = this.convertDate(JSON.stringify(this.props.data[1].created_at)); 
       // var Date = this.props.startDate
       // if(this.compareDate(Start,End,Dte)){//
         //   Date = "yeet boolin" ;
        //}
        //this.convertDate(JSON.stringify(this.props.data[1].created_at));
        country.properties.reported_incidents = 0; // reported incidents
        for(var tweet2 = 0; tweet2<this.props.data.length;tweet2++){ // loops thru tweet list
            var Location_Name = JSON.stringify(this.props.data[tweet2].user.location);
            Dte = this.convertDate(JSON.stringify(this.props.data[tweet2].created_at)); 
            //
            if(    (Location_Name.includes(this.props.search))
                    && 
                    (Location_Name.includes(country.properties.NAME) || Location_Name.includes(country.properties.ADM0_A3))
                    && 
                    (this.compareDate(Start,End,Dte)) )
            { // checks if the tweet location matches any country name and date
                country.properties.reported_incidents++;
            }
        }
        if(country.properties.NAME === "Norway"){
            country.properties.reported_incidents = 0 ;
        }
        const country_Count = country.properties.reported_incidents;

        if(country_Count === 0){
            layer.options.fillColor = "white";
        }else if(country_Count < 5){
            layer.options.fillColor = "gray";
        }else if(country_Count < 100){
            layer.options.fillColor = "yellow";
        }else if(country_Count < 500){
            layer.options.fillColor = "orange";
        }else if(country_Count < 1000){
            layer.options.fillColor = "red";
        }else if(country_Count < 5000){
            layer.options.fillColor = "dark red";
        }
        
        layer.bindPopup(`Country: ${country_name} <br> Tweets: ${country_Count} `);
        
    }
    
    //```````````````````````````````````````````````````````````````````````
    //```````````````````````````````````````````````````````````````````````
    render() { 
        return (
        <div>
            <Map 
                style={{height:"50vh", width: "50vw",}}
                zoom={JSON.stringify(this.props.startDate).substring(1,2)}
                maxBounds={[[-60,-180], [80,220]]}
                center= {[40,40]}
                minZoom={2}
                ref={(ref) => { this.map = ref; }}

               
            >
            
                <GeoJSON
                    key={JSON.stringify(this.props.startDate).concat(this.props.endDate).concat(this.props.search).concat(JSON.stringify(Math.random(5000000)))}
                    style = {this.countryStyle}
                    data = {countries.features}
                    
                    onEachFeature = {this.OnEachCountry}
                    
                ></GeoJSON>
                <GeoJSON
                    key={JSON.stringify(this.props.startDate).concat(this.props.endDate).concat(this.props.search)}
                    style = {this.stateStyle}
                    data = {states.features}
                    onEachFeature = {this.OnEachState}
                ></GeoJSON>

            </Map>
            <br></br>

            <br></br>
        </div>  );
    }
}
 
export default MyMap;