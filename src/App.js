import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import logo from './logo.svg';
import './App.css';

// components
//import ItemList from './components/ItemList';
import ItemsList from './components/ItemsList';
//import List from './components/List';
// // apollo client setup
export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const testFetch = () => new Promise(resolve => fetch('http://localhost:4000/graphql' + '?query={item(id:"10"){text}}')
.then(response => response.json())
  .then(result => {
    console.log(result)
    return resolve(result)
  }));

testFetch().then(result => console.log(result));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          A <code>GraphQL</code> Playground.
        </p>
        <button className="App-link">
          Load List
        </button>
      </header>
      <ApolloProvider client={client}>
      
        <ItemsList />

      </ApolloProvider>
    </div>
  );
}

export default App;
