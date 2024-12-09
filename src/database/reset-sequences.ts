import { DataSource } from 'typeorm';

export async function resetSequences(dataSource: DataSource) {
  try {
    // First, clean up existing data
    await dataSource.query('TRUNCATE TABLE position CASCADE');
    await dataSource.query('TRUNCATE TABLE department CASCADE');
    await dataSource.query('TRUNCATE TABLE role CASCADE');

    // Reset sequences
    await dataSource.query(
      'ALTER SEQUENCE department_department_id_seq RESTART WITH 1',
    );
    await dataSource.query(
      'ALTER SEQUENCE position_position_id_seq RESTART WITH 1',
    );
    await dataSource.query('ALTER SEQUENCE role_role_id_seq RESTART WITH 1');

    console.log('✅ All sequences have been reset successfully');
  } catch (error) {
    console.error('❌ Error resetting sequences:', error);
    throw error;
  }
}
