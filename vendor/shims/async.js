(function() {
  function vendorModule() {
    'use strict';

    return { 'default': window.async };
  }

  define('async', [], vendorModule);
})();
