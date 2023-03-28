import './NewAccountSelection.Modules.css';
import { Link, useLocation } from "react-router-dom";

function NewAccountSelection() {
  return (
    <div className="NewAccountSelection">
      <header>
        <h1>
          Why are you using Homie?
        </h1>
      </header>
      <div className="Options">
        <Link to="/createAccount">
          <div>I'm Selling</div>
        </Link>
        <Link to="/createAccount">
          <div>I'm Buying</div>
        </Link>
      </div>
    </div>
  );
}

export default NewAccountSelection;
