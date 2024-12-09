import { createConnection } from 'typeorm';
import { databaseConfig } from '../config';

async function resetDatabase() {
  try {
    console.log('Connecting to database...');
    const connection = await createConnection({
      ...databaseConfig(),
      synchronize: false,
    });

    console.log('Dropping database...');
    await connection.query('DROP SCHEMA public CASCADE');
    await connection.query('CREATE SCHEMA public');
    
    console.log('Database reset complete');
    await connection.close();
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase(); 