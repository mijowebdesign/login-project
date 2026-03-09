require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Zameni sa portom tvog frontenda (npr. 3000 ili 5173)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// 1. Povezivanje na MongoDB
// Zameni 'login_db' sa imenom tvoje baze. 
// Ako koristiš MongoDB Atlas, ovde ide tvoj "Connection String"
const MONGO_URI = process.env.MONGO_URI; 

mongoose.connect(MONGO_URI)
  .then(() => console.log('Povezano sa MongoDB bazom'))
  .catch(err => console.error('Greška pri povezivanju na MongoDB:', err));

// 2. Definisanje šeme korisnika
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// 3. Ruta za registraciju (Upis korisnika u bazu)
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Provera da li korisnik već postoji
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Korisnik sa tim emailom već postoji' });
    }

    // Hešovanje lozinke pre čuvanja
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'Korisnik uspešno registrovan' });
  } catch (error) {
    res.status(500).json({ message: 'Greška na serveru prilikom registracije' });
  }
});

// 4. Ruta za Login (Provera iz baze)
app.post('/login', async (req, res) => {
  console.log("Login zahtev primljen za:", req.body.email); // LOG 1
  try {
    const { email, password } = req.body;

    // Pronalaženje korisnika u bazi
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Pogrešan email ili lozinka' });
    }
    console.log("Korisnik pronađen:", user ? "Da" : "Ne"); // LOG 2

    // Provera lozinke pomoću bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Pogrešan email ili lozinka' });
    }

    // Uspešan login
    res.status(200).json({
      message: 'Uspešna prijava',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Greška u login ruti:", error); // LOG 3
    res.status(500).json({ message: 'Greška na serveru prilikom prijave' });
  }
});

// Globalni error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Nešto je puklo!');
});

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});