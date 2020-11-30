import React, { Component } from 'react';
import { Line } from 'react-chartjs-2'


class TimeSeries extends Component {
    
    filtered_data = []

   chart_data = {
    labels: [],
    datasets: [
      {
        label: "Tweets",
        data: [],
        fill: this.props.startDate === this.props.startDate,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
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

    dataFieldMaker(){
        var Start = this.convertDate2(JSON.stringify(this.props.startDate)); // Nav Bar's Search Date
        var End = this.convertDate2(JSON.stringify(this.props.endDate)); // Nav Bar's End Date
        var Tweet_Date = this.convertDate(JSON.stringify(this.props.data[0].created_at)) // First Tweet's Date
        var Date = Start // Set up for while loop, so the date will loop from start to end and add the array to the state
        var modified_array = []
        modified_array.push(Start) //adds date to our list of dates we will be using for charting
        while( ((Date.substring(0,2) !== End.substring(0,2)) && (Date.substring(6) === End.substring(6)))
        ^( ( parseInt(Date.substring(6)) < parseInt(End.substring(6) )) )
        ){ // checks if the date's year hits the end's year or if theyre on the same year if the month hits
            
            if(parseInt(Date.substring(0,2)) < 12){ // Is it the last month of the year, if so were updating the year and reseting the month
                Date = JSON.stringify(parseInt(Date.substring(0,2))+1).concat(Date.substring(2)) // Makes the date bigger by a month compared to the last date given, default being the start date
                if(Date === End){ // eyoo if we got the same date as the End date we don't have to count it twice
                    break;
                }
                modified_array.push(Date) // adds date to our list of dates we will be using for charting
            }else{
                Date = "01".concat(Date.substring(2,6)).concat(JSON.stringify(parseInt(Date.substring(6))+1)) // checks if we crossed a year, if we did, the next date starts in the 1st month and a new year
                if(Date === End){ // no dojble count
                    break;
                }
                modified_array.push(Date) // adds date to our list of dates we will be using for charting
            }
        }
        modified_array.push(End)
        var object_array = []
        
        for(var i =0; i< modified_array.length;i++){
            object_array.push({
                date:modified_array[i],
                count: 0
            })
            this.filtered_data = object_array
            
        }
        
        
        
        //````````````````````````````````````````````````````````````
        // Dates done above, mapping tweets done below
        //````````````````````````````````````````````````````````````

        for(var dates = 0; dates < this.filtered_data.length; dates++){
            this.filtered_data[dates].count = 0
        }
        for(var tweets = 0; tweets<this.props.data.length;tweets++){ // loops through all the given tweets
            Tweet_Date = this.convertDate(JSON.stringify(this.props.data[tweets].created_at)) // turns the tweet's date into a comparable format 
            
            for(dates = 0; dates < this.filtered_data.length; dates++){ // loops thru all of the dates we created as points in the line graph
                if((     (parseInt(Tweet_Date.substring(6)) === parseInt(this.filtered_data[dates].date.substring(6))) &&  // year
                        (parseInt(Tweet_Date.substring(0,2)) === parseInt(this.filtered_data[dates].date.substring(0,2))) && // month
                        (parseInt(Tweet_Date.substring(3,5)) < parseInt(this.filtered_data[dates].date.substring(3,5))) // checks if its in the same month but before it so it gets counted
                    )^(
                        ((parseInt(Tweet_Date.substring(6)) === parseInt(this.filtered_data[dates].date.substring(6))) && // or the month before it but after the last counted point in the last month
                        (parseInt(Tweet_Date.substring(0,2)) === (parseInt(this.filtered_data[dates].date.substring(0,2))-1)   ) && 
                        (parseInt(Tweet_Date.substring(3,5)) > parseInt(this.filtered_data[dates].date.substring(3,5))))
                    )){
                    this.filtered_data[dates].count = this.filtered_data[dates].count+1
                }
            }
            this.filtered_data[this.filtered_data.length-1].count =0
            this.filtered_data[0].count =0

        if((     (parseInt(Tweet_Date.substring(6)) === parseInt(this.filtered_data[this.filtered_data.length-1].date.substring(6))) &&  // year
            (parseInt(Tweet_Date.substring(0,2)) === parseInt(this.filtered_data[this.filtered_data.length-1].date.substring(0,2))) && // month
            (parseInt(Tweet_Date.substring(3,5)) < parseInt(this.filtered_data[this.filtered_data.length-1].date.substring(3,5))) // checks if its in the same month but before it so it gets counted
        )^(
            ((parseInt(Tweet_Date.substring(6)) === parseInt(this.filtered_data[this.filtered_data.length-1].date.substring(6))) && // or the month before it but after the last counted point in the last month
            (parseInt(Tweet_Date.substring(0,2)) === (parseInt(this.filtered_data[this.filtered_data.length-1].date.substring(0,2))-1)   ) && 
            (parseInt(Tweet_Date.substring(3,5)) > parseInt(this.filtered_data[this.filtered_data.length-1].date.substring(3,5))))
        )){
        this.filtered_data[this.filtered_data.length-1].count = this.filtered_data[this.filtered_data.length-1].count+1
        }

        if((     (parseInt(Tweet_Date.substring(6)) === parseInt(this.filtered_data[0].date.substring(6))) &&  // year
            (parseInt(Tweet_Date.substring(0,2)) === parseInt(this.filtered_data[0].date.substring(0,2))) && // month
            (parseInt(Tweet_Date.substring(3,5)) < parseInt(this.filtered_data[0].date.substring(3,5))) // checks if its in the same month but before it so it gets counted
        )^(
            ((parseInt(Tweet_Date.substring(6)) === parseInt(this.filtered_data[0].date.substring(6))) && // or the month before it but after the last counted point in the last month
            (parseInt(Tweet_Date.substring(0,2)) === (parseInt(this.filtered_data[0].date.substring(0,2))-1)   ) && 
            (parseInt(Tweet_Date.substring(3,5)) > parseInt(this.filtered_data[0].date.substring(3,5))))
        )){
            this.filtered_data[0].count = this.filtered_data[0].count+1
        }


    }
        if(Start == End){
            this.filtered_data[this.filtered_data.length-1].count =0
            this.filtered_data[0].count =0
        }
        var temp_count = []
        var temp_date = []
        for(var quantity = 0; quantity < this.filtered_data.length;quantity++){
            temp_count.push(parseInt(this.filtered_data[quantity].count))
            temp_date.push(this.filtered_data[quantity].date)
        }
        this.chart_data.labels = temp_date 
        this.chart_data.datasets[0].data = temp_count
        
    }


    render() { 
        return ( 
            <div style={{height:"50vh", width: "50vw",}}>

                <br></br>
                {this.dataFieldMaker()}
                <Line
                data = {this.chart_data}
                />          

            </div>
         );
    }
}
 
export default TimeSeries;