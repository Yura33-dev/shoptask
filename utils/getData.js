const fs = require('fs');

let resMenu;
try {
    resMenu = JSON.parse(fs.readFileSync('./restaurantsMenu.json', 'utf-8'));
    console.log('Restaurants Menu loaded from Database successfully!');
} catch (error) {
    console.log('Database did not load...', error);
}

module.exports = resMenu;