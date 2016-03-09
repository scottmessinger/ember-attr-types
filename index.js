/* jshint node: true */
'use strict';

module.exports = {
  name: 'attr-types',
  included: function(app){
    this._super.included(app);
    app.import('bower_components/async/dist/async.js');
    app.import('vendor/shims/async.js', {
      type: 'vendor',
      exports: { 'async': ['default'] }
    });
    app.import('bower_components/schema-inspector/lib/schema-inspector.js');
    app.import('vendor/shims/schema-inspector.js', {
      type: 'vendor',
      exports: { 'schema-inspector': ['default'] }
    });
  },
};
