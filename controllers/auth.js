import fs from 'fs';
import crypto from 'crypto';

const database = JSON.parse(
  fs.readFileSync('./database/database.json', 'utf-8')
);

export const LoginUser = (req, res) => {
  if (!(req.body.login && req.body.pass))
    return res.status(404).json({ ok: false });
  const user = database.users.find(
    (user) => user.login === req.body.login && user.password === req.body.pass
  );
  if (user === undefined) return undefined;
  if (!user.id) return res.status(404).json({ error: 'Not found' });
  req.session.Id = user.id;
  res.status(200).json({ ok: true });
};

export const RegistrationUser = (req, res) => {
  const checkUser = database.users.find(
    (user) => user.login === req.body.login && user.pass === req.body.pass
  );
  if (checkUser !== undefined) return undefined;
  const Id = crypto.randomBytes(20).toString('hex');
  req.session.Id = Id;
  if (!(req.body.login && req.body.pass))
    return res.status(500).send('Internal Server Error');
  if (!Id) return res.status(400).json({ error: 'Bad Request' });
  database.users.push({
    id: Id,
    login: req.body.login,
    password: req.body.pass,
    items: [],
  });
  fs.writeFileSync(
    './database/database.json',
    JSON.stringify(database, undefined, '\t')
  );
  res.status(200).json({ ok: true });
};

export const LogoutUser = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid').json({ ok: true });
  });
};
