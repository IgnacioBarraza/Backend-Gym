import express, { json, urlencoded } from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/', (req, res) => {
  res.status(200).json({ message: "Server up!" });
});

app.listen(port, () => {
  console.log("Server listening on port!", port);
});