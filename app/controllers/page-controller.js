class PageController {

    showHome(req, res) {
        res.render('pages/home', {
            title: 'Strona głowna'
        });
    }

    showNotFound (req, res) {
        res.render('errors/404', {
            title: '404',
            layout: 'layouts/minimalist'
        });
    }

}

module.exports = new PageController();