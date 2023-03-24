import { useState, useEffect } from "react"
import axios from "axios"
import "./SearchBar.css"

const SearchBar = props => {
  // create state variables and their setters so everytime thier value changes, the component updates them in the browser
  const [query, setQuery] = useState("")
  const [error, setError] = useState("")

  // a function that will be run whenever the user submits the form
  const handleSubmit = e => {
    e.preventDefault() // prevent the default browser form submission stuff

    // send the data of the query to backend/server
    // note the user can query for the profile name OR the content in a chat. so send a generic query
    // and let the backend determine if its name query or chat-content query or both
    // this backend/server doesn't exist, so we will see an error in the console
    // axios' get() and post() methods return a promise, so we can use our javascript Promise or async/await expertise here to deal with the resolution or rejection of the request
    axios
      .post("https://someserversomehwere.com/puppy/save", {
        query: query,
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
      <form onSubmit={handleSubmit}>
        {/* conditional logic within JSX, using type coercion */}
        <div class="formField">
          <br /> {/* a line break to separate the label from the input */}
          <input
            id="name_field"
            type="text"
            placeholder="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        {error && (
          <div>
            <p className="SearchBar-feedback">{error}</p>
          </div>
        )}
        <div>
          <input type="submit" value="Search!" />
        </div>
      </form>
    </>
  )
}

export default SearchBar