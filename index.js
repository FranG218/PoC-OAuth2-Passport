const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth');
const ejs = require('ejs');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

const app = express();
app.set('view engine', 'ejs');
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/login.html');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    })
 );   

app.get('/auth/failure', (req, res) => {
    res.send('Algo salió mal...');
});

app.get('/protected', isLoggedIn, (req, res) => {
    const picture = req.user.picture;
    const id = req.user.id;
    const nombre = req.user.given_name;
    const apellido = req.user.family_name;
    const email = req.user.email;
    const nomCompleto = req.user.displayName
    const language = req.user.language
    res.render('home.ejs', { email, nomCompleto, picture, language, nombre, apellido, id });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

app.listen (5000, () => 
    console.log ('listening on port 5000'));