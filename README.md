# ШРИ 2017, Задание 1

## Содержание

- [Установка](#Установка)
- [Деплой](#Деплой)
- [Описание](#Описание)

## Установка

1. git clone git@github.com:dim2k2006/piter2017-project-1.git

2. cd piter2017-project-1

3. npm i && bower i

4. gulp build

> Собранный проект находится в папке static.

## Деплой

1. git subtree push --prefix static origin gh-pages

## Описание

### Разметка

На странице задана html-форма с id="myForm", внутри которой содержатся:

a. инпуты

- ФИО (name="fio"),
- Email (name="email"),
- Телефон (name="phone");

b. кнопка отправки формы (id="submitButton").

А также задан div-контейнер с id="resultContainer" для вывода результата работы формы.

### Поведение

При отправке формы срабатывает валидация полей по следующим правилам:

- ФИО: Ровно три слова.
- Email: Формат email-адреса, но только в доменах ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com.
- Телефон: Номер телефона, который начинается на +7, и имеет формат +7(999)999-99-99. Кроме того, сумма всех цифр телефона не должна превышать 30. Например, для +7(111)222-33-11 сумма равняется 24, а для +7(222)444-55-66 сумма равняется 47.

Если валидация не прошла, соответствующим инпутам добавляется класс error с заданным стилем border: 1px solid red.
Если валидация прошла успешно, кнопка отправки формы становится неактивной и отправляется ajax-запрос на адрес, указанный в атрибуте action формы.

Может быть 3 варианта ответа на запрос с разным поведением для каждого:

a. {"status":"success"} – контейнеру resultContainer выставляется класс success и добавляется содержимое с текстом "Success".

b. {"status":"error","reason":String} - контейнеру resultContainer выставляется класс error и добавляется содержимое с текстом из поля reason.

c. {"status":"progress","timeout":Number} - контейнеру resultContainer выставляется класс progress и через timeout миллисекунд повторяется запрос (логика повторяется, пока в ответе не вернется отличный от progress статус)

Для простоты тестирования сабмита формы выполняются запросы на статические файлы с разными подготовленными вариантами ответов (success.json, error.json, progress.json).

### Глобальный объект

В глобальной области видимости определен объект MyForm с методами:

- validate() => { isValid: Boolean, errorFields: String[] }
- getData() => Object
- setData(Object) => undefined
- submit() => undefined

Метод validate возвращает объект с признаком результата валидации (isValid) и массивом названий полей, которые не прошли валидацию (errorFields).

Метод getData возвращает объект с данными формы, где имена свойств совпадают с именами инпутов.

Метод setData принимает объект с данными формы и устанавливает их инпутам формы. Поля кроме phone, fio, email игнорируются.

Метод submit выполняет валидацию полей и отправку ajax-запроса, если валидация пройдена. Вызывается по клику на кнопку отправить.

### Результат

В корне проекта присутствуют файлы:

- /index.html — разметка страницы;
- /index.js – вся клиентская логика страницы.
