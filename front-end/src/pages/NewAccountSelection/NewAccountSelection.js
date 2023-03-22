import './NewAccountSelection.css';

function NewAccountSelection() {
  return (
    <div className="NewAccountSelection">
      <header>
        <p>
          Why are you using Homie?
        </p>
      </header>
      <div className="Options">
        <a href="https://reactjs.org">
          <div>I'm Selling</div>
        </a>
        <a href="https://reactjs.org">
          <div>I'm Buying</div>
        </a>
      </div>
    </div>
  );
}

export default NewAccountSelection;
