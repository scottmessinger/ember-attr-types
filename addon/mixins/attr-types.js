import Ember from 'ember';
import schemaInspector from 'schema-inspector'


let Validator = function(attrs, attrTypes){

  // Validate the object using schema inspector
  let result = schemaInspector.validate({
    type: 'object',
    properties: attrTypes
  }, attrs)

  // If the results aren't valid, we throw an error
  if (result.valid === false) {
    let message = `
    Validation failed for ${this.toString()};
${result.format()}`
    // comment out for testing: console.log(message)

    throw new Error(message)
  }

}


export default Ember.Mixin.create({

  validateAttrTypes: Ember.on('init', function(){
    if (Ember.isNone(Ember.get(this, 'attrTypes'))) return;

    let keys = Object.keys(this.attrTypes) || []
    let attrs = keys.reduce((acc, attrName)=>{
      acc[attrName] = Ember.get(this, attrName)
      return acc
    }, {})

    Validator.call(this, attrs, this.attrTypes)
  })

});
