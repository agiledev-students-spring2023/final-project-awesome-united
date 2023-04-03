import { useScrollTrigger } from '@mui/material';
import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
// import MAPS_API_KEY from "../../config.js"
import './SearchSettings.css';

const useStateVariables = {}

const SliderOption = ({name="Option", min=0, max=10, step=1}) => {
  const [minimum, setMinimum] = useState(min);
  const [maximum, setMaximum] = useState(max);

  useStateVariables[name.split(" ").join("")] = {name: name, value: {min:minimum, max:maximum}}

  const handleChange = (setter, val) => {
    if(val == "")
      val = 0;
    else if(val > max)
      val = max;
    else if(val < min)
      val = min;

    if (setter == setMinimum){
      if(val > maximum)
        setMaximum(val);
    }
    else{
      if(val < minimum)
        setMinimum(val);
    }
    setter(val);
  }

  return (
    <div className="Option">
      <p className="Option-name">{name}</p>
      <input type="number" className="Input Range Min" min={min} max={max} step={step} 
      value={minimum} onChange={e => handleChange(setMinimum, e.target.value)}></input>
      <span className="Range-dash">-</span>
      <input type="number" className="Input Range Max" min={min} max={max} step={step}
      value={maximum} onChange={e => handleChange(setMaximum, e.target.value)}></input>
    </div>
  );
}

const GridOption = ({name="Option", options}) => {  //options is an array of strings
  const optionComponents = [];
  options.forEach(optionName => {optionComponents.push(<Checkbox option={optionName} key={optionName} parent={name}/>);});

  // useStateVariables.push((() => {
  //   const values = [];
  //   optionComponents.forEach(
  //     option => {
  //       values.push(option.getUseState())
  //     })
  //   return values
  // })())

  return (
    <div className="Option">
      <p className="Option-name">{name}</p>
      <div className="Grid-form">{optionComponents}</div>
    </div>
  );
}

const Checkbox = ({option, key, parent}) => {
  const [checked, setChecked] = useState(true);

  useStateVariables[option.split(" ").join("")] = {name:option, value:checked, parent:parent}

  const handleChange = () => {
    console.log(option + " is " + !checked);
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

const Option = ({name="Option", type="text", unit="", def}) => {
  const [option, changeOption] = useState(def);

  useStateVariables[name.split(" ").join("")] = {name:name, value:option}

  return(
    <div className="Option">
      <p className="Option-name">{name}</p>
      <input className="Input" type={type} id={name.replace(/\s/g, '')} unit={unit} 
      onChange={e => changeOption(e.target.value)}></input>
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
  const options = [];
  options.push(<SliderOption name="Price Range" min={0} max={1000}/>)
  options.push(<GridOption name="Types of Home" options={["Bungalow", "House", "Shack", "Apartment", "Mansion", "Cabin"]}/>)
  options.push(<GridOption name="Accommodations" options={["Kitchen", "Yard", "Laundry", "Balcony"]}/>)
  options.push(<Option name="Search Location" default=""/>)
  options.push(<Option name="Distance from Location" type="number" unit="miles" def={5}/>)
  options.push(<SliderOption name="Number of Beds"/>)
  options.push(<SliderOption name="Number of Bathrooms"/>)

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