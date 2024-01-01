const Client = require('../models/clientModel'); 


const clientNew = new Client({name: 'New tech sa', address: {street: 'piotrkowska', city: 'gliwice'},nip: 6791151212, yearOf: 10});

clientNew.save()
.then((result) => {
    // jeśli sukces
    // res.send(result);
    console.warn(result);
    console.log('result',result);
})
.catch((err) => {
    /// obsługa błędów za pomocą funkcji anonimowej (err to parameter funkcji)
    console.warn('blad przy zapisie',err);
    // res.send(err);
    //res.status(500).json({ error: 'Nieprawidłowe dane JSON w body' });
});

module.exports = clientNew;