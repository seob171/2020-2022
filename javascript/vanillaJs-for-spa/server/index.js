import {createRequire} from 'module'
import cors from 'cors'
const require = createRequire(import.meta.url)
import express from 'express';
const ranking = require('./data/ranking.json')
const food = require('./data/food.json')
const life = require('./data/life.json')
const trip = require('./data/trip.json')
const culture = require('./data/culture.json')
// import food from './data/food.json'
// import food from './data/food.json'
// import life from './data/life.json'
// import trip from './data/trip.json'
// import culture from './data/culture.json'


const app = express();
app.use(cors())
const PORT = 3001;

app.get('/ranking', (req, res) => {
  res.json(ranking)
});
app.get('/food', (req, res) => {
  res.json((food))
});
app.get('/life', (req, res) => {
  res.json((life))
});
app.get('/trip', (req, res) => {
  res.json((trip))
});
app.get('/culture', (req, res) => {
  res.json((culture))
});

app.listen(PORT, () => {
  console.log(`express running in port ${PORT}...`);
});
