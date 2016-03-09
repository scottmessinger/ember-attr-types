/*jshint node:true*/
module.exports = {
  description: '',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function(options) {
    return this.addBowerPackageToProject('async');
    return this.addBowerPackageToProject('https://github.com/scottmessinger/schema-inspector#62fad033f');
  }
};
