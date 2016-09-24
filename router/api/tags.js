module.exports = function(router, modeler){
	
    // get all tags
    router.route('/')
    .get(function(req, res){
    	modeler.Tags.forge()
        .fetch()
        .then(function(collection){
            res.json({error: false, data: collection.toJSON()});
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

    // get the id of the tag with name :name
    router.route('/name/:name')
    .get(function(req, res){
        modeler.Tag.forge({name: req.params.name})
        .fetch()
        .then(function(tag){
            if (!tag){
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: tag.toJSON()});
            }
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

    // get the name of the tag with id :id
    router.route('/:id')
    .get(function(req, res){
        modeler.Tag.forge({id: req.params.id})
        .fetch()
        .then(function(tag){
            if (!tag){
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: tag.toJSON()});
            }
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

};
