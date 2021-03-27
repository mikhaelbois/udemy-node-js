exports.getNotFound = (req, res, next) => {
    res.status(404).render('404', {
        docTitle: '404 Error - Page not found',
        path: ''
    });
};