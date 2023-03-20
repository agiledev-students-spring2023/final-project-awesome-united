import './SearchSettings.css';

const SliderOption = ({name="Option", min=0, max=10, step=1}) => {
  return (
    <div className="Option">
      <p className="Option-name">{name}</p>
      <input type="number" className="Range Min" min={min} max={max} step={step} value={min}></input>
      <span className="Range-dash">-</span>
      <input type="number" className="Range Max" min={min} max={max} step={step} value={max}></input>
    </div>
  );
}

const GridOption = ({name="Option", options}) => {  //options is an array of strings
  const optionComponents = [];
  options.forEach(option => {
    let varName = (str => {       //convert name to camelcase
      return str.toString().replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      }).replace(/\s+/g, '');
    })({option});   //pass option into anonymous camelcase function
    
    optionComponents.push(
      <div className="Grid-option">
        <input type="checkbox" 
          id={varName}                   
          name={option}
          value={varName}>
        </input>
        <label for={varName}>{option}</label>
      </div>
    );
  });

  return (
    <div className="Option">
      <p className="Option-name">{name}</p>
      <form>{optionComponents}</form>
    </div>
  );
}

const Option = ({name="Option", type="text"}) => {
  return(
    <div className="Option">
      <p className="Option-name">{name}</p>
      <input type={type} id={name.replace(/\s/g, '')}></input>
    </div>
  );
}

function SearchSettings() {
  return (
    <div className="SearchSettings">
      <header>
        <p>
          Search Settings
        </p>
      </header>
      <div className="Options">
        <SliderOption name="Price Range" min={0} max={1000}/>
        <GridOption name="Types of Home" options={["Bungalow", "House", "Shack"]}/>
        <GridOption name="Accommodations" options={["Kitchen", "Yard", "Laundry", "Balcony"]}/>
        <Option name="Search Location"/>
        <Option name="Distance from Location" type="number"/>
        <SliderOption name="Number of Beds"/>
        <SliderOption name="Number of Bathrooms"/>
        <br/><br/>
        <input type="submit" value="Save"></input>
      </div>
    </div>
  );
}

export default SearchSettings;