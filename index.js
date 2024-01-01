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

app.use(cors())
app.get('/',(req,res) => {
    // console.log('req,res',req,res);
    res.send('Hello');
    // res.send(req);
})




// app.listen('3005');
// app.listen(3005,() => {
app.listen(config.app.port, () => {
    console.log('serwer Node działa - listen')
    
});