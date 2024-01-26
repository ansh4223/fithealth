const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

const doctorsFilePath = path.join(__dirname, 'doctors.json');
const doctors = JSON.parse(fs.readFileSync(doctorsFilePath, 'utf-8'));

app.use(cors());

app.get('/api/doctors', (req, res) => {
  const { city } = req.query;

  if (city) {
    const filteredDoctors = doctors.filter((doctor) => doctor.city === city);
    return res.json({ doctors: filteredDoctors });
  }

  return res.json({ doctors });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
