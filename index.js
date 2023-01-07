import express from 'express';
import routerApp from './router/server.js';
import routerAuth from './router/auth.js';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import cors from 'cors';
import router from './router/route.js';

const PORT = 3000;

const app = express();
const FileStore = sessionFileStore(session);

app.use(
  session({
    store: new FileStore({ retries: 0 }),
    secret: 'samiyslozhnyparol',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.static('static'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use('/api/v1', routerApp, routerAuth);
app.use('/api/v2', router);

app.listen(PORT, () => {
  console.log(`Server start on port - ${PORT}`);
});
