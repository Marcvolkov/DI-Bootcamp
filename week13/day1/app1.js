// app.js

const { readFile, writeFile } = require('./fileManager');

async function main() {
  try {
    // 1) Read Hello World.txt
    const hello = await readFile('Hello World.txt');
    console.log('Contents of Hello World.txt:');
    console.log(hello);

    // 2) Write to Bye World.txt
    const newContent = 'Writing to the file';
    await writeFile('Bye World.txt', newContent);
    console.log('\nWrote to Bye World.txt:', newContent);

    // 3) (Optional) read back to verify
    const bye = await readFile('Bye World.txt');
    console.log('\nContents of Bye World.txt now:');
    console.log(bye);

  } catch (err) {
    console.error('Error:', err);
  }
}

main();
