import pool from '../config/database';
import { User, UserRegistrationData, UserProfile } from '@storytelling/types';
import { PoolClient } from 'pg';

export class UserModel {
  /**
   * Create a new user
   */
  static async create(userData: UserRegistrationData & { password_hash: string }): Promise<User> {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO users (username, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, username, email, created_at, updated_at
      `;
      const values = [userData.username, userData.email, userData.password_hash];
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Find user by email
   */
  static async findByEmail(email: string): Promise<User | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await client.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Find user by username
   */
  static async findByUsername(username: string): Promise<User | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE username = $1';
      const result = await client.query(query, [username]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Find user by ID
   */
  static async findById(id: number): Promise<User | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT id, username, email, created_at, updated_at FROM users WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get user profile with additional statistics
   */
  static async getProfile(userId: number): Promise<UserProfile | null> {
    const client = await pool.connect();
    try {
      const query = `
        SELECT 
          u.id,
          u.username,
          u.email,
          u.created_at,
          COALESCE(stories_count.count, 0) as stories_count,
          COALESCE(collaborations_count.count, 0) as collaborations_count
        FROM users u
        LEFT JOIN (
          SELECT author_id, COUNT(*) as count
          FROM stories
          GROUP BY author_id
        ) stories_count ON u.id = stories_count.author_id
        LEFT JOIN (
          SELECT user_id, COUNT(*) as count
          FROM contributors
          GROUP BY user_id
        ) collaborations_count ON u.id = collaborations_count.user_id
        WHERE u.id = $1
      `;
      const result = await client.query(query, [userId]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Update user information
   */
  static async update(id: number, updateData: Partial<Pick<User, 'username' | 'email'>>): Promise<User | null> {
    const client = await pool.connect();
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let paramCounter = 1;

      // Build dynamic update query
      if (updateData.username !== undefined) {
        fields.push(`username = $${paramCounter++}`);
        values.push(updateData.username);
      }
      if (updateData.email !== undefined) {
        fields.push(`email = $${paramCounter++}`);
        values.push(updateData.email);
      }

      if (fields.length === 0) {
        throw new Error('No fields to update');
      }

      values.push(id); // Add ID as the last parameter

      const query = `
        UPDATE users 
        SET ${fields.join(', ')}
        WHERE id = $${paramCounter}
        RETURNING id, username, email, created_at, updated_at
      `;

      const result = await client.query(query, values);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Delete user
   */
  static async delete(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      const result = await client.query(query, [id]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Check if user exists
   */
  static async exists(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'SELECT 1 FROM users WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows.length > 0;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get user with password hash (for authentication)
   */
  static async findByEmailWithPassword(email: string): Promise<(User & { password_hash: string }) | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await client.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Search users by username or email
   */
  static async search(searchTerm: string, limit: number = 10): Promise<User[]> {
    const client = await pool.connect();
    try {
      const query = `
        SELECT id, username, email, created_at, updated_at
        FROM users
        WHERE username ILIKE $1 OR email ILIKE $1
        ORDER BY username
        LIMIT $2
      `;
      const result = await client.query(query, [`%${searchTerm}%`, limit]);
      return result.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}