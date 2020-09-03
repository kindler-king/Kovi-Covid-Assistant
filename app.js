const express = require('express');
const http = require('http');

const app = express();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`SERVER STARTED ON, ${PORT}`));
