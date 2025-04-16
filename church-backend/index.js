const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');// Make sure the path is correct

app.use(express.json());
app.use('/auth', authRoutes);  // This routes requests starting with '/auth' to the authRoutes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
