# Second challenge

This challenge checks the passwords against [xato-net-10-million-passwords](https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/xato-net-10-million-passwords.txt)

## Goal

The goal of this challenge is being able to see if the user password is in the *xato net 10 million passwords* file or not.

One requirement is to handle the file with streams.

## Run the challenge

Navigate to check-password folder and install the project

> npm i

now, check your password

> node index [your password]

It would tell you if the password is in the file or not
