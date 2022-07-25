const notes = require('express').Router();
const { randomUUID } = require('crypto');
const fs = require('fs');
notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            // Convert string into JSON object
            const parsedNotes = JSON.parse(data);
            res.json(parsedNotes)



        }
    })
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newReview = {
            title,
            text,
            id: uuid(),

        };

        function uuid() {
            return Math.floor((1 + Math.random()) * 0x1000)
                .toString(16)
                .substring(1);
        }

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);


                parsedNotes.push(newReview);


                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                    writeErr ?
                    console.error(writeErr) :
                    console.info('Successfully updated reviews!')
                );
            }
        });

        const response = {
            status: 'success',
            body: newReview,
        };

        console.log(response);
        res.json(response);
    } else {
        res.json('Error in posting review');
    }

});


module.exports = notes;