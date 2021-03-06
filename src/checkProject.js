'use strict';

module.exports = function(options, next) {
  // If we have a project name but not an id, look it up if it exists.
  if (options.projectName && !options.projectId) {
    console.log('Finding Project Id');
    var formio = require('./formio')(options);
    var formioProject = new formio.Project();
    formioProject.list().then(function() {
      formioProject.projects.forEach(function(project) {
        if (project.name === options.projectName) {
          options.projectId = project._id;
        }
      });
      next();
    }).catch(next);
  }
  else {
    return next();
  }
};
