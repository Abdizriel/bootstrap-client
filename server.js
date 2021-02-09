const express = require('express')
const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join('build', 'index.html'))
  })
}

app.listen(process.env.PORT || 8080)
