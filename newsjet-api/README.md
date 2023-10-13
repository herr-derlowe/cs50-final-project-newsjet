# Newsjet API endpoints
- ### GET /api/users
Will return a JSON object with the list of users registered in the database in the form of an array of javascript objects, under the `users` member.
- ### GET /api/users/[userId]
Returns a JSON object with the information of the given user based on the id passed through the URL parameter `userId`, where `[userId]` has to be substituted with an integer. The user information will be located inside the `user` member of the JSON object, in the form of another object.
- ### POST /api/users/register
Handles the registration of a new user inside the API's database. It asks for 3 parameters in the form of a JSON Object: a `username`, a `password` and a `confirmPassword`. Of the 3, the last one is strictly required to be the same as `password`, for confirmation purposes. `password` is also required to be at least 8 characters long, have uppercase and lowercase letters, a number and a special character.
- ### POST /api/users/login
Request in charge of handling the logging in of users. It asks for a JSON Object with a `username` and `password` fields. Upon successful verification of the user, it also returns the username along with their id as `username` and `userid` respectively.
- ### PATCH /api/users/updatepassword
Handles the optional requirement of a user wanting to change their password, as per the same password guidelines of `/api/users/register`. It requires a JSON Object that contains the fields of `id`, `oldpassword`, `password` and `confirmPassword`.
- ### GET /api/articles
Will return a JSON object with the list of articles in the database in the form of an array of javascript objects, under the `articles` field.
- ### GET /api/articles/search/[q]
Returns a JSON object with a list of articles that match the given query search through the URL parameter `q`, where `[q]` has to be substituted with the text string. The search will look for matches inside the article's headline and short description. The matching articles will be located inside the `articles` field of the JSON object, in the form of an array of objects.
- ### GET /api/articles/categories
Will return a JSON object with the list of all the distinct categories of articles in the database in the form of an array of javascript objects, under the `categories` field, and each one inside a `category` field.
- ### GET /api/articles/categories/searchby/[q]
Gets and returns a JSON object with a list of articles that belong to the same category search through the URL parameter `q`, where `[q]` has to be substituted with the category to search by. The search will look for matches inside the articles' `category` field. The matching articles will be located inside the `articles` field of the JSON object, in the form of an array of objects, along with an `amountFound` field with how many articles were found.
- ### GET /api/articles/[wordq]/category/[categoryq]
Gets and returns a JSON object with a list of articles that belong to the same category search through the URL parameter `categoryq`, where `[categoryq]` has to be substituted with the category to search by. It will also look for matches for the `[wordq]` parameter to be substituted with a word to search by. The search will look for matches inside the articles' `category`, `headline` and `short_description` fields. The matching articles will be located inside the `articles` field of the JSON object, in the form of an array of objects, along with an `amountFound` field with how many articles were found.
- ### GET /api/favorites/[userid]
 Gets and returns the favorite articles of a given user through the `userid` parameter of the URL, where `[userid]` must be substituted with a integer corresponding to the `id` of an existing user. The favorite articles are located in the `favorites` fields of the response, in the form of an array of objects, along with an `amountFound` field with how many articles were found.
 - ### GET /api/favorites/[userid]/search/[search]
 Gets and returns the favorite articles of a given user through the `userid` parameter of the URL and searches the headlines and descriptions of the articles for matches against the `search` parameter, where `[userid]` must be substituted with a integer corresponding to the `id` of an existing user and `[search]` with a text query to search for. The favorite articles are located in the `favorites` fields of the response, in the form of an array of objects, along with an `amountFound` field with how many articles were found.
 - ### POST /api/favorites/add
Handles the registration of a new favorite article for a given user inside the API's database. It asks for 2 parameters in the form of a JSON Object: a `userid` and an `articleid`, both positive existing integers in the database. Upon successful creation of the new favorite article item, the API also returns a JSON object with a boolean `success` field indicating for `true` a success of the operation and `false` for failure.
 - ### DELETE /api/favorites/delete/[userid]/[articleid]
Handles the deletion of a favorite article reference for a given user in the database. To perform the task, it requires the `userid` and `articleid` parameters of the URL, where `[userid]` and `[articleid]` have to be substituted with an existing user's id and an existing article's id to delete the favorite reference.