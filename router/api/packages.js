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

    router.route('/tags/:tag_id/categories/:cat_id')
    .get(function(req, res){
        var query = "SELECT DISTINCT packages.id, packages.name, packages.descriptionShort, packages.descriptionLong, packages.preSelected FROM packages, packages_categories, packages_tags WHERE packages_categories.category_id = ? AND packages_categories.package_id=packages.id AND packages_tags.tag_id = ? AND packages_tags.package_id = packages.id";
        modeler.knex.raw(query, [req.params.cat_id, req.params.tag_id])
               .then(function(collection){
                   
                   console.log();
                   if (!collection){
                       res.status(404).json({error: true, data: {}});
                   }
                   else {
                       res.json({error: false, data: JSON.parse(JSON.stringify(collection[0]))});
                   }
               })
               .catch(function(err){
                   res.status(500).json({error: true, data: {message: err.message}});
               });
    });

    router.route('/tags/:id/categories/name/:name')
    .get(function(req, res){
        var query = "SELECT DISTINCT packages.id, packages.name, packages.descriptionShort, packages.descriptionLong, packages.preSelected FROM packages, packages_categories, categories, packages_tags WHERE categories.name=? AND packages_categories.category_id = categories.id AND packages_categories.package_id=packages.id AND packages_tags.tag_id = ? AND packages_tags.package_id = packages.id";
        modeler.knex.raw(query, [req.params.name, req.params.id])
               .then(function(collection){
                   
                   console.log();
                   if (!collection){
                       res.status(404).json({error: true, data: {}});
                   }
                   else {
                       res.json({error: false, data: JSON.parse(JSON.stringify(collection[0]))});
                   }
               })
               .catch(function(err){
                   res.status(500).json({error: true, data: {message: err.message}});
               });
    });

    router.route('/tags/name/:name/categories/:id')
    .get(function(req, res){
        var query = "SELECT DISTINCT packages.id, packages.name, packages.descriptionShort, packages.descriptionLong, packages.preSelected FROM packages, packages_categories, packages_tags, tags WHERE packages_categories.category_id = ? AND packages_categories.package_id=packages.id AND tags.name = ? AND packages_tags.tag_id = tags.id AND packages_tags.package_id = packages.id";
        modeler.knex.raw(query, [req.params.id, req.params.name])
               .then(function(collection){
                   
                   console.log();
                   if (!collection){
                       res.status(404).json({error: true, data: {}});
                   }
                   else {
                       res.json({error: false, data: JSON.parse(JSON.stringify(collection[0]))});
                   }
               })
               .catch(function(err){
                   res.status(500).json({error: true, data: {message: err.message}});
               });
    });

    router.route('/tags/name/:tag_name/categories/name/:cat_name')
    .get(function(req, res){
        var query = "SELECT DISTINCT packages.id, packages.name, packages.descriptionShort, packages.descriptionLong, packages.preSelected FROM packages, packages_categories, categories, packages_tags, tags WHERE categories.name=? AND packages_categories.category_id = categories.id AND packages_categories.package_id=packages.id AND tags.name = ? AND packages_tags.tag_id = tags.id AND packages_tags.package_id = packages.id";
        modeler.knex.raw(query, [req.params.cat_name, req.params.tag_name])
               .then(function(collection){
                   
                   console.log();
                   if (!collection){
                       res.status(404).json({error: true, data: {}});
                   }
                   else {
                       res.json({error: false, data: JSON.parse(JSON.stringify(collection[0]))});
                   }
               })
               .catch(function(err){
                   res.status(500).json({error: true, data: {message: err.message}});
               });
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

    var getInstall = function(packageId, installVesion){
        return new modeler.Install()
        .query({where: {package_id: packageId, version: installVesion}})
        .fetch()
        .then(function(model){
            return model;
        });
    };

    router.route('/:id/installs/:version/alternates')
    .get(function(req, res){
        getInstall(req.params.id, req.params.version)
        .then(function(model){
            var id = model.get('id');
            modeler.Alternates.query({where: {install_id: id}})
            .fetch()
            .then(function(collection){
                if (!collection){
                    res.status(400).json({error: true, data: {}});
                }
                else {
                    res.json({error: false, data: collection.toJSON()});
                }
            })
            .catch(function(err){
                res.status(500).json({error: true, data: {message: err.message}});
            });
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });

    router.route('/:id/installs/:version/alternates/:alternateId')
    .get(function(req, res){
        getInstall(req.params.id, req.params.version)
        .then(function(model){
            var installId = model.get('id');
            modeler.Alternate.query({where: {id: req.params.alternateId, install_id: installId}})
            .fetch()
            .then(function(alternate){
                if (!alternate){
                    res.status(400).json({error: true, data: {}});
                }
                else {
                    res.json({error: false, data: alternate.toJSON()});
                }
            })
            .catch(function(err){
                res.status(500).json({error: true, data: {message: err.message}});
            });
        })
        .catch(function(err){
            res.status(500).json({error: true, data: {message: err.message}});
        });
    });     

};