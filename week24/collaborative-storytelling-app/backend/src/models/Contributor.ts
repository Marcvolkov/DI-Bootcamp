import pool from '../config/database';
import { Contributor, ContributorWithUser, AddContributorData } from '@storytelling/types';

export class ContributorModel {
  /**
   * Add a contributor to a story
   */
  static async add(data: AddContributorData): Promise<Contributor> {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO contributors (story_id, user_id)
        VALUES ($1, $2)
        RETURNING id, story_id, user_id, added_at
      `;
      const values = [data.story_id, data.user_id];
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      // Handle unique constraint violation
      if (error instanceof Error && 'code' in error && (error as any).code === '23505') {
        throw new Error('User is already a contributor to this story');
      }
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Remove a contributor from a story
   */
  static async remove(contributorId: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM contributors WHERE id = $1';
      const result = await client.query(query, [contributorId]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Remove contributor by story and user ID
   */
  static async removeByStoryAndUser(storyId: number, userId: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM contributors WHERE story_id = $1 AND user_id = $2';
      const result = await client.query(query, [storyId, userId]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get all contributors for a story
   */
  static async findByStoryId(storyId: number): Promise<ContributorWithUser[]> {
    const client = await pool.connect();
    try {
      const query = `
        SELECT 
          c.id,
          c.story_id,
          c.user_id,
          c.added_at,
          u.id as user_id,
          u.username,
          u.email,
          u.created_at as user_created_at,
          u.updated_at as user_updated_at
        FROM contributors c
        JOIN users u ON c.user_id = u.id
        WHERE c.story_id = $1
        ORDER BY c.added_at
      `;
      const result = await client.query(query, [storyId]);
      
      return result.rows.map(row => ({
        id: row.id,
        story_id: row.story_id,
        user_id: row.user_id,
        added_at: row.added_at,
        user: {
          id: row.user_id,
          username: row.username,
          email: row.email,
          created_at: row.user_created_at,
          updated_at: row.user_updated_at
        }
      }));
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get all stories a user contributes to
   */
  static async findByUserId(userId: number): Promise<Contributor[]> {
    const client = await pool.connect();
    try {
      const query = `
        SELECT c.*
        FROM contributors c
        WHERE c.user_id = $1
        ORDER BY c.added_at DESC
      `;
      const result = await client.query(query, [userId]);
      return result.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Check if user is a contributor to a story
   */
  static async isContributor(storyId: number, userId: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'SELECT 1 FROM contributors WHERE story_id = $1 AND user_id = $2';
      const result = await client.query(query, [storyId, userId]);
      return result.rows.length > 0;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get contributor by ID
   */
  static async findById(id: number): Promise<Contributor | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM contributors WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get contributor with user details by ID
   */
  static async findByIdWithUser(id: number): Promise<ContributorWithUser | null> {
    const client = await pool.connect();
    try {
      const query = `
        SELECT 
          c.*,
          u.id as user_id,
          u.username,
          u.email,
          u.created_at as user_created_at,
          u.updated_at as user_updated_at
        FROM contributors c
        JOIN users u ON c.user_id = u.id
        WHERE c.id = $1
      `;
      const result = await client.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return {
        id: row.id,
        story_id: row.story_id,
        user_id: row.user_id,
        added_at: row.added_at,
        user: {
          id: row.user_id,
          username: row.username,
          email: row.email,
          created_at: row.user_created_at,
          updated_at: row.user_updated_at
        }
      };
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Count contributors for a story
   */
  static async countByStoryId(storyId: number): Promise<number> {
    const client = await pool.connect();
    try {
      const query = 'SELECT COUNT(*) as count FROM contributors WHERE story_id = $1';
      const result = await client.query(query, [storyId]);
      return parseInt(result.rows[0].count);
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get stories with contributor count for a user
   */
  static async getStoriesWithContributorCount(userId: number): Promise<any[]> {
    const client = await pool.connect();
    try {
      const query = `
        SELECT 
          s.*,
          COUNT(c.user_id) as contributor_count
        FROM stories s
        LEFT JOIN contributors c ON s.id = c.story_id
        WHERE s.author_id = $1
        GROUP BY s.id
        ORDER BY s.updated_at DESC
      `;
      const result = await client.query(query, [userId]);
      return result.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}