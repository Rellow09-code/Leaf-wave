const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use your Neon connection string
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false } // Neon requires SSL
  },
  logging: false, // disable SQL logging in console
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to Neon established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

testConnection();

// DB sync
sequelize.sync().then(() => {
  console.log('✅ Database synced.');
});


module.exports = sequelize;
