const app = require('./app.js');
const { PORT } = require('./config');

app.listen(PORT, () => {
    console.log(`Serwer został uruchomiony na porcie = ${PORT}`);
});