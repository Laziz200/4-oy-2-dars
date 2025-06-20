const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, 'users.json');

const userName = process.argv[2];

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

  users.push({ id: newId, name: userName });
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    console.log(`User "${userName}" (ID: ${newId}) successfully added to users.json`);
  } catch (err) {
    console.error('Error writing to users.json:', err.message);
    process.exit(1);
  }
