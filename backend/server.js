const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


const complaintSchema = new mongoose.Schema({
    Room: {
      type: String,
      required: true, // Room number is required
    },
    about: {
      type: String,
      required: true, // Description of the complaint is required
      minlength: 10, // Minimum length for the description
    },
    ComplaintName: {
      type: String,
      required: true, // Complaint name is required
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the date when the complaint is created
    },
  });
  
  // Create a model from the schema
  const Complaint = mongoose.model('Complaint', complaintSchema);
  

// Student Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Student = mongoose.model('Student', studentSchema);

// Warden Schema
const wardenSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    phone: { type: String, required: true }
});

const Warden = mongoose.model('Warden', wardenSchema);

// Student Registration
app.post('/api/register', async (req, res) => {
    const { name, branch, year, email, password } = req.body;

    try {
        const newStudent = new Student({ name, branch, year, email, password });
        await newStudent.save();
        res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Warden Registration
app.post('/api/warden/register', async (req, res) => {
    const { userName, email, password, city, state, pincode, phone } = req.body;

    try {
        const newWarden = new Warden({ userName, email, password, city, state, pincode, phone });
        await newWarden.save();
        res.status(201).json({ message: 'Warden registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        console.error("Warden registration error:", error); // Log the full error details
        res.status(500).json({ message: 'Server error' });
    }
});


// Fetch all students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all wardens
app.get('/api/wardens', async (req, res) => {
    try {
        const wardens = await Warden.find();
        res.status(200).json(wardens);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Student Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(400).json({ message: 'Student not found' });
        }

        if (student.password !== password) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', student });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Warden Login
app.post('/api/warden/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const warden = await Warden.findOne({ email });

        if (!warden) {
            return res.status(400).json({ message: 'Warden not found' });
        }

        if (warden.password !== password) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', warden });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
    
    // Submit a Complaint
app.post('/api/complaints', async (req, res) => {
    const { Room, about, ComplaintName } = req.body;

    try {
        const newComplaint = new Complaint({ Room, about, ComplaintName });
        await newComplaint.save();
        res.status(201).json({ message: 'Complaint submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error while submitting complaint' });
    }
});

// Fetch all Complaints
app.get('/api/complaints', async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching complaints' });
    }
});


// MongoDB connection and Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const dbURI = 'ur mongoDB url';

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((error) => {
        console.error('Connection failed:', error.message);
    });
