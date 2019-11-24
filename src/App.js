import React from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import List from './components/List';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />


        <Card renderHeader={() => <h3>Card Camponent</h3>}>
          <p>Some interesting text</p>
          <button>Click me</button>
        </Card>

        <List
          data={[...Array(10).keys()]} // {["Fred", "Bob", "Jane"]}
          renderHeader={() => <h3>Names List Component</h3>}
          renderItem={item => (
            <div>
              <span style={{ marginRight: "10px" }}>{item}</span>
              <button>Click me</button>
            </div>
          )}
        />

      </header>
    </div>
  );
}

export default App;
