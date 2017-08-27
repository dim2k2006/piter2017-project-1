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

На странице задана html-форма с id="myForm", внутри которой содержатся:

a. инпуты

- ФИО (name="fio"),
- Email (name="email"),
- Телефон (name="phone");

b. кнопка отправки формы (id="submitButton").

А также задан div-контейнер с id="resultContainer" для вывода результата работы формы.

