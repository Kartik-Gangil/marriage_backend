const express = require('express');
const cors = require('cors');
const mongoose = require('./db');
const Carrer = require('./model/carrer');
const WeedingEntry = require('./model/weeding_entry');
const user = require('./model/user');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8000;
const sendMail = require('./mail');
mongoose.connection.on('connected', () => {
    console.log('Connected to DB');
});

app.get('/', (req, res) => { res.send('Hello World!'); });



app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await user.findOne({ email });
        if (userData && userData.password === password) {
            res.status(200).json({ message: "Login successful", data: userData });
        } else {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const data = await user.create({ name, email, password });
        res.status(201).json({ message: "User registered successfully", data });
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    // Here you would normally save the user to the database
});



app.post('/api/carrers', async (req, res) => {
    const { name, cast, age, education, workExperience, mobile, address } = req.body;
    try {
        const data = await Carrer.create({
            name, cast, age, education, workExperience, mobile, address
        })
        await sendMail("shyama911@zohomail.in",
            `<h2>Carrer Entry</h2><p>Name: ${name}</p>
            <p>village: ${village}</p>
            <p>Mobile: ${mobile}</p>
            <p>Age: ${age}</p>
            <p>work experience: ${workExperience}</p>
            <p>Address: ${address}</p>
            <p>Education: ${education}</p>`
        )
        return res.status(200).json({ data });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error.message });
    }
});

app.post('/api/marriage', async (req, res) => {
    const { name, fatherName, caste, subCaste, dateOfBirth, age, education, maritalStatus, profession, color, weight, cityOrPlace, societyOrCommunity, expectedPartnerAge, maternalUncleProfession, mobileNo, land, address } = req.body;
    try {
        const data = await WeedingEntry.create({
            name, fatherName, caste, subCaste, dateOfBirth, age, education, maritalStatus, profession, color, weight, cityOrPlace, societyOrCommunity, expectedPartnerAge, maternalUncleProfession, mobileNo,land, address
        })
        await sendMail(
            "shyama911@zohomail.in",
            `
  <h2>Marriage Registration Entry</h2>

  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Father Name:</strong> ${fatherName}</p>
  <p><strong>Caste:</strong> ${caste}</p>
  <p><strong>Sub Caste / Gotra:</strong> ${subCaste}</p>
  <p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
  <p><strong>Age:</strong> ${age}</p>
  <p><strong>Education:</strong> ${education}</p>
  <p><strong>Marital Status:</strong> ${maritalStatus}</p>
  <p><strong>Profession:</strong> ${profession}</p>
  <p><strong>Color:</strong> ${color}</p>
  <p><strong>Weight:</strong> ${weight}</p>
  <p><strong>City / Place:</strong> ${cityOrPlace}</p>
  <p><strong>Society / Community:</strong> ${societyOrCommunity}</p>
  <p><strong>Expected Partner Age:</strong> ${expectedPartnerAge}</p>
  <p><strong>Maternal Uncle Profession:</strong> ${maternalUncleProfession}</p>
  <p><strong>Mobile No:</strong> ${mobileNo}</p>
  <p><strong>Land:</strong> ${land}</p>
  <p><strong>Address:</strong> ${address}</p>
  `
        );
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


app.get('/api/getMarriageEntries', async (req, res) => {
    try {
        const data = await WeedingEntry.find();
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.get('/api/getCarrerEntries', async (req, res) => {
    try {
        const data = await Carrer.find();
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
