# Newsjet
#### Video Demo:  <URL HERE>
#### Description:
Newsjet is made up of a React frontend and RESTful API in the backend for querying and marking favorite news articles from Huffpost dataset. It serves as a simple yet self-serving way of getting news articles from a certain place and being able to select some of them as a user's favorites.

On one side, the backend API is stored inside the `\newsjet-api` folder, which implements the different endpoints and underlying using the Node JS platform along with the Express.js framework. Developed through the use of `pnpm`, a SQLite database and the RETSful restrictions of the API, the file structure describes the following logic:
- The root folder of the API has the `server.js` and `app.js` files which, respectively, oversee setting up the server configuration in a local manner and setting up the Express.js utilities and routes of the service.
- The `\api` folder contains, on one side, the `\api\routes` folder which contains all the different routes and methods described and used by the API.


Dataset courtesy of:
1. Misra, Rishabh. "News Category Dataset." arXiv preprint arXiv:2209.11429 (2022).
2. Misra, Rishabh and Jigyasa Grover. "Sculpting Data for ML: The first act of Machine Learning." ISBN 9798585463570 (2021).

Copyright &copy; NewsJet 2023