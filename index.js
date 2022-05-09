// чтобы импортировать что-то в файл используем require
// если это какой-то node-module, то указываем абсолютный путь
// const chalk = require('chalk');
// если какой-то наш модуль, то можно указать относительный путь
// const text = require('./data');
// и теперь переменную можно использовать
// console.log(chalk.blue(text));

// при сборке NodeJS оборачивает содержимое каждого файла в IIFE
// и передаёт в эту функцию ряд аргументов:
// - exports - объект экспортов
// - require - функция
// - module - объект с children-модулями(chalk, data) и путями (paths) до всех node-modules
// - __dirname - /Users/Roman_Tarnakin/WebstormProjects/some-generic-node-project
// - __filename - /Users/Roman_Tarnakin/WebstormProjects/some-generic-node-project/index.js
// выглядит это примерно так:
// (function (exports, require, module, __dirname, __filename){
//     // содержимое файла
// })()

// можно создавать сервер с помощью встроенного модуля http
// здесь нужно отметить важный момент:
// встроенный модуль http для создания сервера обычно НЕ используют!
// используют как правило библиотеки / фреймворки, например Express
const http = require('http');
// также нам понадобятся fs и path модули
const fs = require('fs');
const path = require('path');

// создаём экземпляр сервера и настраиваем его
const server = http.createServer((request, response) => {
    // делаем простейший роутинг:
    // определяем текущий запрос и для корневого пути возвращаем фиксированно главную страницу
    // в противном случае динамически возвращаем страницу
    let currentRequest = request.url === '/' ? 'index.html' : request.url;
    // далее получаем правильно сформированный путь к нужному html-файлу
    let filePath = path.join(__dirname, 'public', currentRequest);
    // нам также нужно учесть несколько моментов:
    // 1) если у нас, например, в адресной строке введено "contacts",
    // то currentRequest = "contacts" и filePath получится "__dirname/public/contacts",
    // что будет не валидно, так как отсутствует расширение файла
    // поэтому нам нужно проверять расширение файла
    const fileExtension = path.extname(filePath);
    // и если оно отсутствует, то добавлять ".html"
    if (!fileExtension) {
        filePath += '.html';
    }
    // 2) чтобы стили работали, их нужно также правильно отдавать браузеру
    // для этого в заголовках ответа должен стоять правильный Content-Type
    let contentType;
    switch (fileExtension) {
        // формируем правильный заголовок ответа для стилей
        case '.css':
            contentType = 'text/css';
            break;
        // формируем правильный заголовок ответа для скриптов
        case '.js':
            contentType = 'text/javascript';
            break;
        // а по умолчанию отдаём HTML
        default:
            contentType = 'text/html';
            break;
    }
    // считываем нужный html-файл, в коллбэке обрабатываем ошибку (если есть)
    // и отдаём браузеру прочитанные данные в data
    fs.readFile(filePath, (err, data) => {
        // если наш запрос содержит невалидное имя файла (например, "contacts123"), то работаем с ошибкой
        if (err) {
            // в случае ошибки будем считывать и отдавать страничку error.html
            fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
                // если вдруг по каким-то причинам не удалось её считать, то пятисотим
                if (err) {
                    response.writeHead(500);
                    response.end('Error!');
                } else {
                    // если удалось считать, то нормально отдаём заголовки и тело
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.end(data);
                }
            });

        }
        // если запрос содержит валидное имя файла, то нормально отдаём заголовки и тело
        else {
            // формируем ответ сервера на запрос
            // записываем заголовки ответа
            response.writeHead(200, {
                'Content-Type': contentType
            });
            // возвращаем тело
            response.end(data);
        }
    });
});

const PORT = process.env.PORT || 3000;

// запускаем сервер на localhost:3000
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})