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

graphql(schema, "{teams {name points id}}", resolvers)
.then(res => { console.log(JSON.stringify(res)) })