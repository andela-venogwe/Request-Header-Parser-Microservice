'use strict'
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress ||
    req.ip;
  const language = req.headers["accept-language"].split(',')[0];
  const software = req.headers['user-agent'].replace(/.*\((.*\d)\).*/, '$1');
  res.status(200).json({ ipaddress: ip.replace('::ffff:', ''), language, software });
});

app.listen(port, () => {
  console.log(`headers api started running on port ${port}`);
});

module.exports = app;
