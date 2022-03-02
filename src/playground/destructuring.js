const name = 'Luis Andres';

const data = {
  name,
  age: 27,
};

const { name : subject, age, job = 'App Developer'} = data;
console.log(`My name is ${subject}, I am ${age} years old and actually I am working as ${job}.`);
