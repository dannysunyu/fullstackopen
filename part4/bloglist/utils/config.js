require('dotenv').config();

const PORT = process.env.PORT;

const chooseMongoEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return process.env.DEVELOPMENT_MONGODB_URI;
    case 'test':
      return process.env.TEST_MONGODB_URI;
    default:
      return process.env.MONGODB_URI;
  }
};

const MONGODB_URI = chooseMongoEnvironment();

module.exports = {
  MONGODB_URI,
  PORT
};