import {features} from '../data/countries.json';

class Load_Countries {

load = (setState) =>
    setState(features);

}
export default Load_Countries;