const fs = require('fs');
const path = require('path');

// Function to update user progress in the users.json file
function updateUserProgress(userId, progress) {
  const filePath = path.join(__dirname, '../../users.json');

  // Read the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users.json:', err);
      return;
    }

    try {
      // Parse the JSON data
      const users = JSON.parse(data);

      // Find the user by their ID
      const user = users.find((user) => user.id === userId);
      if (!user) {
        console.error('User not found');
        return;
      }

      // Update the user's progress
      user.progress = progress;

      // Convert the data back to JSON
      const updatedData = JSON.stringify(users, null, 2);

      // Write the updated data back to the file
      fs.writeFile(filePath, updatedData, 'utf8', (err) => {
        if (err) {
          console.error('Error writing users.json:', err);
          return;
        }

        console.log('User progress updated successfully');
        console.log(user)
      });
    } catch (error) {
      console.error('Error parsing users.json:', error);
    }
  });
}

module.exports ={updateUserProgress};


