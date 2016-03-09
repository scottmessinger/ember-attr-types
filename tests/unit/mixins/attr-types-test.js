import Ember from 'ember';
import AttrTypesMixin from 'attr-types/mixins/attr-types';
import { module, test } from 'qunit';

module('Unit | Mixin | attr types');

// Replace this with your real tests.
test('it works', function(assert) {
  let AttrTypesObject = Ember.Object.extend(AttrTypesMixin);
  let subject = AttrTypesObject.create();
  assert.ok(subject);
});

test('it validates simple assertion', function() {
  let AttrTypesObject = Ember.Object.extend(AttrTypesMixin, {
    attrTypes: {
      name: {type: "string"},
    }
  });
  let subject =  function(){AttrTypesObject.create({
    name: 1
  })}

  throws(subject, /Property @.name: must be string, but is number/, "Throws correct error")
});

test('it validates objects', function(assert) {
  let AttrTypesObject = Ember.Object.extend(AttrTypesMixin, {
    attrTypes: {
      person: {
        type: "object",
        properties: {
          name: {type: "string"},
          age: {type: "number"}
        }
      },
    }
  });

  let subject =  AttrTypesObject.create({
    person: {
      name: "Scott",
      age: 99
    }
  })

  assert.ok(subject, "Does not throw error if correct attrs")

  subject =  function(){AttrTypesObject.create({
    person: {
      name: 99,
      age: "Scott"
    }
  })}

  throws(subject, /Property @.person.name: must be string, but is number/, "Throws correct error")
});

test('it validates arrays of objects', function(assert) {

  // Setup
  let AttrTypesObject = Ember.Object.extend(AttrTypesMixin, {
    attrTypes: {
      people: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {type: "string"},
            age: {type: "number"}
          }
        }
      },
    }
  });

  // Test happy path
  let subject =  AttrTypesObject.create({
    people: [
      {
        name: "Scott",
        age: 99
      }
    ]
  })

  assert.ok(subject, "Does not throw error if correct attrs")

  // Test
  subject =  function(){AttrTypesObject.create({
    people: [
      {
        name: 99,
        age: "Scott"
      }
    ]
  })}

  // console.log(subject())

  throws(subject,
    /Property @\.people\[0\]\.name: must be string, but is number/,
    "Throw error that property in nested array is wrong"
  )

  subject =  function(){AttrTypesObject.create({
    people: {
      name: 99,
      age: "Scott"
    }
  })}

  throws(subject,
    /Property @.people: must be array, but is object/,
    "Throws error that attr should be an array instead of an object"
  )

});
