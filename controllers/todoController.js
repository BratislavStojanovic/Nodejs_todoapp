var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/todo');

// Create a Schema
var todoSchema = new mongoose.Schema({
  item: String
});
// Create a model
var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({
//   item: 'buy flowers'
// }).save(function(err) {
//   if (err) throw err;
//   console.log('Item Saved');
// });
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// let data = [
//   { item: 'get milk' },
//   { item: 'walk dog' },
//   { item: 'kick some coding ass' }
// ];

module.exports = function(app) {
  app.get('/todo', function(req, res) {
    // get dara from mongodb  and pass it to view
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });
  app.post('/todo', urlencodedParser, function(req, res) {
    // get data from view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
    // data.push(req.body);
    // res.json(data);
  });
  app.delete('/todo/:item', function(req, res) {
    // delete requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, ' ') }).remove(function(
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
    // data = data.filter(function(todo) {
    //   return todo.item.replace(/ /g, '-') !== req.params.item;
    // });
    // res.json(data);
  });
};
