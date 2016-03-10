# React's PropTypes for Ember

React has a wonderful feature called [PropTypes](https://facebook.github.io/react/docs/reusable-components.html#prop-validation) which enables developers to quickly see what properties the component requires and which properties are optional. Ember calls properties "attributes", thus this addon's name. Here's an example:


### A simple example
```js
// app/components/single-comment.js
import attrTypes from 'attr-types'

export default Ember.Component.extend(attrTypes, {
  attrTypes: {
    text: {type: "string"},
    authorName: {type: "string"},
    authorId: {type: "string"},
  }
})
```

```hbs
{{single-comment text=1}}
```

```js
// In the console.
Error: Validation failed for comment
Property @.text: must be string but is number
Property @.authorName:
Property @.authorId: is missing and not optional
```


### A more complex example

```js
// app/components/people-list.js
import attrTypes from 'attr-types'

export default Ember.Component.extend(attrTypes, {

  attrTypes: {
    people: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: {type: "string"},
          age: {type: "string"},
          location: {type: "string", optional: true}
          jobs: {
            type: 'array',
            items: { type: 'string', minLength: 1 }
          },
          email: {type: "string", pattern: "email"}
        }
      }
    }
  }
})
```

```js
// Assuming we have the following model:

people = [
  {
    name: "Scott",
    age: 99,
    location: "Baltimore",
    jobs: [ "teacher", "developer"],
    email: "scott@example.com"
  },
  {
    name: 81,
    age: "Robbie"
  }
]
```

```hbs
  {{people-list people=people }}
```

```js
// In the console
Error: Validation failed for people-list component
Property @people[1].name must be string but is number
Property @people[1].age must be number but is string
Property @people[1].jobs is missing and is not optional
Property @people[1].email is missing and is not optional
```
