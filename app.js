t express = require('express');
const app = express()
const port = 5000; // define the port to 3000

var bodyParser= require ('body-parser')

app.use(express.json());

app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'ejs');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

   
// Display flight search to select origin and destination from database table
app.get('/', (req, res) => {
    db.query('select * from flight search',function (err, result, fields)){
            if (err) 
            {
                throw err;
            } 
            else 
            {
             var arr =[]
             for (var i in result)
            }
 var people = result[i];
 arr.push(people.city);

        }
        res.render('air.html',{city:arr});
    }
});
