function handleClick() {
  $('#greetingText').val('');
  if ($(this).text() === 'Hello') {
    $(this).text('Goodbye');
  } else if ($(this).text() === 'Goodbye') {
    $(this).text('Hello');
  } else {
    $(this).text('Hello');
  }
}

$('#greeting, #dismissal').on('click', handleClick);

function btnHoverOn() {
  $(this).css({'background-color' : '#FA6900', 'color' : 'ghostwhite'})
}
function btnHoverOff() {
  $(this).css({'background-color' : 'rgb(192, 192, 192)'})
}

$('#greeting, #dismissal').hover(btnHoverOn, btnHoverOff);

function changeText() {
  $('#greeting').text($('#greetingText').val());
}

$('#greetingText').on('keyup', changeText);

function setupStorage() {
  if (!localStorage.toDos) {
    localStorage.toDos = JSON.stringify([])
  }
  if (!localStorage.completeToDos) {
    localStorage.completeToDos = JSON.stringify([])
  }
}

setupStorage();

function addToDoToStorage(todo) {
  var data = JSON.parse(localStorage.toDos);
  data.push(todo);
  localStorage.toDos = JSON.stringify(data);
}

function removeToDoFromStorage(todo) {
  var data = JSON.parse(localStorage.toDos);
  var new_data = data.filter(function (item) {
    return item.id != todo.id
  });
  localStorage.toDos = JSON.stringify(new_data);
}

function clearStorage() {
  localStorage.toDos = JSON.stringify([]);
  localStorage.completeToDos = JSON.stringify([]);
}

function buildToDoHtml(item, buttonId) {
  st = '<tr><td>' + item.name + '</td><td>' + item.date +
       '</td><td><span class="label label-danger">' +
       item.status + '</span></td><td><button ';
  st += buttonId? 'id="' + item.id + '"' : '';
  st += 'class="btn btn-custom complete-todo">Complete</button></td>';
  return st;
}

function renderToDos () {
  console.log(localStorage.toDos);
  console.log(localStorage.completeToDos);
  var data = JSON.parse(localStorage.toDos);
  if (data.length > 0) {
    data.forEach(function (element) {
      $("#todo-list").append(buildToDoHtml(element, true));
    });
  }
  var data = JSON.parse(localStorage.completeToDos);
  data.forEach(function (element) {
    $("#todo-completed").append(buildToDoHtml(element, false));
  });
}

renderToDos();

function markCompleted () {
  $(this).closest('tr').remove();

  var id = $(this).attr('id');
  console.log(id);
  var data = JSON.parse(localStorage.toDos);
  markedToDo = data.filter(function (item) {
    return item.id == id;
  });
  console.log(markedToDo);
  addToCompleted(markedToDo[0]);
}

function addToCompleted (todo) {
  removeToDoFromStorage(todo);
  var data = JSON.parse(localStorage.completeTodos);
  data.push(todo);
  localStorage.completeToDos = JSON.stringify(data);
  console.log(localStorage.completeToDos);
  $("#todo-completed").append(buildToDoHtml(todo, false));
}

$("#newToDoForm").submit(function (e) {
  e.preventDefault();
  var newToDo = {id: Math.floor(Math.random()*100),
                 name: $('#add-task-name').val(),
                 date: $('#add-task-date').val(),
                 status: 'Complete'};
  addToDoToStorage(newToDo);
  console.log(newToDo);
  console.log(localStorage.toDos);
  $("#todo-list").append(buildToDoHtml(newToDo, true));
  $('.complete-todo').on('click', markCompleted);
})

$('.complete-todo').on('click', markCompleted);

$('#clrLS').on('click', clearStorage)

// var todos = [
//   {id: Math.floor(Math.random() * 100), title: 'Title 1', date: '01.11.17'},
//   {id: Math.floor(Math.random() * 100), title: 'Title 2', date: '02.11.17'},
//   {id: Math.floor(Math.random() * 100), title: 'Title 3', date: '03.11.17'},
//   {id: Math.floor(Math.random() * 100), title: 'Title 4', date: '04.11.17'},
//   {id: Math.floor(Math.random() * 100), title: 'Title 5', date: '05.11.17'}
// ];

function renderToDosToPage(arr) {
  for (var i = 0; i < arr.length; i++) {
    $('#todo-list').append('<tr><td>'
                            + arr[i].title
                            + '</td><td>'
                            + arr[i].date
                            + '</td><td>'
                            + '<button id="' + arr[i].id + '" class="btn btn-custom completeToDoBtn">Complete</button>'
                            + '</td></tr>')
  }
}

renderToDosToPage([])

function undoComplete() {
  console.log('test');
}

function markComplete() {
  $(this).closest('tr').remove();
  var id = $(this).attr('id');
  var completedToDo = todos.filter(function(item) {
    return item.id == id
  });
  $('#todo-completed').prepend('<tr><td>' + completedToDo[0].title + '</td><td>' + completedToDo[0].date + '</td><td><button id="' + completedToDo[0].id + '" class="btn btn-custom-reverse undoToDoBtn">Undo</button></td></tr>')
  $('.undoToDoBtn').on('click', undoComplete);
}

$('.completeToDoBtn').on('click', markComplete);

function addTask() {
  var name = $('#add-task-name').val();
  var date = $('#add-task-date').val();
  if (!name || !date) {
    alert("Fill out all fields.")
  } else {
    $('#todo-list').append('<tr><td>' + name + '</td><td>' + date + '</td><td><button class="btn btn-custom remove-task-button">Complete</button></td></tr>')
    $('#add-task-name, #add-task-date').val('');
  }

  // var task = {id: Math.floor(Math.random() * 100), title: $('#add-task-name').val(), date: $('#add-task-date').val()};
  // todos.push(task)
  // $('#todo-list').empty()
  // renderToDosToPage(todos)
}

$('#add-task-button').on('click', addTask);
