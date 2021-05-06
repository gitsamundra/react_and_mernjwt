const mognoose = require('mongoose');


mognoose.connect('mongodb://localhost:27017/mernauth', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
});

mognoose.connection.on('error', () => console.log('Error on connection.'));
mognoose.connection.on('connected', () => console.log('MongoDB database connected'));