module.exports = function (app) {
    var pirates = require('./controllers/pirates');
    app.get('/pirates', pirates.findAll);
    app.get('/pirates/:id', pirates.findById);
    app.post('/pirates', pirates.add);
    app.put('/pirates/:id', pirates.update);
    app.delete('/pirates/:id', pirates.delete);
    // added to support import of data
    app.get('/import', pirates.import);

    app.get('/*', function (req, res, next) {
        res.sendfile('./layouts/index.html')
    })

}