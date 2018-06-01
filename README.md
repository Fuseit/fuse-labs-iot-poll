## config local mongoDB
#### download mongoDB: https://www.mongodb.com/download-center#community

#### unpack the zip folder, rename it to mongo add place it in the user directory

#### create the data directory
> mkdir ~/mongo-data

#### go to directory and run the db
> cd ~/mongo/bin

> ./mongod --dbpath ~/mongo-data

#### access mongo db shell
> ./mongo

> show dbs \
> use FuseLabs \
> show collections \
> db.polls.find()