var express = require('express')
const fs = require('fs')
var cors = require('cors')
var app = express()
app.use(cors())

app.get('/files', function (req, res) {
  var readStream = fs.createReadStream('./Profile.pdf')
  var stat = fs.statSync('./Profile.pdf')
  // We replaced all the event handlers with a simple call to readStream.pipe()
  readStream.on('open', function () {
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': stat.size,
      'Content-Disposition': 'attachment; filename=your_file_name'
    })
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res)
  })
  readStream.on('error', function (err) {
    res.end(err)
  })
})

app.listen(3000, function () {
  console.log('listening')
})
