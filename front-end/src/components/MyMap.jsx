import React, { Component} from 'react';
import countries from './../data/countries.json';
import counties from './../data/counties.json';
import {Map, GeoJSON} from "react-leaflet"
import tweet_loc from '../data/tweet_loc.json'
import "leaflet/dist/leaflet.css";
import "./MyMap.css";


class MyMap extends Component {
    state = {};
    
    countyStyle = {
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

    


    OnEachCounty = (county, layer) => {
        const county_name = county.properties.COUNTY_STATE_CODE;
        county.properties.reported_incidents = 0;
        //for(var tweet = 0; tweet<tweet_loc.length;tweet++){
        //   if(tweet_loc[tweet].user.location.includes(county)){
        //       county.properties.reported_incidents++;
        //   }
        //}
        const county_reported_incidents = county.properties.reported_incidents;
        layer.bindPopup(`${county_name} \n ${county_reported_incidents}`);
    }
    OnEachCountry = (country, layer) => { // loops thru every country
        const country_name = country.properties.NAME; // name of country
        country.properties.reported_incidents = 0; // reported incidents
        for(var tweet2 = 0; tweet2<tweet_loc.length;tweet2++){ // loops thru tweet list
            var No_Object_Location_Name = JSON.stringify(tweet_loc[tweet2].user.location);
            if(No_Object_Location_Name.includes(country.properties.NAME)){ // checks if the tweet location matches any country name
                country.properties.reported_incidents++;
            }
        }
        
        const country_reported_incidents = country.properties.reported_incidents;
        if(country.properties.reported_incidents != 0){
            layer.options.fillColor = "red";
        }
        
        layer.bindPopup(`${country_name} \n ${country_reported_incidents}`);
        
    }
    render() { 
        return (
        <div>
            <h1 style= {{textAlign:"center"}}>My Map</h1>
            <Map 
                style={{height:"40vh"}}
                zoom={2}
                center= {[20,100]}
            >
                <GeoJSON
                    style = {this.countryStyle}
                    data = {countries.features}
                    onEachFeature = {this.OnEachCountry}
                    
                ></GeoJSON>
                <GeoJSON
                    style = {this.countyStyle}
                    data = {counties.features}
                    onEachFeature = {this.OnEachCounty}
                ></GeoJSON>

            </Map>

            

        </div>  );
    }
}
 
export default MyMap;