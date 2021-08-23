const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// MySQL
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'password',
    database        : 'flight info'
})
   
// Get all flights
app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from flight search', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            // if(err) throw err
            console.log('The data from flight search table are: \n', rows)
        })
    })
})

// Get an flight 
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM flight search WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from flight search table are: \n', rows)
        })
    })
});




app.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { Flightid, origin, destination, departure, arrival ,price , time } = req.body

        connection.query('UPDATE flight search SET Flightid =? , origin=? , destination=?, departure=? , arrival=? ,price=? , time=?', [origin,destination, departure, arrival, price, time, id] , (err, rows) => {
            connection.release() // return the connection to pool

            if(!err) {
                res.send(`flight with the name: ${origin} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})


// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))