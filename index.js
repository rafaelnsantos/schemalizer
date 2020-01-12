const path = require('path')
const { transpileSchema } = require('graphql-s2s').graphqls2s
const glue = require('schemaglue')
const { exportFolderRoot } = require('folder-utils')

module.exports = (dirname, { basePath, directives, mode = 'js' }) => {
  basePath = path.join(dirname, basePath)
  const { schema, resolver } = glue(basePath, { mode })

  const mySchema = {
    typeDefs: transpileSchema(schema),
    resolvers: resolver
  }

  if (directives) {
    const directivesPath = path.join(basePath, directives)
    mySchema.directiveResolvers = exportFolderRoot(directivesPath, '', { mode })
  }

  return mySchema
}
