## Comic Book Maker
Deployed App Link: https://cban-comic-book-maker.herokuapp.com

Comic book maker is a web app that allows you to create your own stories based on a selection of themes. This app offers a collection of templates, backgrounds, fonts and stickers allowing you to create your own unique story and the drawing tool allows you to draw out your imagination onto the canvas. You can download the comic strip you have worked on to share with your family and friends. Complete stories can be viewed on an image slider where each user's contribution is brought together to create a comic book.

## Tech Stack:

Front-end:

1. React (https://github.com/facebook/react) - to build user interface. 
2. Redux (https://github.com/reduxjs/redux) - to maintain data models on front-end. 
3. Axios (https://github.com/axios/axios) - to fetch the data from the back-end. 
4. React-redux (https://github.com/reduxjs/react-redux) - to maintain data flow, to bind react components with redux store. 
5. HTML5 canvas (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - to build actual comic editing toolbox. 
6. Konva (https://github.com/konvajs/konva) - to extend core functionality of HTML5 canvas. 
7. React-konva (https://github.com/konvajs/react-konva) - to convert Konva context into React context. 
8. Webpack(https://github.com/webpack/webpack) - to bundle our JavaScript assets. 

Back-end:

1. Node.js (https://github.com/nodejs/node) - core runtime environment. 
2. Express (https://github.com/expressjs/express) - to manage HTTP requests. 
3. Oauth2 (https://oauth.net/2/) - to manage authentication. 
4. PostgreSQL (https://www.postgresql.org/) - to manage relational data. 
5. Firebase Cloud Storage (https://firebase.google.com/docs/storage/) - to store images. 
6. Sequelize (http://docs.sequelizejs.com/) - Node.js ORM to write SQL in Javascript fashion.

## Getting Started

To get the app started and running on your local machine for development purpose, first you need to install all the dependencies:
```
$npm install
```

To start the app in development mode, run the command below:
```
$npm run start-dev
```
Open localhost:8080 to run the app on your browser.

