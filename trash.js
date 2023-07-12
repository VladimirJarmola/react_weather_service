// require('dotenv').config();
// console.log(process.env.REACT_APP_API_OPENWEATHERMAP)

const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf) // will return an object
console.log(typeof config, config) // o