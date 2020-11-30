import React from 'react';
import img from "./../images/legside.jpg"


const Legend = () => {
    return ( 
    <div>
        <center><img src={img} alt = "White: Nothing, Gray: Very Few, Yellow: Few, Orange:Some, Red: A Bunch, Dark Red: A Ton" /></center>
        
    </div> );
}
 
export default Legend;