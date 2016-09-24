module.exports = function(router, modeler){
    
    // get all categories
    router.route('/')
    .get(function(req, res){
        modeler.Categories.forge()
        .fetch()
        .then(function(collection){
            res.json({error: false, data: collection.toJSON()});
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

    // get the id of the category with name :name
    router.route('/name/:name')
    .get(function(req, res){
        modeler.Category.forge({name: req.params.name})
        .fetch()
        .then(function(cat){
            if (!cat){
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: cat.toJSON()});
            }
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

    // get the name of the category with id :id
    router.route('/:id')
    .get(function(req, res){
        modeler.Category.forge({id: req.params.id})
        .fetch()
        .then(function(cat){
            if (!cat){
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: cat.toJSON()});
            }
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

};