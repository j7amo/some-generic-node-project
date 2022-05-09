// рассмотрим встроенный в NodeJS модуль - events,
// который позволяет работать с событиями
// импортируем
const EventEmitter = require('events');

// // создаём экземпляр
// const emitter = new EventEmitter();
//
// // слушаем событие и вызываем коллбэк
// emitter.on('anything', data => {
//     console.log('ON: anything', data);
// })
//
// // создаём событие и передаём какие-то данные
// emitter.emit('anything', {a: 1});

// можем, например, написать свой собственный класс
class Dispatcher extends EventEmitter {
    // можем подписываться на событие
    subscribe(eventName, cb) {
        console.log('Subscribed to event');
        // основную работу делает этот метод
        this.on(eventName, cb);
    }

    // можем диспатчить (эмитить) событие
    dispatch(eventName, data) {
        console.log('Dispatched');
        // основную работу делает этот метод
        this.emit(eventName, data);
    }
}

// создаём экземпляр нашего класса
const dis = new Dispatcher();

// подписываемся
dis.subscribe('abc', data => {
    console.log(data);
});

// диспатчим
dis.dispatch('abc', { abc: 123 });