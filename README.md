# Steeldalal

Is a B2B company that specializes on the steel & all sorts of metal. With over 10 years of experience

## Clone repo

```
git clone https://github.com/elsalvacion/steeldalal.git
```

_note this repo is private you will have to be authenticated to be able to clone it_

## Prerequisite

This project uses npm as a packager manager therefore you will need **node.js** and **npm** installed.
Node.js v16 LTS is suggested to avoid any issues as this project was build with it.

## Install Dependencies

###### _Backend dependencies_

Navigate to backend folder and run

```
npm install
```

###### _Frontend dependencies_

Naviage to frontend folder and run

```
npm install
```

## Add environmental variables

- Navigate back to backend folder and create a .env file on the root
- Add the following lines inside the newly created .env file

```
PORT=5000
NODE_ENV=development
JWT_SECRET=kljfgf7954ff
DB_HOST=localhost
DB_NAME=steeldalal
DB_USER=root
DB_PASS=
```

## Add Database

This project uses a mysql database. Therefore you need a mysql data. You can use phpmyadmin that comes with xampp.

- Create a database and name it **steeldalal**
- select the database
- import the **steeldalal.sql** file that comes with cloned project

## Runing the project

Navigate to backend folder and run

```
npm run dev
```

## Miscellaneous

- The facebook and google login has not been integrated yet.
- The default user login credentails are listed below but you can register yourself.

email: **elsalvacion2022@gmail.com**
password: **12345**
