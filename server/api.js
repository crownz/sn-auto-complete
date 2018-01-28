import express from 'express';

const app = express();

app.get('/kebab', (req, res) => {
  const kebab = {
    sauce: 'mix',
    meat: 'chicken',
    origin: 'Liuks kebabai',
    message: 'Have a tasty kebab, sir :)',
  };

  res.status(200).json(kebab);
});

export default app;
