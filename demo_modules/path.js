// рассмотрим встроенный в NodeJS модуль path
const path  = require('path');

// можно получить имя текущего файла (чисто имя!)
console.log('Filename', path.basename(__filename));

// можно получить директорию текущего файла (без имени самого файла!)
console.log('Filename', path.dirname(__dirname));

// можно получить расширение текущего файла (без имени самого файла!)
console.log('Filename', path.extname(__filename));

// можно получить объект с разными полями, в которых хранится информация о файле
console.log('Parse: ', path.parse(__filename));

// можно получить правильно составленный путь
console.log(path.join(__dirname, 'server', 'index.html'));