const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
   useNewUrlParse: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;
