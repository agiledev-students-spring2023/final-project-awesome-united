import { useState, useEffect } from "react"
import axios from "axios"
import "./SearchBar.css"

const SearchBar = props => {
  // create state variables and their setters so everytime thier value changes, the component updates them in the browser
  const [name, setName] = useState("")
  const [breed, setBreed] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // this function runs once when the component first loads and again whenever the value of the breed variable changes
    // check your browser's Developer Tools -> Javascript Console to see this printed when the component first loads and anytime the breed value changes
    console.log("hello world from within PuppyForm.js!")
  }, [breed]) // the variable name in the array here is what causes this function to re-run any time the value of breed changes

  // a function that will be run whenever the user submits the form
  const handleSubmit = e => {
    e.preventDefault() // prevent the default browser form submission stuff

    // send the data of the new puppy to a server
    // this server doesn't exist, so we will see an error in the console
    // axios' get() and post() methods return a promise, so we can use our javascript Promise or async/await expertise here to deal with the resolution or rejection of the request
    axios
      .post("https://someserversomehwere.com/puppy/save", {
        name: name,
        breed: breed,
      })
      .then(response => {
        // success
        console.log(`Received server response: ${response.data}`)
      })
      .catch(err => {
        // failure
        console.log(`Received server error: ${err}`)
        setError(
          "This form doesn't actually work, sorry.  There is no back-end for this example app in which to save the data. Pop open your web browser's Javascript Console to see the error trying to connect to a non-existent back-end."
        )
      })
  }

  return (
    <>
      <form className="Search-bar" onSubmit={handleSubmit}>
        {/* conditional logic within JSX, using type coercion */}
        <div class="formField">
          <br /> {/* a line break to separate the label from the input */}
          <input
            id="name_field"
            type="text"
            placeholder="search"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        {error && (
          <div>
            <p className="SearchBar-feedback">{error}</p>
          </div>
        )}
        <div>
          <input type="submit" value="Save!" />
        </div>
      </form>
    </>
  )
}

export default SearchBar