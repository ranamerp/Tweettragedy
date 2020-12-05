module.exports = `
<!-- This has hardcoded values that we'll populate with the JSON file -->
<!-- I'll look more into ChartJS for styling the graph -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">   
        <meta name="author" content="CS-435">     
        <link rel="stylesheet" type="text/css" href="styleChartJS.css">
        <!-- Import ChartJS -->
        <script src="/assets/js/Chart.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
    </head>
        <body>
            <h1>Time Series Graph</h1>
                <div>
                    <button onclick="fillGraph();">Submit</button>
                    <br>
                </div>
                <div>
                    <canvas id="canvas" width="750" height="300">
                        JavaScript is required for this application
                    </canvas>
                </div>
                    <script>
                            //Create the canvas with round border
                            canvas = document.getElementById("canvas");
                            canvas.style.borderRadius = "25px";
                            canvas.style.border = "thin solid white";
                            var context = canvas.getContext("2d");
                            //Makes canvas black
                            context.fillStyle = "black";
                            context.fillRect(0, 0, canvas.width, canvas.height);

                            context.fillStyle = "white";
                            context.font = "15px Apercu";
                            context.fillText(" Click the Submit Button ", 300, 100);

                        //Function that creates the time series graph
                        function fillGraph() {
                            //Draw a canvas for graph
                            canvas = document.getElementById("canvas");
                            canvas.style.borderRadius = "25px";
                            canvas.style.border = "thin solid white";
                            context.fillStyle = "white";
                            //Needed to show the graph 
                            var ctx = canvas.getContext('2d');
              
                            
                            //Hardcoded values that will be changed to stream from a linked JSON file
                            var jsonfile = {
                            "jsonarray": [{
                                "month": "Jan",
                                "numberOfTweets": 0
                            }, {
                                "month": "Feb",
                                "numberOfTweets": 14
                            }, {
                                "month": "Mar",
                                "numberOfTweets": 5
                            }, {
                                "month": "Apr",
                                "numberOfTweets": 8
                            }, {
                                "month": "May",
                                "numberOfTweets": 10
                            }, {
                                "month": "Jun",
                                "numberOfTweets": 7
                            }, {
                                "month": "July",
                                "numberOfTweets": 15
                            }, {
                                "month": "Aug",
                                "numberOfTweets": 10 
                            }, {
                                "month": "Sep",
                                "numberOfTweets": 18
                            }, {
                                "month": "Oct",
                                "numberOfTweets": 17
                            }, {
                                "month": "Nov",
                                "numberOfTweets": 16
                            }, {
                                "month": "Dec",
                                "numberOfTweets": 15
                                
                            }]
                            };

                            //Return functions for JSON values
                            var labels = jsonfile.jsonarray.map(function(e) {
                            return e.month;
                            });
                            var data = jsonfile.jsonarray.map(function(e) {
                            return e.numberOfTweets;
                            });;

                            //Set label and color for graph
                            var config = {
                                type: 'line',
                                data: {
                                    labels: labels,
                                    datasets: [{
                                        label: 'Number of Tweets',
                                        data: data,
                                        backgroundColor: 'rgb(180, 180, 180)'
                                    }]
                                }
                            };
                            var chart = new Chart(ctx, config);
                            }
                    </script>
        </body>
</html>


`