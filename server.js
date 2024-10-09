import express from 'express';  
import mysql from 'mysql2';      
import dotenv from 'dotenv'; 


dotenv.config()

const app = express()

// Create a MySQL database connection using credentials from .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// Connect to MySQL database and handle connection errors
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack)
    return
  }
  console.log('Connected to database')
})

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients'
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(results)
    }
  })
})

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_speciality FROM providers'
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(results)
    }
  })
})

// Question 3: Filter patients by first name
app.get('/patients/:first_name', (req, res) => {
  const { first_name } = req.params
  const query = 'SELECT first_name FROM patients GROUP BY first_name;'
  db.query(query, [first_name], (err, results) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(results)
    }
  })
})

// Question 4: Retrieve all providers by specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const { specialty } = req.params
  const query = 'SELECT first_name, last_name FROM providers GROUP BY provider_speciality = ?'
  db.query(query, [specialty], (err, results) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json(results)
    }
  })
})

// Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
