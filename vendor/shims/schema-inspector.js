(function() {
  function vendorModule() {
    'use strict';

    return { 'default': window.SchemaInspector };
  }

  define('schema-inspector', [], vendorModule);
})();
