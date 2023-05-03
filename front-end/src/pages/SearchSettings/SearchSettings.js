import { useScrollTrigger, FormGroup, FormControl, Input, Typography, FormLabel, Slider, Box, TextField } from '@mui/material';
import { useState, useEffect } from "react"
import './SearchSettings.css';
import axios from "axios";
import authenticate from "../../auth/Authenticate";

const SliderOption = ({name="Option", min=0, max=10, step=1, useStateVariables}) => {
  const key = name.split(" ").join("");
  const [minimum, setMinimum] = useState(useStateVariables[key] ? useStateVariables[key].min : min);
  const [maximum, setMaximum] = useState(useStateVariables[key] ? useStateVariables[key].max : max);

  useEffect(() => {
    setMinimum(useStateVariables[key] ? useStateVariables[key].min : min)
    setMaximum(useStateVariables[key] ? useStateVariables[key].max : max)
  }, [useStateVariables])

  useEffect(() => {
    useStateVariables[key] = {min: minimum, max: maximum};
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

const GridOption = ({name="Option", options, useStateVariables}) => {  //options is an array of strings
  const optionComponents = [];
  options.forEach(optionName => {optionComponents.push(<Checkbox option={optionName} key={optionName} parent={name} useStateVariables={useStateVariables}/>);});

  return (
    <Box className="Grid Option">
      <FormGroup className="Option">
        <FormLabel className="Option-name">{name}</FormLabel>
        <div className="Grid-form">{optionComponents}</div>
      </FormGroup>
    </Box>
  );
}

const Checkbox = ({option, k, parent, useStateVariables}) => {
  const key = option//.split(" ").join("");
  const pkey = parent.split(" ").join("")
  if(!useStateVariables[pkey])
    useStateVariables[pkey] = {}
  const [checked, setChecked] = useState(useStateVariables[pkey] ? useStateVariables[pkey][key] : true);

  useEffect(() => {
    if(useStateVariables[pkey])
      setChecked(useStateVariables[pkey][key])
  }, [useStateVariables])

  const handleChange = () => {
    useStateVariables[pkey][key] = !checked
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

const Option = ({name="Option", type="text", unit="", minValue=null, maxValue=null ,def, useStateVariables}) => {
  const key = name//.split(" ").join("");
  const [option, changeOption] = useState(useStateVariables[key] ? useStateVariables[key] : def)

  useStateVariables[key] = option

  useEffect(() => {
    changeOption(useStateVariables[key] ? useStateVariables[key] : def)
  }, [useStateVariables])

  useEffect(() => {
    useStateVariables[key] = option
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

// const PlacesApiOption = () => {
//   return(
//     <Helmet>
//       <script src={"https://maps.googleapis.com/maps/api/js?key="+MAPS_API_KEY+"&libraries=places"}
//       crossOrigin="anonymous"
//       async></script>
//     </Helmet>
//   )
// }

// // put all possible image urls in this list
// const images = ['1.jpg', '2.jpg', '3.jpg', 'cat.jpg', 'dog.jpg'];

// $(document).ready(function () {
//   let current = 0;
//   $(".image").on("click", function () {
//     $(".image").css({ 'background-image': `url(${images[++current % images.length]})` });
//   });
// });

function SearchSettings() {  
  const [useStateVariables, setStateVariables] = useState({});
  const jwtToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [accountInfo, setAccountInfo] = useState([]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    authenticate(setIsLoggedIn, setAccountInfo, jwtToken);
    axios.get(`${environment.backendBaseUrl}/get-search-settings`, {headers: {Authorization: `JWT ${jwtToken}`}})
    .then(function (response) {
      setStateVariables(response.data);
      console.log("got data:");
      console.log(response.data);
      setOptions([<Option name="Search Location" default="" useStateVariables={response.data}/>,
      <Option name="Distance from Location" type="number" unit="miles" minValue={0} def={5} useStateVariables={response.data}/>,
      <SliderOption name="Price Range" min={10000} max={1000000} step={100} useStateVariables={response.data}/>,
      <GridOption name="Property Types" options={Object.keys(response.data.PropertyTypes)} useStateVariables={response.data}/>,
      <GridOption name="Amenities" options={Object.keys(response.data.Amenities)} useStateVariables={response.data}/>,
      <SliderOption name="Number of Beds" useStateVariables={response.data}/>,
      <SliderOption name="Number of Bathrooms" useStateVariables={response.data}/>])
    })
    .catch(function (error) {
      console.log(error);
      setOptions([<Option name="Search Location" default="" useStateVariables={useStateVariables}/>,
      <Option name="Distance from Location" type="number" unit="miles" minValue={0} def={5} useStateVariables={useStateVariables}/>,
      <SliderOption name="Price Range" min={0} max={1000} step={100} useStateVariables={useStateVariables}/>,
      <GridOption name="Property Types" options={["test1", "test2", "test3"]} useStateVariables={useStateVariables}/>,
      <GridOption name="Amenities" options={["test1", "test2", "test3"]} useStateVariables={useStateVariables}/>,
      <SliderOption name="Number of Rooms" min={1} useStateVariables={useStateVariables}/>,
      <SliderOption name="Number of Beds" useStateVariables={useStateVariables}/>,
      <SliderOption name="Number of Bathrooms" useStateVariables={useStateVariables}/>])
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

    console.log(useStateVariables)

    axios
    .post(`${environment.backendBaseUrl}/post-user-filter`, useStateVariables, {headers: {Authorization: `JWT ${jwtToken}`}})
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