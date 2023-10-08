const express = require("express");
const router = express.Router();
const articleService = require('../services/articleService');

router.get('/', (req, res, next) => {
    const articlesResult = articleService.getArticles();
    switch (typeof(articlesResult)) {
        case 'object':
            res.status(200).json({
                message: 'Articles Found',
                amountFound: articlesResult.length,
                articles: articlesResult
            });
            break;

        default:
            res.status(500).json({
                message: 'Could not get articles'
            });
            break;
    }
});

router.get('/search/:q', (req, res, next) => {
    const articlesResult = articleService.getArticles(req.params.q);
    switch (typeof(articlesResult)) {
        case 'object':
            res.status(200).json({
                message: 'Articles Found',
                amountFound: articlesResult.length,
                articles: articlesResult
            });
            break;

        default:
            res.status(404).json({
                message: 'Articles not found'
            });
            break;
    }
});

router.get('/categories', (req, res, next) => {
    const categoriesResult = articleService.getCategories();
    switch (typeof(categoriesResult)) {
        case 'object':
            res.status(200).json({
                message: 'List of categories',
                amountFound: categoriesResult.length,
                categories: categoriesResult
            });
            break;

        default:
            res.status(500).json({
                message: 'Could not get categories'
            });
            break;
    }
});

router.get('/categories/searchby/:q', (req, res, next) => {
    const categoriesResult = articleService.getCategories(req.params.q.toUpperCase().trim());
    switch (typeof(categoriesResult)) {
        case 'object':
            res.status(200).json({
                message: 'Articles by category Found',
                amountFound: categoriesResult.length,
                articles: categoriesResult
            });
            break;

        default:
            res.status(404).json({
                message: 'Articles by category not found'
            });
            break;
    }
});

module.exports = router;