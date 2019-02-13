const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen("8077", function() {
    console.log('server start')
})