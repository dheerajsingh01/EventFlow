const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventController = require('./controllers/event.controller');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

console.log('Event Controller:', eventController); // Line 14
app.get('/api/events', authMiddleware, eventController.getAllEvents); // Line 15
app.post('/api/events', authMiddleware, eventController.createEvent);
app.put('/api/events/:id', authMiddleware, eventController.updateEvent);
app.delete('/api/events/:id', authMiddleware, eventController.deleteEvent);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));