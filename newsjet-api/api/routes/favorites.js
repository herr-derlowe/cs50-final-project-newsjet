const express = require("express");
const router = express.Router();
const favoriteService = require('../services/favoriteService');
const favoriteOps = require('../validators/favoriteOps');

router.get('/:userid', (req, res, next) => {
    const favoritesResult = favoriteService.getFavorites(req.params.userid);
    switch (typeof(favoritesResult)) {
        case 'object':
            res.status(200).json({
                message: 'Favorites Found',
                amountFound: favoritesResult.length,
                favorites: favoritesResult
            });
            break;

        default:
            res.status(500).json({
                message: 'Could not get favorites'
            });
            break;
    }
});

router.get('/:userid/search/:search', (req, res, next) => {
    const favoritesResult = favoriteService.getFavorites(req.params.userid, req.params.search);
    switch (typeof(favoritesResult)) {
        case 'object':
            res.status(200).json({
                message: 'Favorites search completed',
                amountFound: favoritesResult.length,
                favorites: favoritesResult
            });
            break;

        default:
            res.status(404).json({
                message: 'Favorites search not found'
            });
            break;
    }
});

router.post('/add', (req, res, next) => {
    const newFavorite = {
        userid: req.body.userid,
        articleid: req.body.articleid
    }
    try {
        //console.log(req.body);
        favoriteOps.favoriteSchema.validateSync(newFavorite, {abortEarly: false});
    } catch (e) {
        console.log(e.errors);
        if (e.errors !== undefined) {
            return res.status(406).json({
                errors: e.errors
            });
        }
    }
    
    try {
        const articleExists = favoriteService.checkArticle(newFavorite.articleid);
        if (!articleExists) {
            return res.status(422).json({
                message: 'Article does not exist'
            });
        }
        
        const favoriteExists = favoriteService.checkFavorite(newFavorite.userid, newFavorite.articleid);
        if (favoriteExists) {
            return res.status(409).json({
                message: 'Favorite already exists'
            });
        }

        const added = favoriteService.addFavorite(newFavorite);
        if (added) {
            return res.status(201).json({
                message: 'New favorite added',
                success: true
            });
        } else {
            return res.status(422).json({
                message: 'Could not add favorite',
                success: false
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Could not add favorite',
            errorDetail: error
        });
    }
});

router.delete('/delete/:userid/:articleid', (req, res, next) => {
    const deleteFavorite = {
        userid: req.params.userid,
        articleid: req.params.articleid
    }
    try {
        //console.log(req.body);
        favoriteOps.favoriteSchema.validateSync(deleteFavorite, {abortEarly: false});
    } catch (e) {
        console.log(e.errors);
        if (e.errors !== undefined) {
            return res.status(406).json({
                errors: e.errors
            });
        }
    }
    try {
        const articleExists = favoriteService.checkArticle(deleteFavorite.articleid);
        if (!articleExists) {
            return res.status(422).json({
                message: 'Article does not exist'
            });
        }
        
        const favoriteExists = favoriteService.checkFavorite(deleteFavorite.userid, deleteFavorite.articleid);
        if (!favoriteExists) {
            return res.status(409).json({
                message: 'Favorite does not exist'
            });
        }

        const deleted = favoriteService.deleteFavorite(deleteFavorite);
        if (deleted) {
            return res.status(200).json({
                message: 'Favorite deleted',
                success: true
            });
        } else {
            return res.status(422).json({
                message: 'Could not delete favorite',
                success: false
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Could not delete favorite',
            errorDetail: error
        });
    }

    res.status(200).json({
        message: 'Favorites DELETE content goes here'
    });
});

module.exports = router;