
Start DB:
mongod --port 27017 --dbpath /Users/cee/Desktop/Blog/Blog/database
Connect DB:
mongo --port 27017 -u "hungvu" -p "vuhung" --authenticationDatabase "blogMongoDB"

lsof -i :27017

kill -9 [process]


npm i -s express-generater -g
express --view=ejs Blog
edit to 
```
  "scripts": {
    "start": "nodemon ./bin/www --exec babel-node"
  },
```

npm i --save-dev nodemon babel-cli babel-preset-env

 create .babelrc file and write down:

```
{
  "presets": [
    "env"
  ]
}

```
npm i
npm start

tab server Start DB:
mongod --port 27017 --dbpath /Users/cee/Desktop/Blog/Blog/database

client tab: 
mongo --port 27017

use blogMongoDB

db.createUser({
  user: "hungvu",
  pwd: "vuhung",
  roles: ["readWrite", "dbAdmin", "dbOwner"]
})

tab server: 
mongod --auth --port 27017 --dbpath /Users/cee/Desktop/Blog/Blog/database

tab client:
command + c

mongo --port 27017 -u "hungvu" -p "vuhung" --authenticationDatabase "blogMongoDB"

use blogMongoDB

show collections