module.exports = function(router, modeler){
	
    router.route('/')
    .get(function(req, res){
        modeler.Packages.forge()
        .fetch()
        .then(function(collection){
            res.json({error: false, data: collection.toJSON()});
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

    router.route('/:id')
    .get(function(req, res){
        modeler.Package.forge({id: req.params.id})
        .fetch()
        .then(function(pack){
            if (!pack){
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: pack.toJSON()});
            }
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

    router.route('/tags/:id')
    .get(function(req, res){
        modeler.Tag.forge({id: req.params.id})
        .fetch({withRelated: ['packages']})
        .then(function (tag){
            var packs = tag.related('packages');
            res.json({error: false, data: packs.toJSON()});
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

    router.route('/tags/name/:name')
    .get(function(req, res){
        modeler.Tag.forge({name: req.params.name})
        .fetch({withRelated: ['packages']})
        .then(function (tag){
            var packs = tag.related('packages');
            res.json({error: false, data: packs.toJSON()});
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

    router.route('/categories/:id')
    .get(function(req, res){
        modeler.Category.forge({id: req.params.id})
        .fetch({withRelated: ['packages']})
        .then(function (cat){
            var packs = cat.related('packages');
            res.json({error: false, data: packs.toJSON()});
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });    

    router.route('/categories/name/:name')
    .get(function(req, res){
        modeler.Category.forge({name: req.params.name})
        .fetch({withRelated: ['packages']})
        .then(function (cat){
            var packs = cat.related('packages');
            res.json({error: false, data: packs.toJSON()});
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });    

    router.route('/tags/:id/categories/:id')
    .get(function(req, res){
        // TODO
    });

    router.route('/tags/:id/categories/name/:name')
    .get(function(req, res){
        // TODO
    });

    router.route('/tags/name/:name/categories/:id')
    .get(function(req, res){
        // TODO
    });

    router.route('/tags/name/:name/categories/name/:name')
    .get(function(req, res){
        // TODO
    });

    router.route('/:id/installs')
    .get(function(req, res){
        modeler.Installs.forge({package_id: req.params.id})
        .fetch()
        .then(function(collection){
            if (!collection){
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: collection.toJSON()});                
            }
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

    router.route('/:id/installs/:version')
    .get(function(req, res){
        modeler.Install.forge({package_id: req.params.id, version: req.params.version})
        .fetch()
        .then(function(install){
            if (!install){
                res.status(404).json({error: true, data: {}});
            }
            else {
                res.json({error: false, data: install.toJSON()});                
            }
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

// NOT WORKING.... install.id is correct but the fetch on this don't work

    router.route('/:id/installs/:version/alternates')
    .get(function(req, res){
        modeler.Install.forge({package_id: req.params.id, version: req.params.version})
        .fetch()
        .then(function(install){
            if (!install){
                res.status(404).json({error: true, data: {}});
            }
            else {
                console.log(install.id);
                modeler.Alternates.forge({install_id: install.id})
                .fetch()
                .then(function(collection){
                    console.log(collection.toJSON());
                    if (! collection){
                        res.status(404).json({error: true, data: {}});
                    }
                    else {
                        res.json({error: false, data: collection.toJSON()});
                    }
                })
                .catch(function(err){
                    res.status(500).json({error: true, data: {message: err.message}});
                });
            }
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    }); 

    router.route('/:id/installs/:version/alternates/:id')
    .get(function(req, res){
        modeler.Install.forge({package_id: req.params.id, version: req.params.version})
        .fetch()
        .then(function(install){
            if (!install){
                res.status(404).json({error: true, data: {}});
            }
            else {
                modeler.Alternate.forge({install_id: install.id})
                .fetch()
                .then(function(alternate){
                    if (!alternate){
                        res.status(404).json({error: true, data: {}});
                    }
                    else {
                        res.json({error: false, data: alternate.toJSON()});
                    }
                })
                .catch(function(err){
                    res.status(500).json({error: true, data: {message: err.message}});
                });
            }
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });     

};