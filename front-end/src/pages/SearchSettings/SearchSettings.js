import { useScrollTrigger } from '@mui/material';
import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
// import MAPS_API_KEY from "../../config.js"
import './SearchSettings.css';
import axios from "axios"

const SliderOption = ({name="Option", min=0, max=10, step=1, useStateVariables}) => {
  const key = name.split(" ").join("");
  const [minimum, setMinimum] = useState(useStateVariables[key] ? useStateVariables[key].value.min : min);
  const [maximum, setMaximum] = useState(useStateVariables[key] ? useStateVariables[key].value.max : max);

  useEffect(() => {
    setMinimum(useStateVariables[key] ? useStateVariables[key].value.min : min)
    setMaximum(useStateVariables[key] ? useStateVariables[key].value.max : max)
  }, [useStateVariables])

  const handleChange = (setter, val) => {    
    if(val == "")
      val = 0;
    else if(val > max)
      val = max;
    else if(val < min)
      val = min;

    setter(val)
    if (setter == "min"){
      useStateVariables[key] = {name: name, value: {min:val, max:maximum}}
      setMinimum(val);
      if(val > maximum)
        setMaximum(val);
    }
    else{
      useStateVariables[key] = {name: name, value: {min:minimum, max:val}}
      setMaximum(val);
      if(val < minimum)
        setMinimum(val);
    }
  }

  return (
    <div className="Option">
      <p className="Option-name">{name}</p>
      <input type="number" className="Input Range Min" min={min} max={max} step={step} 
      value={minimum} onChange={e => handleChange("min", e.target.value)}></input>
      <span className="Range-dash">-</span>
      <input type="number" className="Input Range Max" min={min} max={max} step={step}
      value={maximum} onChange={e => handleChange("max", e.target.value)}></input>
    </div>
  );
}

const GridOption = ({name="Option", options, useStateVariables}) => {  //options is an array of strings
  const optionComponents = [];
  options.forEach(optionName => {optionComponents.push(<Checkbox option={optionName} key={optionName} parent={name} useStateVariables={useStateVariables}/>);});

  return (
    <div className="Option">
      <p className="Option-name">{name}</p>
      <div className="Grid-form">{optionComponents}</div>
    </div>
  );
}

const Checkbox = ({option, k, parent, useStateVariables}) => {
  const key = option.split(" ").join("");
  const [checked, setChecked] = useState(useStateVariables[key] ? useStateVariables[key].value : true);

  useEffect(() => {
    console.log("changed checkbox");
    setChecked(useStateVariables[key] ? useStateVariables[key].value : checked)
  }, [useStateVariables])

  const handleChange = () => {
    console.log(option + " is " + !checked);
    useStateVariables[key] = {name:option, value:!checked, parent:parent}
    setChecked(!checked);
  }

  return (
      <div className="Grid-option">
        <input type="checkbox" className="Input"
          id={(str => {       //convert name to camelcase
            return str.toString().replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
              return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
          })({option})}   //pass option into anonymous camelcase function
          name={option}
          value={checked}
          onChange={handleChange}>
        </input>
        <label>{option}</label>
      </div>
  );
}

const Option = ({name="Option", type="text", unit="", def, useStateVariables}) => {
  const key = name.split(" ").join("");
  const [option, changeOption] = useState(useStateVariables[key] ? useStateVariables[key].value : def);

  useStateVariables[key] = {name:name, value:option}

  useEffect(() => {
    changeOption(useStateVariables[key] ? useStateVariables[key].value : def)
  }, [useStateVariables])

  const handleChange = (val) => {
    changeOption(val);
    useStateVariables[key] = {name:name, value:val}
  }

  return(
    <div className="Option">
      <p className="Option-name">{name}</p>
      <input className="Input" type={type} id={name.replace(/\s/g, '')} unit={unit} 
      onChange={e => handleChange(e.target.value)}></input>
      <span> {unit}</span>
    </div>
  );
}

// const PlacesApiOption = () => {
//   return(
//     <Helmet>
//       <script src={"https://maps.googleapis.com/maps/api/js?key="+MAPS_API_KEY+"&libraries=places"}
//       crossOrigin="anonymous"
//       async></script>
//     </Helmet>
//   )
// }

function SearchSettings() {  
  const [useStateVariables, setStateVariables] = useState({});

  useEffect(() => {
    axios.get('/get-search-settings')
    .then(function (response) {
      // handle success
      setStateVariables(response.data);
      console.log("got data:");
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }, [])

  const options = [];
  options.push(<SliderOption name="Price Range" min={0} max={1000} useStateVariables={useStateVariables}/>)
  options.push(<GridOption name="Types of Home" options={["Bungalow", "House", "Shack", "Apartment", "Mansion", "Cabin"]} useStateVariables={useStateVariables}/>)
  options.push(<GridOption name="Accommodations" options={["Kitchen", "Yard", "Laundry", "Balcony"]} useStateVariables={useStateVariables}/>)
  options.push(<Option name="Search Location" default="" useStateVariables={useStateVariables}/>)
  options.push(<Option name="Distance from Location" type="number" unit="miles" def={5} useStateVariables={useStateVariables}/>)
  options.push(<SliderOption name="Number of Beds" useStateVariables={useStateVariables}/>)
  options.push(<SliderOption name="Number of Bathrooms" useStateVariables={useStateVariables}/>)

  const useStates = []

  const getUseState = () => {
    options.forEach(option => {
      useStates.push(option)
    })
    return useStates
  }

  const handleSubmit = e => {
    e.preventDefault()

    console.log(useStateVariables)

    axios
    .post("/post-search-settings", useStateVariables)
    .then(response => {
      // success
      console.log(`Received server response: ${response.data}`)
    })
    .catch(err => {
      // failure
      console.log(`Received server error: ${err}`)
    })
  }

  return (
    <div className="SearchSettings">
      <header>
        <h1>
          Search Settings
        </h1>
      </header>
      <form onSubmit={handleSubmit} className="Options">
        {options}
        <br/><br/>
        <input className="Input" type="submit" value="Save"></input>
      </form>
    </div>
  );
}

export default SearchSettings;