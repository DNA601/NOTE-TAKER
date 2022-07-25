const notes = require('express').Router();
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

        };

        // Obtain existing reviews
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);

                // Add a new review
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