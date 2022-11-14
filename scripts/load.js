const parse = require('./parse.js');
const fs = require('fs');


const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)




getDirectories('pdfs').forEach((year) => {
    fs.readdirSync(`pdfs/${year}`, { withFileTypes: true }).forEach((event) => {
        parse(`pdfs/${year}/${event.name}`);
    })
})
