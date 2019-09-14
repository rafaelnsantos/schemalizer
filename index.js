const path = require('path')
const { transpileSchema } = require('graphql-s2s').graphqls2s
const glue = require('schemaglue')

module.exports = ({ basePath, directives }) => {
  const { schema, resolver } = glue(basePath)

  const mySchema = {
    typeDefs: transpileSchema(schema),
    resolvers: resolver
  }

  if (directives) {
    const directivesPath = path.join(basePath, directives)
    require('fs')
      .readdirSync(directivesPath)
      .forEach(file => {
        mySchema.directiveResolvers = { ...mySchema.directiveResolvers, ...require(path.join(directivesPath, file)) }
      })
  }
  return mySchema
}
