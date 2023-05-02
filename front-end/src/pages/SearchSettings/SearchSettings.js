import { useScrollTrigger, FormGroup, FormControl, Input, Typography, FormLabel, Slider, Box, TextField } from '@mui/material';
import { useState, useEffect } from "react"
import './SearchSettings.css';
import axios from "axios"
import authenticate from "../../auth/Authenticate";

const SliderOption = ({name="Option", min=0, max=10, step=1, accountInfo}) => {
  const key = name.split(" ").join("");
  const [minimum, setMinimum] = useState(accountInfo[key] ? accountInfo[key].min : min);
  const [maximum, setMaximum] = useState(accountInfo[key] ? accountInfo[key].max : max);

  useEffect(() => {
    setMinimum(accountInfo[key] ? accountInfo[key].min : min)
    setMaximum(accountInfo[key] ? accountInfo[key].max : max)
  }, [accountInfo])

  useEffect(() => {
    accountInfo[key] = {min: minimum, max: maximum};
  }, [minimum, maximum])

  const handleChange = (event, newValue) => {
    setMinimum(newValue[0]);
    setMaximum(newValue[1]);
  }

  let marks = new Array(4);

  for(let i = 0; i < 5; i++){
    marks[i] = { value: Math.round((max-min)*i/4), label: Math.round((max-min)*i/4)}
  }

  return (
    <Box className="Option">
      <FormLabel className="Option-name">{name}</FormLabel>
      <Slider
      getAriaLabel = {() => (name)}
      value = {[minimum, maximum]}
      onChange={handleChange}
      step={step}
      min={min}
      max={max}
      marks={marks}
      valueLabelDisplay="auto"/>
    </Box>
  );
}

const GridOption = ({name="Option", options, accountInfo}) => {  //options is an array of strings
  const optionComponents = [];
  options.forEach(optionName => {optionComponents.push(<Checkbox option={optionName} key={optionName} parent={name} accountInfo={accountInfo}/>);});

  return (
    <Box className="Grid Option">
      <FormGroup className="Option">
        <FormLabel className="Option-name">{name}</FormLabel>
        <div className="Grid-form">{optionComponents}</div>
      </FormGroup>
    </Box>
  );
}

const Checkbox = ({option, k, parent, accountInfo}) => {
  const key = option//.split(" ").join("");
  const pkey = parent.split(" ").join("")
  if(!accountInfo[pkey])
    accountInfo[pkey] = {}
  const [checked, setChecked] = useState(accountInfo[pkey] ? accountInfo[pkey][key] : true);

  useEffect(() => {
    if(accountInfo[pkey])
      setChecked(accountInfo[pkey][key])
  }, [accountInfo])

  const handleChange = () => {
    accountInfo[pkey][key] = !checked
    setChecked(!checked)
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

const Option = ({name="Option", type="text", unit="", minValue=null, maxValue=null ,def, accountInfo}) => {
  const key = name//.split(" ").join("");
  const [option, changeOption] = useState(accountInfo[key] ? accountInfo[key] : def)

  accountInfo[key] = option

  useEffect(() => {
    changeOption(accountInfo[key] ? accountInfo[key] : def)
  }, [accountInfo])

  useEffect(() => {
    accountInfo[key] = option
  }, [option])

  // this function is just to  make sure no values are accidentally
  // passed to minValue and maxValue when the object's type is not "number"
  useEffect(() => {
    if (type != "number"){
      minValue = null
      maxValue = null
    }
  }, [])

  return(
    <Box className="Option">
      <FormLabel className="Option-name">{name}</FormLabel>
      <TextField 
        className="Input" 
        value={option}
        type={type}  
        // https://stackoverflow.com/questions/64933296/reactjs-material-ui-textfield-number-max-and-min
        InputProps={{ inputProps: { min: minValue, max: maxValue } }}
        id={name.replace(/\s/g, '')}
        helperText={unit}
        onChange={e => changeOption(e.target.value)}
      />
    </Box>
  );
}

function SearchSettings() {  
  const jwtToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [accountInfo, setAccountInfo] = useState([]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    authenticate(setIsLoggedIn, setAccountInfo, jwtToken);
    if(!isLoggedIn) return;
    console.log(accountInfo);
    axios.get('http://localhost:3001/get-search-settings', {headers: {Authorization: `JWT ${jwtToken}`}})
    .then(function (response) {
      setAccountInfo(response.data);
      console.log("got data:");
      console.log(response.data);
      setOptions([<Option name="Search Location" default="" accountInfo={accountInfo}/>,
      <Option name="Distance from Location" type="number" unit="miles" minValue={0} def={5} accountInfo={accountInfo}/>,
      <SliderOption name="Price Range" min={10000} max={1000000} step={100} accountInfo={accountInfo}/>,
      <GridOption name="Property Types" options={Object.keys(accountInfo.filter.PropertyTypes)} accountInfo={accountInfo}/>,
      <GridOption name="Amenities" options={Object.keys(accountInfo.filter.Amenities)} accountInfo={accountInfo}/>,
      <SliderOption name="Number of Beds" accountInfo={accountInfo}/>,
      <SliderOption name="Number of Bathrooms" accountInfo={accountInfo}/>])
    })
  }, [])

  const useStates = []

  const getUseState = () => {
    options.forEach(option => {
      useStates.push(option)
    })
    return useStates
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(accountInfo);
    axios
    .post("http://localhost:3001/post-user-filter", accountInfo, {headers: {Authorization: `JWT ${jwtToken}`}})
    .then(response => {
      console.log(`Received server response: ${response.data}`)
    })
    .catch(err => {
      console.log(`Received server error: ${err}`)
    })
  }

  return (
    <div className="SearchSettings">
      <header>
        <Typography variant="h4">
          Search Settings
        </Typography>
      </header>
        <form onSubmit={handleSubmit}>
          <FormControl className="Options">
            {options}
            <br/><br/>
            <Input className="Input" type="submit" value="Save"></Input>
            </FormControl>
        </form>
    </div>
  );
}

export default SearchSettings;