const db = require('./db');

function getFavorites(userid, search = ''){
    if (search === '') {
        const favoriteRecords = db.query(
            'SELECT a.* FROM favorites AS f, articles AS a WHERE f.userid = ? AND a.id = f.articleid', 
            [userid]);
        if (favoriteRecords.length != 0) {
            return favoriteRecords;
        }
        return false;
    } else {
        const favoriteRecords = db.query(
            "SELECT * FROM (SELECT a.* FROM favorites AS f, articles AS a WHERE f.userid = ? AND a.id = f.articleid) AS fav WHERE (fav.headline LIKE ? OR fav.short_description LIKE ?)",
             [userid, '%'+search+'%', '%'+search+'%']);
        if (favoriteRecords.length != 0) {
            return favoriteRecords;
        }
        return false;
    }
}

function addFavorite(newFavorite) {
    const result = db.run(
        'INSERT INTO favorites (userid, articleid) VALUES (?, ?)', 
        [newFavorite.userid, newFavorite.articleid]);
    if (result.changes) {
        return true;
    }
    return false;
}

function deleteFavorite(deleteFavorite) {
    const result = db.run(
        'DELETE FROM favorites WHERE userid = ? AND articleid = ?', 
        [deleteFavorite.userid, deleteFavorite.articleid]);
    if (result.changes) {
        return true;
    }
    return false;
}

function checkArticle(articleid){
    const articleRecord = db.query('SELECT * FROM articles WHERE id = ?', [articleid])
    //console.log(userRecords);
    if (articleRecord.length != 0) {
        return true;
    }
    return false
}

function checkFavorite(userid, articleid){
    const favoriteRecord = db.query(
        'SELECT * FROM favorites WHERE userid = ? AND articleid = ?', 
        [userid, articleid]);
    //console.log(userRecords);
    if (favoriteRecord.length != 0) {
        return true;
    }
    return false
}

module.exports = {
    getFavorites,
    checkArticle,
    addFavorite,
    checkFavorite,
    deleteFavorite
}