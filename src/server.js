const express = require('express')
const path = require('path')
const os = require('os')

const port = process.env.PORT || 3000
const hostname = process.env.HOSTNAME || 'localhost'

const app = express(),
            DIST_DIR = path.resolve('public'),
            HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(express.static(DIST_DIR))
app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

app.get('/api/getUsername', (req, res) =>
  res.send({ username: os.userInfo().username })
)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, hostname, () => {
    console.log(`App listening to ${port}....`)
    console.log(`Server running at http://${hostname}:${port}/`)
    console.log('Press Ctrl+C to quit.')
})