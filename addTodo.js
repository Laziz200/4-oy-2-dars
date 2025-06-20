const fs = require('fs');
const path = require('path');
const { title } = require('process');

const usersFilePath = path.join(__dirname, 'todos.json');

const userName = process.argv[3];

const user_Id = process.argv[2];

if (!user_Id || !userName) {
  console.error('Error: Please provide both userId and username (e.g., node addUser.js 123 Bekzodabek)');
  process.exit(1);
}

let users = [];
if (fs.existsSync(usersFilePath)) {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    if (data.trim() === '') {
      users = [];
    } else {
      users = JSON.parse(data);
      if (!Array.isArray(users)) {
        users = [];
      }
    }
  } catch (err) {
    console.error('Error reading users.json:', err.message);
    users = [];
  }
}

const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
try {
    if (typeof user_Id==="string") {
        const num=Number(user_Id);
        if (isNaN(num)) {
            console.error('Error: userId must be a valid number (e.g., 123)');
            process.exit(1);
        }
        users.push({ id: newId,user_id:num, title: userName });
    }
} catch (error) {
    console.error('Error: userId must be a valid number (e.g., 123)', error.message);
    process.exit(1);
}
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    console.log(`User "${userName}" userid ${user_Id} (ID: ${newId}) successfully added to users.json`);
  } catch (err) {
    console.error('Error writing to users.json:', err.message);
    process.exit(1);
  }
