var task2;

module("Given an existing todo", {
  setup: function() {
    SC.RunLoop.begin();
    task2 = Todos.store.createRecord(Todos.Todo, {
      'title': 'Some Task',
      'isDone': true
    });
    SC.RunLoop.end();
  }    
 
});
 
test("When looking at the list of tasks", function() {
  var todosList = Todos.todoListController.get('content');
  equals(todosList.indexOf(task2) != -1, true, "Then I should see the task in the list");
});

test("Inserting a new line", function() {
  var task = Todos.store.createRecord(Todos.Todo, { title: 'testing' });
  equals(task.get('title'), 'testing');
});



