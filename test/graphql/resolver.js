exports.resolver = {
    Query: {
        hello: (_, { name }) => ({ hello: 'Hello ' + name })
    }
}