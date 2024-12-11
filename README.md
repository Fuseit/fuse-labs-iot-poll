> [!WARNING]
> This repo is not in use and has been deprecated. It will eventually be deleted.

## config local mongoDB
#### 1- download mongoDB: https://www.mongodb.com/download-center#community

#### 2- unpack the zip folder, rename it to mongo add place it in the user directory

#### 3- create the data directory
> mkdir ~/mongo-data

#### 4- go to directory and run the db
> cd ~/mongo/bin

> ./mongod --dbpath ~/mongo-data

#### 5- access mongo db shell
> ./mongo

> show dbs \
> use FuseLabs \
> show collections \
> db.polls.find()
