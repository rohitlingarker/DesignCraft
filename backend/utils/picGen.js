const { exec } = require('child_process');
const path = require('path');

const mainPyPath = path.join(__dirname, '../../../perchance-image-generator/main.py');

exec(`python ${mainPyPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing main.py: ${error}`);
    return;
  }
  console.log(`Output: ${stdout}`);
  console.error(`Error: ${stderr}`);
});
