import fetch from 'node-fetch';

fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => console.log(response));
