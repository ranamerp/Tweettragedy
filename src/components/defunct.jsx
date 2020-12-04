import React, {useState, useEffect} from 'react';
import Loading from './Loading';
import MyMap from './MyMap';
import Legend from './Legend';
import TimeSeries from './TimeSeries'
import Load_Countries from '../tasks/Load_Countries';

const Main = () => {
    const [countries, setCountries] = useState([]);

    const load = () => {
        const Load_Countries_Object = new Load_Countries();
        Load_Countries_Object.load(setCountries);

    };



    useEffect(load,[]); // loads stuff


    return ( 
        <div>

            {countries.length === 0 ? <Loading/> :
            <div> 
                <MyMap/> 
                <Legend/> 
                <TimeSeries/>
            </div>
            }




        </div>
     ); // This is where the components of the website are stored
}
 
export default Main;