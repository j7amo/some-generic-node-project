// рассмотрим встроенный в NodeJS модуль, который позволяет
// взаимодействовать с операционной системой - OS (оригинально=))
const os = require('os');

// информация о ядрах процессора
console.log(os.cpus());
// архитектура, на которой построен процессор
console.log(os.arch());
// свободная память
console.log(os.freemem());
// название компьютера
console.log(os.hostname());
// домашняя директория
console.log(os.homedir());
// платформа операционной системы
console.log(os.platform());
// версия ядра
console.log(os.version());
// инфрмация о текущем пользователе
console.log(os.userInfo());
// время работы системы в секундах
console.log(os.uptime());
// количество оперативной памяти
console.log(os.totalmem());
// сетевые интерфейсы
console.log(os.networkInterfaces());


