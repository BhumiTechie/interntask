const express = require('express');
const mongoose = require('mongoose');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/whatsapp_extension', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
   
});

const app = express();
const PORT = process.env.PORT || 3000;


const contactSchema = new mongoose.Schema({
    name: String,
    status: String
});
const Contact = mongoose.model('Contact', contactSchema);

// API endpoint to get contacts
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running`) })

