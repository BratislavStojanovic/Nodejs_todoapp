var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// Set up template engine

app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

// Listen to port

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`You are listenning to port ${PORT}`);
});
