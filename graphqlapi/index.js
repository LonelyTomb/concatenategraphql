const { graphql, buildSchema } = require('graphql');
const axios = require('axios');
const schema = buildSchema(`
    type Team {
        id: ID
        name: String
        points: Int
    }
    type Query {
        teams: [Team]
    }
`)

const resolvers = {
    teams: async () => {
        const azureScores = await axios.get("https://graphqlvoting.azurewebsites.net/api/score");
        return await azureScores.data

    }
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const teams = await graphql(schema, req.body.query, resolvers);
    context.res = {
        body: teams
    }
};