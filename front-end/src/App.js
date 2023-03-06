import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import { slide as Menu } from "react-burger-menu"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/animals" element={<AnimalsList />} />
            <Route path="/animals/:id" element={<Animal />} />
            <Link to="/animals">See all animals</Link> {/*the preferred way to  link*/}
          </Routes>
          <Footer />
        </Router>


        {/*
        useEffect(() => {
          async function fetchData() {
            const result = await axios {
              //retrieve mock data about animals
              "https://my.api.mockaroo.com/animals.json?key=d9ddfc40"
            }
          }
          setData(result.data);
        })
        fetchData()
        //create loop to make an object for every instance
        data.map(item=> (
          console.log(item);
        ))
        
      */}
      </header>
    </div>
  );
}

export default App;
