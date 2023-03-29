import { name } from 'ejs'
import express from 'express'

const url = 'https://api.codingthecurbs.fdnd.nl/api/v1'

// Maak een nieuwe express app
const app = express()

// Stel in hoe we express gebruiken
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Maak een route voor de index
app.get('/', (request, response) => {
  let smartzonesUrl = url + '/smartzones'

  fetchJson(smartzonesUrl).then((data) => {
    console.log(data)
    response.render('index', { smartzones: data.smartzones })
  })
})

app.post('/', (request, response) => {
  const { body } = request
  console.log(body);
  postJson(url + '/reservations', body)
    .then((res) => {
      console.log(res.errors.length);

      if (res.errors) {
        console.log(res.errors[0].message);

      } else {
        console.log('Gelukt');

      }
    })

})

app.get('/smartzones', (request, response) => {
  let slug = request.query.smartzonesname || 'Sarah'
  let smartzonesUrl = url + '/smartzones/' + name
  fetchJson(smartzonestUrl).then((data) => {
    // console.log(data)
    response.render('smartzones', data)
  })
})

export async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}

app.get('/over', (request, response) => {
  response.render('over')
})

app.get('/contact', (request, response) => {
  response.render('contact')
})

// Stel het poortnummer in en start express
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}
