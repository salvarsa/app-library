const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServerPluginLandingPageProductionDefault } = require('apollo-server-core');


// //conexion con DataBase mongoDB
// //local
// const db = process.env.MONGODB || 'mongodb://localhost:27017/ms-library'

// const connectDb = async () => {
//     try {
//         await connect(db);
//         console.log('DB CONNECTED..');
//     } catch (error) {
//         console.error('DB CONNECTION ERROR:', error);
//     }
// }

//mongo Atlas Connection
const db = 'mongodb+srv://salvarsadev13:FoZPp3utgGL1oVk7@app-library.x7rlvlj.mongodb.net/app-library'

const connectDb = async () => {
    try {
        await connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB CONNECTED..');
    } catch (error) {
        console.error('DB CONNECTION ERROR:', error);
    }
}

//inicializar la app
//initializating app
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('library')
})

//typeDfs y resolvers
//typedefs y resolvers
const typeDefs = require('./merge/mergeSchema');
const resolvers = require('./merge/mergeResolver');

//configuración del servidor con express
//configuration of express server
const PORT = process.env.PORT || 3500;

//configuración del servidor de apollo y la conexion con el servidor de express
//configuration of Apollo server an connection with express server
async function start() {
    const schema = makeExecutableSchema({typeDefs, resolvers})
    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginLandingPageProductionDefault({
                embed: true
            })
        ]
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({app});

    app.listen(PORT, () => {
        console.log(`app-library ready on port: ${PORT}`);
        connectDb()
    })
}

//iniciando servidor
//start server
start();