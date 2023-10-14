# Newsjet
#### Video Demo:  https://youtu.be/vrOz3wGJVUA
#### Description:
Newsjet is made up of a React frontend and RESTful API in the backend for querying and marking favorite news articles from Huffpost dataset. It serves as a simple yet self-serving way of getting news articles from a certain place and being able to manage and save some of them as a user's favorites.

On one side, the backend API is stored inside the `/newsjet-api` folder, which implements the different endpoints and underlying using the Node JS platform along with the Express.js framework. Developed through the use of `pnpm`, a SQLite database and the RETSful restrictions of the API, the file structure describes the following logic:
- The root folder of the API has the `server.js` and `app.js` files which, respectively, oversee setting up the server configuration in a local manner and setting up the Express.js utilities and routes of the service.
- The root folder also holds the database used for the purposes of CS50x’s submission. It is an SQLite database with information about users, and their favorite articles, but also the articles themselves. In the beginning, I had planned to use a MongoDB database remotely, but for simplicity’s sake I decided to go with a more local and simple approach for this project.
- The `/api` folder contains, on one side, the `/api/routes` folder which contains all the different routes and methods described and used by the API in its`README` file. The `/api/services` and `/api/validators` directories oversee database operations and incoming data validation, respectively. The validation of incoming data structures is done through the JavaScript object schema builder and validator [Yup]( https://www.npmjs.com/package/yup).

From the front-end side of the project, NewsJet is made through React JS (with Material UI components) and Vite JS, both powerful tools for building websites with JavaScript. Functionality aside, the file structure is as follows:
- As per industry standards, all the inner logic of this side of application is located inside the `/src` folder.
- Common between many similar React JS applications, `/src` folder contains the `main.jsx` and `App.jsx` files, which oversee the initialization of the app and consequent routing to the main body of the html page.
- Inside `/src`, the `/assets` are the static resources of the website. Up until the very completion of the project, from this directory only the CS50x logo image is used for its corresponding webpage.
- In the `/src/components` are located the so called “components”, an alternative term of React JS for what are basically atomized fragments of a webpage which can be called upon and rendered by other components or pages (which are pretty much also components themselves).
- Also inside `/src/components` is one piece of the application that calls for a dedicated mention: the AppRouter. This component is responsible for defining the different URL routes of NewsJet and rendering the specific components to which each route corresponds to.
- Finally, in the `/src/pages` are the main pages to which the user can be routed to based on the URL they visit. Present here are pages like Home and Favorites, but also the Sign Up and Log In pages.

Using React JS’s `useState` and the `axios` dependency for API request handling, the front-end can both communicate with the API of NewsJet and store them dynamically in each rendered component. Such is the case of the Homepage, which calls the `/api/articles` routes of the RESTful API, gets 100 articles and stores them in a constant variable that makes use of `useState` to then be rendered by the tables. This king of process is what makes all the operations of the website function properly, allowing the user to use it for what NewsJet is for: searching and saving articles.

Dataset courtesy of:
1. Misra, Rishabh. "News Category Dataset." arXiv preprint arXiv:2209.11429 (2022).
2. Misra, Rishabh and Jigyasa Grover. "Sculpting Data for ML: The first act of Machine Learning." ISBN 9798585463570 (2021).

Copyright &copy; NewsJet 2023