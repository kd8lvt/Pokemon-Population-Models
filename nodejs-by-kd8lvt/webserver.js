let express = require('express');
let port = process.argv[2] || 8080;
let app = express();
app.use(express.static('web'));

app.listen(port, () => console.log(`Webapp listening on port ${port}!`));