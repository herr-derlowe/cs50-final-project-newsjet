const db = require('./db');

function getArticles(search = ''){
    if (search === '') {
        const articleRecords = db.query('SELECT * FROM articles LIMIT 100', []);
        if (articleRecords.length != 0) {
            return articleRecords;
        }
        return false;
    } else {
        const articleRecords = db.query(
            "SELECT * FROM articles WHERE (headline LIKE ? OR short_description LIKE ?) LIMIT 100",
             ['%'+search+'%', '%'+search+'%']);
        if (articleRecords.length != 0) {
            return articleRecords;
        }
        return false;
    }
}

function getCategories(search = ''){
    if (search === '') {
        const categories = db.query('SELECT category FROM articles GROUP BY category', []);
        if (categories.length != 0) {
            return categories;
        }
        return false;
    } else {
        const articleByCategoryRecords = db.query(
            "SELECT * FROM articles WHERE category = ? LIMIT 100",
             [search]);
        if (articleByCategoryRecords.length != 0) {
            return articleByCategoryRecords;
        }
        return false;
    }
}

function getArticlesWithCategory(wordq = '', categoryq = ''){
    if (wordq === '' || categoryq === '') {
        return false
    } else {
        const articles = db.query(
            "SELECT * FROM articles WHERE (headline LIKE ? OR short_description LIKE ?) AND category = ? LIMIT 100", 
            ['%'+wordq+'%', '%'+wordq+'%', categoryq]);
        if (articles.length != 0) {
            return articles;
        }
        return false;
    }
}

module.exports = {
    getArticles,
    getCategories,
    getArticlesWithCategory
}