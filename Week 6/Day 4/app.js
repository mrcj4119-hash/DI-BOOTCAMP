const { readFile, writeFile } = require('./fileManager');

async function main() {
  try {
    // Read content from 'Hello World.txt'
    const helloContent = await readFile('./Hello World.txt');
    console.log('Read content from Hello World.txt:', helloContent);

    // Write new content to 'Bye World.txt'
    await writeFile('./Bye World.txt', 'Writing to the file');
    console.log('Successfully written "Writing to the file" to Bye World.txt!');
  } catch (error) {
    console.error('Error during file operations:', error);
  }
}

main();