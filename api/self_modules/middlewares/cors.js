const whitelist = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://reseaux-project-faille-app.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
