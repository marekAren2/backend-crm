const Client = require('../models/clientModel'); 

module.exports = {

    index: (_req, res) => {
        console.log('Przed zapytaniem do bazy danych');

        // Client.findOne({age: 1})
        // Client.findOne({age: '1'})
        // Client.find({}).lean()
        Client.find()
            .then((result) => {
                // Jeśli sukces
                console.log('L:11 Po zapytaniu do bazy danych. Wyniki:', result);
                if (res) {
                    // res.send(result);
                    // status na sztywno jest sens, a send dziala to po co kombinowac?
                    res.status(200).json(result);
                } else {
                    console.error('L:15 Obiekt res jest niezdefiniowany.');
                }
            })
            .catch((err) => {
                // Obsługa błędów
                console.error('Błąd podczas przetwarzania zapytania do bazy danych:', err);
                if (res && res.status) {
                    //wersja gpt
                    // res.status(500).json({ error: 'Wystąpił błąd podczas przetwarzania zapytania.' });
                    // rozszerzam gpt o ver luka:
                    res.status(500).json({ error: 'Wystąpił błąd podczas przetwarzania zapytania: ${err}' });
                } else {
                    console.error('Obiekt res lub jego metoda status jest niezdefiniowany.');
                }
            });
    },

    /*     index: (req,res) => {
        // console.log('req,res',req,res);
        // Client.find('')
        Client.find({}).lean()
        .then((result) => {
            
            // jeśli sukces
            res.send(result);
            // console.warn(result.data);
            // console.warn(result);
        })
        .catch((err) => {
            /// obsługa błędów za pomocą funkcji anonimowej (err to parameter funkcji)
            console.warn(err);
            // res.send(err);
            //res.status(500).json({ error: 'Nieprawidłowe dane JSON w body' });
        });
    }, */

    // create: (_req,_res) => {
    create: (req,res) => {
        console.log('-----------------req.body: ', req.body ,'---------');
        // console.log('req,res',req,res)

        // const clientNew = new Client({name: '', address: {street: 'piotrkowska', city: 'gliwice'},nip: 6791151212, yearOf: 10});
        // const clientNew = new Client(req.parameters.id, req.body);
        // const clientNew = new Client(req.params.id, req.body);
        // const clientNew = new Client(...req.body);
        
        // const clientNew = new Client({...req.body});

        // const clientNew = new Client({req.body});
        
        const clientNew = new Client(req.body);
        

        
        clientNew.save()
        .then((result) => {
            // jeśli sukces
            res.send(result);
            console.warn(result);
            console.log('result',result);
        })
        .catch((err) => {
            /// obsługa błędów za pomocą funkcji anonimowej (err to parameter funkcji)
            console.warn('blad przy zapisie',err);
            // res.send(err);
            //res.status(500).json({ error: 'Nieprawidłowe dane JSON w body' });
        });
    },

    update: (req,res) => {
        console.log('req.params.id',req.params.id)
        
        Client.findByIdAndUpdate(req.params.id,{updated: Date().toString()})
        // Client.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            // jeśli sukces
            // res.send(result);
            res.status(201).json(result)
        })
        .catch((err) => {
            // obsługa błędów za pomocą funkcji anonimowej (err to parameter funkcji)
            // console.warn(err);
            // res.send(err);
            res.status(500).json({ error: 'Nieprawidłowe dane JSON w body', blad: err  });
        });
        
    },

    delete: (req,res) => {
        // console.log('req,res',req,res)
        Client.findByIdAndDelete(req.params.id)
        .then((result) => {
            // jeśli sukces
            res.send(result);
        })
        .catch((err) => {
            /// obsługa błędów za pomocą funkcji anonimowej (err to parameter funkcji)
            console.warn(err);
            // res.send(err);
            res.status(500).json({ error: 'Nieprawidłowe dane JSON w body', blad: err });
        });
        
    }
}
/* const clientNew = new Client({name: 'New tech sa', address: {street: 'piotrkowska', city: 'gliwice'},nip: 6791151212, yearOf: 10}); */

/* clientNew.save()
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

module.exports = clientNew; */
