const fs = require('fs');
const path = require('path');

const todosFilePath = path.join(__dirname, 'todos.json');

const searchTerm = process.argv[2];

let todos = [];
if (fs.existsSync(todosFilePath)) {
  try {
    const data = fs.readFileSync(todosFilePath, 'utf8');
    if (data.trim() === '') {
      todos = [];
    } else {
      todos = JSON.parse(data);
      if (!Array.isArray(todos)) {
        todos = [];
      }
    }
  } catch (err) {
    console.error('Error todos.json faylini oqishda xatolik:', err.message);
    process.exit(1);
  }
} else {
  console.error('Error: todos.json topilmadi');
  process.exit(1);
}

if (todos.length === 0) {
  console.log('todo.json fayli bosh');
} else if (!searchTerm) {
  console.log('Hamma todos:');
  todos.forEach(todo => {
    console.log(`ID: ${todo.id}, User ID: ${todo.user_id}, Title: ${todo.title}`);
  });
} else {
  const filteredTodos = todos.filter(todo => 
    String(todo.user_id) === searchTerm );
  
  if (filteredTodos.length === 0) {
    console.log(`No todos`);
  } else {
    console.log(`Todos matching "${searchTerm}":`);
    filteredTodos.forEach(todo => {
      console.log(`ID: ${todo.id}, User ID: ${todo.user_id}, Title: ${todo.title}`);
    });
  }
}