import pool from '../config/database';

const createTables = async (): Promise<void> => {
  try {
    console.log('🚀 Setting up database tables...');

    // Create Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Users table created');

    // Create Stories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS stories (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Stories table created');

    // Create Contributors table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contributors (
        id SERIAL PRIMARY KEY,
        story_id INTEGER NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(story_id, user_id)
      );
    `);
    console.log('✅ Contributors table created');

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_stories_author_id ON stories(author_id);
      CREATE INDEX IF NOT EXISTS idx_stories_created_at ON stories(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_contributors_story_id ON contributors(story_id);
      CREATE INDEX IF NOT EXISTS idx_contributors_user_id ON contributors(user_id);
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    `);
    console.log('✅ Database indexes created');

    // Create function to automatically update updated_at timestamp
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create triggers for updated_at
    await pool.query(`
      DROP TRIGGER IF EXISTS update_users_updated_at ON users;
      CREATE TRIGGER update_users_updated_at 
        BEFORE UPDATE ON users 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column();

      DROP TRIGGER IF EXISTS update_stories_updated_at ON stories;
      CREATE TRIGGER update_stories_updated_at 
        BEFORE UPDATE ON stories 
        FOR EACH ROW 
        EXECUTE FUNCTION update_updated_at_column();
    `);
    console.log('✅ Database triggers created');

    console.log('🎉 Database setup completed successfully!');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  }
};

const main = async (): Promise<void> => {
  try {
    await createTables();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error);
    await pool.end();
    process.exit(1);
  }
};

// Run if this file is executed directly
if (require.main === module) {
  main();
}

export { createTables };