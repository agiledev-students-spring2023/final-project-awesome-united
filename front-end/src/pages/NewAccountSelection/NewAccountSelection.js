import './NewAccountSelection.css';
import { Link, useLocation } from "react-router-dom";
import axios from "axios"

function NewAccountSelection() {
  return (
    <div className="NewAccountSelection">
      <header>
        <h1>
          Why are you using Homie?
        </h1>
      </header>
      <div className="Options">
        <Link className="NewAccountSelectionLink" to="/createAccount">
          <div>I'm Selling</div>
        </Link>
        <Link className="NewAccountSelectionLink" to="/searchSettings">
          <div>I'm Buying</div>
        </Link>
      </div>
    </div>
  );
}

export default NewAccountSelection;
