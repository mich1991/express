const express = require('express');
const router = express.Router();
const News = require('../models/news')


// Every method GET, POST, PUT, PATCH, on every route in admin route is secured
router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('/login')
        return //not necessary (because of else state) - just for safety
    } else {
        next()
    }
})


router.get('/', (req, res, next) => {
    News.find({}, (err, data) => {
        console.log(data);
        res.render('admin/index', { title: 'Admin', data });
    })
});

router.get('/news/add', (req, res) => {
    res.render('admin/news-form', { title: 'Add news', body: {}, errors: {} });
});

// Catching data from add-form
router.post('/news/add', (req, res) => {
    const body = req.body

    // Test adding data to dbAtlas
    const newsData = new News(body)
    // validate news post
    const errors = newsData.validateSync()

    console.log(errors);
    newsData.save(err => {
        if (err) {
            res.render('admin/news-form', { title: 'Add news', body: {}, errors: {} })
            return
        }

        res.redirect('/admin')
    })
});

module.exports = router;
