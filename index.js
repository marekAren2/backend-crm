const config = require('./config'); 
const clientController = require('./app/controllers/clientController'); 
const clientModel = require('./app/models/clientModel'); 


const express = require('express'); 
// const app = express.express();
const app = express();

const mongoose = require("mongoose");
//przestarzałe
// mongoose.set("strictQuery", false);

// const mongoDB = "mongodb://127.0.0.1/my_database";
const mongoDB = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
// const mongoDB = "mongodb://${config.db.host}:${config.db.port}/${config.db.name}";
const options = {
// przestarzałe co w takim przypadku
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
};

// Funkcja do obsługi zamknięcia połączenia
async function closeConnection(signal) {
  console.log(`Received ${signal}. Closing connection...`);
  try {
    await mongoose.disconnect();
    console.log("Disconnected from the database");
    process.exit(0);
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
    process.exit(1);
  }
}

// Rejestrowanie funkcji do obsługi sygnałów
process.on('SIGINT', () => closeConnection('SIGINT'));
process.on('SIGTERM', () => closeConnection('SIGTERM'));

// Funkcja główna
async function main() {
  try {
    await mongoose.connect(mongoDB, options);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

// Wywołanie funkcji głównej
main().catch((err) => console.error(err));




const cors = require('cors'); 

app.use(cors());
app.use(express.json());
app.get('/',(req,res) => {
    // console.log('req,res',req,res);
    res.send('Hello');
// res.send(clientController.index())
// res.send(clientController.index)
    // res.send(req);
});

// do routing nie podajemy jako 2-gi parametr funkcji zwrotnej cb!!!
// app.get('/clients',(req,res) => {
app.get('/clients', clientController.index);
/* Routes do zrobienia - potrzebne? */
/* app.get('/clients/:id', clientController.index);
app.post('/clients/add', clientController.create);
app.delete('/clients/delete/:id', clientController.delete);
// czy?
app.delete('/:id', clientController.delete);
app.post('/clients', clientController.create);
app.get('/:id', clientController.index); */

app.post('/clients', clientController.create);
app.put('/clients/:id', clientController.update);
// app.delete('/:id', clientController.delete);
// czy ?:
app.delete('clients/:id', clientController.delete);

  // console.log('req,res',req,res);
  // res.send('Hello');
// nie wysylamy wartosci index obiektu clientController!!!
  // res.send(clientController.index)
// nie wysylamy metody/funkcji obiektu   clientController!!!
  // res.send(clientController.index())
// no lean here ,but in controller :res.send(clientController.index().lean())
  // res.send(req);






// app.listen('3005');
// app.listen(3005,() => {
app.listen(config.app.port, () => {
    console.log('serwer Node działa - listen')
    
});