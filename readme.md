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