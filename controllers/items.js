import fs from 'fs';
const database = JSON.parse(
  fs.readFileSync('./database/database.json', 'utf-8')
);

export const GetItems = (req, res) => {
  console.log(req.session.Id);
  if (!req.session.Id) return res.status(403).json({ error: 'forbidden' });
  const items = database.users.find((user) => user.id === req.session.Id);
  res.status(200).json(items);
};

export const CreateItem = (req, res) => {
  const userIndex = database.users.findIndex(
    (user) => user.id === req.session.Id
  );
  database.users[userIndex].items.push({
    id: Number(Date.now()),
    text: req.body.text,
    checked: false,
  });
  fs.writeFileSync(
    './database/database.json',
    JSON.stringify(database, undefined, '\t')
  );
  res.status(200).json({ id: Number(Date.now()) });
};

export const DeleteItem = (req, res) => {
  const userIndex = database.users.findIndex(
    (user) => user.id === req.session.Id
  );
  const deleteIndex = database.users[userIndex].items.findIndex(
    (item) => item.id === req.body.Id
  );
  if (deleteIndex === -1) return undefined;
  database.users[userIndex].items.splice(deleteIndex, 1);
  const deleteItem = database.users[userIndex].items[deleteIndex];
  fs.writeFileSync(
    './database/database.json',
    JSON.stringify(database, undefined, '\t')
  );
  if (!deleteItem) return res.status(404).json({ ok: false });
  res.status(200).json({ ok: true });
};

export const PutItem = (req, res) => {
  const userIndex = database.users.findIndex(
    (user) => user.id === req.session.Id
  );
  const putIndex = database.users[userIndex].items.findIndex(
    (item) => item.id === req.body.id
  );
  if (putIndex === -1) return undefined;
  database.users[userIndex].items[putIndex] = req.body;
  fs.writeFileSync(
    './database/database.json',
    JSON.stringify(database, undefined, '\t')
  );
  const putItem = database.users[userIndex].items[putIndex];
  if (!putItem) return res.status(404).json({ ok: false });
  res.status(200).json({ ok: true });
};
