'use strict';

const { includes, split, map, trim, pipe } = require('lodash/fp');
const FetchStream = require('fetch').FetchStream;

const fetch = new FetchStream('https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/xato-net-10-million-passwords.txt');
const sanitize = map(trim);

const compromisedPassword = (userPassword) => {
    let compromised = false;

    return new Promise((resolve, reject) => {
        fetch.on('data', (passwords) => {
            compromised = pipe([split('\n'), sanitize, includes(userPassword)])(passwords.toString());

            if (compromised) {
                resolve(compromised);
            }
        });

        fetch.on('end', () => {
            resolve(compromised);
        });

        fetch.on('close', () => console.log('Stream closed'));
    });
};

module.exports = compromisedPassword;
