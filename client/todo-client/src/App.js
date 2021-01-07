import logo from "./logo.svg";
import "./App.css";
import fetch from "node-fetch";

function App() {
  let response = fetch("http://localhost:4000")
    .then(res => res.text())
    .then(text => {
      console.log(text);
      return text;
    })
    .catch(e => console.error(e));

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
          ToDo
        </a>
      </header>
    </div>
  );
}

export default App;
