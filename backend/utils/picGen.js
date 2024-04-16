const { exec } = require('child_process');
const {promisify} = require('util');
const execAsync = promisify(exec);
const path = require('path');

// const picGenerator = async (fileName,prompt,resolution)=>{
//   await execAsync(`python ${mainPyPath} -f ${fileName} -p "${prompt}" -r ${resolution}`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error executing main.py: ${error}`);
//     return;
//   }
//   console.log(`Output: ${stdout}`);
// });
// }

const mainPyPath = path.join(__dirname, "../perchance-image-generator/main.py");

const picGenerator = async (fileName, prompt, resolution) => {
  try {
    const command = `python ${mainPyPath} -f ${fileName} -p "${prompt}" -r ${resolution} -st cinematic`;
    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
      console.error(`Error executing main.py: ${stderr}`);
      return;
    }
    console.log(`Output: ${stdout}`);
  } catch (error) {
    console.error(`Error executing main.py: ${error}`);
    throw error;
  }
};
module.exports = picGenerator;
