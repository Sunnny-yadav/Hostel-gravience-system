const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Hostel-Management',
  password: 'Om@9529388077',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});


app.post('/register', async (req, res) => {
  const { name, branch, year, email, password } = req.body;

  if (!name || !branch || !year || !email || !password) {
    return res.status(400).json({ message: 'Please fill all the fields' });
  }

  try {

    const emailCheck = await pool.query('SELECT * FROM students WHERE email = $1', [email]);

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const result = await pool.query(
      'INSERT INTO students (name, branch, year, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, branch, year, email, hashedPassword]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error registering user:', error);


    if (error.code === '23505') {
      return res.status(400).json({ message: 'Email already registered' });
    }


    console.error('Detailed error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
