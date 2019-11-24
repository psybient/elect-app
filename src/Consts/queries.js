const url = 'http://localhost:4000/graphql';
//let query = `?query={item(id:"10"){text}}`;

export const fetchQuery = (query) => new Promise(resolve => fetch(url + `?query=${query}`)
    .then(response => response.json())
    .then(result => {
        console.log(result.data)
        resolve(result.data)
    }));