const schemalizer = require('../index')

test('builds schema', () => {
  const schema = schemalizer({ basePath:require('path').join(__dirname, 'graphql') })
  expect(schema.typeDefs).toBeDefined();
  expect(schema.resolvers.Query.hello).toBeDefined();
  expect(schema.directiveResolvers).toBeUndefined();
});


test('builds schema with directives', () => {
  const schema = schemalizer({ basePath:require('path').join(__dirname, 'graphql'), directives: 'directives' })
  console.log(schema.directiveResolvers)
  expect(schema.typeDefs).toBeDefined();
  expect(schema.resolvers.Query.hello).toBeDefined();
  expect(schema.directiveResolvers.test).toBeDefined();
});