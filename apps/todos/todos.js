// ==========================================================================
// Project:   Todos
// Copyright: ©2011 My Company, Inc.
// ==========================================================================

/*globals Todos*/

Todos = SC.Application.create({
  store: SC.Store.create().from(SC.Record.fixtures)
});

Todos.Todo = SC.Record.extend({ 
title: SC.Record.attr(String), isDone: SC.Record.attr(Boolean, {defaultValue: NO }),tag: SC.Record.attr(String, { defaultValue: 'work' })
 });

Todos.Todo.FIXTURES = [
 
    { "guid": "todo-1",
      "title": "Hamburger",
      "isDone": false,
      "tag": "eat" },
 
    { "guid": "todo-2",
      "title": "Read A Whole New Mind",
      "isDone": false,
      "tag": "work" },
 
    { "guid": "todo-3",
      "title": "Go to Gym",
      "isDone": false,
      "tag": "play" }
];

Todos.CreateTodoView = SC.TextField.extend({
  insertNewline: function() {
    var value = this.get('value');

    if (value) {
      Todos.todoListController.createTodo(value);
      this.set('value', '');
    }
  }
});

Todos.MarkDoneView = SC.Checkbox.extend({
  titleBinding: '.parentView.content.title',
  valueBinding: '.parentView.content.isDone'
});

Todos.SortingView = SC.TemplateView.extend({
  sortBinding: 'Todos.todoListController.sortTodos',
  contentBinding: 'Todos.todoListControllerList.arrangedObjects'
});


Todos.StatsView = SC.TemplateView.extend({
  remainingBinding: 'Todos.todoListController.remaining',

  displayRemaining: function() {
    var remaining = this.get('remaining');
    return remaining + (remaining === 1 ? " item" : " items");
  }.property('remaining').cacheable()
});


Todos.todoListController = SC.ArrayController.create({
  // Initialize the array controller with an empty array.
  content: [],

  // Creates a new todo with the passed title, then adds it
  // to the array.

  createTodo: function(title) {
   // var todo = Todos.Todo.create({ title: title });
     Todos.store.createRecord(Todos.Todo, { title: title });
   // this.pushObject(todo);
  },

  remaining: function() {
    return this.filterProperty('isDone', false).get('length');
  }.property('@each.isDone'),

  clearCompletedTodos: function(){
    this.filterProperty('isDone', true).forEach( function(item) {
      item.destroy();
    });
  },
  
  sortTodos: function() {
   this.set('orderBy', 'tag');
  },

  allAreDone: function(key, value) {
    if (value !== undefined) {
      this.setEach('isDone', value);

      return value;
    } else {
      return this.get('length') && this.everyProperty('isDone', true);
    }
  }.property('@each.isDone')

});

SC.ready(function() {
  Todos.mainPane = SC.TemplatePane.append({
    layerId: 'todos',
    templateName: 'todos'
  });
 var todos = Todos.store.find(Todos.Todo);
 Todos.todoListController.set('content', todos);
});

