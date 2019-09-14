# schemalizer

GraphQL Schema builder

## Getting Started

> npm install schemalizer graphql express apollo-server-express

```graphql
# src/graphql/schema.graphql

@Scalar Email
directive @owner on FIELD_DEFINITION

type Node {
    _id
    createdAt
}
```

```graphql
# src/graphql/user/user.graphql

type User inherits Node {
    email: Email @owner
    username: String
}

type Query {
    me: User
}
```

```js
// src/graphql/user/user-resolver.js

exports.resolver = {
    Query: {
        me: (_, params, context, info) => {...}
    }
}
```

```js
// src/graphql/_directives/owner.js

module.exports = {
  async owner (next, user, _, context) {
    if (user == context.user) return next()

    throw new Error(NOT_OWNER)
  }
}
```

```js
// src/graphql/_scalars/email.js

const { GraphQLScalarType } = require('graphql')

function parseValue (value) {
  if(!isEmail(value)) throw new Error(INVALID_EMAIL)

  return value.toLowerCase()
}

exports.resolver = {

  Email: new GraphQLScalarType({
      name: 'Email',
      description: 'Email type',
      serialize: value => value,
      parseValue,
      parseLiteral: ast => parseValue(ast.value)
    })
}
```

```js
// src/app.js

const express = require('express')
const schemalizer = require('schemalizer')
const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const { createServer } = require('http')

//(optional - directives folder inside basePath
const schema = schemalizer(__dirname, { basePath: 'graphql', directives: '_directives' })

const app = express()

 const apolloServer = new ApolloServer({
  schema: makeExecutableSchema(schema),
})

apolloServer.applyMiddleware({ app })

const httpServer = createServer(app)

apolloServer.installSubscriptionHandlers(httpServer)

httpServer.listen(3000, () => console.log(`listening on port ${PORT}`))

```
