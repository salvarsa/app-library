const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

//conexion con DataBase mongoDB
//data base conecction
const db = process.env.MONGODB || 'mongodb://localhost:27017/ms-library'

const connectDb = () => {
    try {
        connect(db);
        console.log('DB CONNECTED..');
    } catch (error) {
        return error
    }
}

//inicializar la app
//initializating app
const app = express();
app.use(bodyParser.json());

//configuración del servidor con express
//configuration of express server
const PORT = process.env.PORT || 3500;

//configuración del servidor de apollo y la conexion con el servidor de express
//configuration of Apollo server an connection with express server
async function start() {
    // const apolloServer = new ApolloServer({
    //     plugins: [
    //         ApolloServerPluginLandingPageProductionDefault({
    //             embed: true
    //         })
    //     ]
    // });
    // await apolloServer.start();
    // apolloServer.applyMiddleware({app});

    app.listen(PORT, () => {
        console.log(`app-library ready at port: ${PORT}`);
        connectDb
    })
}

//iniciando servidor
//start server
start();