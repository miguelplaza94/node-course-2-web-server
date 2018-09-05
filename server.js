const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; //cambio por heroku

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

//helper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.set('view engine','hbs');

//Middlewares



app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFileSync('server.log', log + '\n', () => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

//tarea middleware
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static( __dirname + '/public')); //middleware


app.get('/about', (req, res) => { 
    res.render('about.hbs', {
        pageTitle:'About Page',
    });
}); 

app.get('/', (req, res) => { 
    res.render('home.hbs', {
        pageTitle:'Welcome home',
        welcomeMessage: 'Hello. Be welcome',
    });
});


app.get('/bad', (req, res) => { 

    res.send({
        errorMessage: 'Unable to handle request',
    });

});

//cambios debido a heroku
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

