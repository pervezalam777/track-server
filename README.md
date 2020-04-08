# Track server
This application use express framework along with mongodb as database


## How to run
* Start mongodb sever
```bash
# run following command on a terminal/console if you have mongodb local installed.
> mongod
```
* To start dev server
```bash
# Open new terminal window then run following two commands one by one

# Install all the dependencies 
> npm install

# Run development server
> npm run dev
```


## Rainbow Table Attack
Malicious user gets list of top 5000 used password, run bcrypt for each then compare then with the hashed passwords to hashes stored in database

## Dictionary Attack
Typically a guessing attack which uses pre-compiled list of options. Rather than trying every option, only try complete options which are likely to work.

## References