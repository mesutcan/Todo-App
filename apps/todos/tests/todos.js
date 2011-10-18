var todo;
var remaining;
var completed;
var dones;

 module("Todos.todoListController", {
  setup: function() {
    SC.RunLoop.begin();
    todo = Todos.store.createRecord(Todos.Todo, {
      'title': 'Some Task',
      'isDone': true,
      'tag': 'work'
    });
    SC.RunLoop.end();
  }    
 
});

test("createTodo", function() {
     var task = Todos.store.createRecord(Todos.Todo, { title: 'unit_test' });
  equals(task.get('title'), 'unit_test');

});

test("remaining", function() {
  var todos = Todos.store.find(Todos.Todo);
  remaining =todos.filterProperty('isDone', false).get('length');
  //since we are not using mocking, expected is equal to 4,only one todo is done.
  equals(remaining, 4);
});

test("clear completed todos", function() {
  var todos = SC.A(Todos.store.find(Todos.Todo));
  completed =todos.filterProperty('isDone', true).forEach(todos.removeObject, todos);
  equals(todos.get('length'), 4);
});

test("sorting", function() {
  var todos = Todos.store.find(Todos.Todo);
  todos.set('orderBy', 'tag');
  equals(todos.get('firstObject').get('tag'), 'work');
});



