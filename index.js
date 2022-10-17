import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import {fileURLToPath} from 'url';

import transactionsRoutes from './routes/transactions.js';

const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(fileUpload());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.text())
app.use(express.static('static'))


app.use('/transactions', transactionsRoutes);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'static', 'eth.png')));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))