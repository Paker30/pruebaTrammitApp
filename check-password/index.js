'use strict';

const checkPassword = require('./checkPassword');

checkPassword(process.argv[2])
    .then((validPassword) => {
        console.log(`Your password ${process.argv[2]} is compromised: ${validPassword}`);
    })
    .catch(() => {
        console.error('Ups... something went wrong');
    })
    .finally(() => {
        process.exit(0);
    });