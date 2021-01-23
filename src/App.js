import logo from './logo.svg';
import './App.css';

import Canvas from './components/Canvas.js'

import RestController from './components/RestController.js'

function spireOneLeft() {
  (async () => {
    const rawResponse = await fetch('/api/spireOne/left', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({a: 1, b: 'Textual content'})
    });
    const content = await rawResponse.json();
  
    console.log(content);
  })();
}


function App() {
  return (
    <div className="App">
      <Canvas/>
      {/* <header className="App-header">
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
      </header> */}
      <button type="button" onClick="spireOneLeft">Click Me</button>
      <RestController/>
    </div>
  );
}

export default App;
