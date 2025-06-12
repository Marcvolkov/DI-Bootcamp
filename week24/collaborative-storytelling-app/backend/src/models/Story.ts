import pool from '../config/database';
import { Story, StoryWithAuthor, StoryCreateData, StoryUpdateData, StoryFilters } from '@storytelling/types';

export class StoryModel {
  /**
   * Create a new story
   */
  static async create(storyData: StoryCreateData & { author_id: number }): Promise<Story> {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO stories (title, content, author_id)
        VALUES ($1, $2, $3)
        RETURNING id, title, content, author_id, created_at, updated_at
      `;
      const values = [storyData.title, storyData.content, storyData.author_id];
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Find story by ID
   */
  static async findById(id: number): Promise<Story | null> {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM stories WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Find story by ID with author and contributors
   */
  static async findByIdWithDetails(id: number): Promise<StoryWithAuthor | null> {
    const client = await pool.connect();
    try {
      const storyQuery = `
        SELECT 
          s.*,
          u.id as author_id,
          u.username as author_username,
          u.email as author_email,
          u.created_at as author_created_at,
          u.updated_at as author_updated_at
        FROM stories s
        JOIN users u ON s.author_id = u.id
        WHERE s.id = $1
      `;
      
      const contributorsQuery = `
        SELECT 
          u.id,
          u.username,
          u.email,
          u.created_at,
          u.updated_at
        FROM contributors c
        JOIN users u ON c.user_id = u.id
        WHERE c.story_id = $1
        ORDER BY c.added_at
      `;

      const [storyResult, contributorsResult] = await Promise.all([
        client.query(storyQuery, [id]),
        client.query(contributorsQuery, [id])
      ]);

      if (storyResult.rows.length === 0) {
        return null;
      }

      const story = storyResult.rows[0];
      const contributors = contributorsResult.rows;

      return {
        id: story.id,
        title: story.title,
        content: story.content,
        author_id: story.author_id,
        created_at: story.created_at,
        updated_at: story.updated_at,
        author: {
          id: story.author_id,
          username: story.author_username,
          email: story.author_email,
          created_at: story.author_created_at,
          updated_at: story.author_updated_at
        },
        contributors,
        contributors_count: contributors.length
      };
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Get all stories with filters and pagination
   */
  static async findAll(filters: StoryFilters = {}): Promise<{ stories: StoryWithAuthor[]; total: number }> {
    const client = await pool.connect();
    try {
      const { author_id, search, limit = 10, offset = 0 } = filters;
      
      let whereConditions: string[] = [];
      let queryParams: any[] = [];
      let paramCounter = 1;

      // Build WHERE conditions
      if (author_id) {
        whereConditions.push(`s.author_id = $${paramCounter++}`);
        queryParams.push(author_id);
      }

      if (search) {
        whereConditions.push(`(s.title ILIKE $${paramCounter++} OR s.content ILIKE $${paramCounter++})`);
        queryParams.push(`%${search}%`, `%${search}%`);
        paramCounter++;
      }

      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

      // Count total stories
      const countQuery = `
        SELECT COUNT(*) as total
        FROM stories s
        ${whereClause}
      `;
      const countResult = await client.query(countQuery, queryParams);
      const total = parseInt(countResult.rows[0].total);

      // Get stories with author info and contributor count
      queryParams.push(limit, offset);
      const storiesQuery = `
        SELECT 
          s.*,
          u.id as author_id,
          u.username as author_username,
          u.email as author_email,
          u.created_at as author_created_at,
          u.updated_at as author_updated_at,
          COALESCE(c.contributor_count, 0) as contributors_count
        FROM stories s
        JOIN users u ON s.author_id = u.id
        LEFT JOIN (
          SELECT story_id, COUNT(*) as contributor_count
          FROM contributors
          GROUP BY story_id
        ) c ON s.id = c.story_id
        ${whereClause}
        ORDER BY s.updated_at DESC
        LIMIT $${paramCounter++} OFFSET $${paramCounter++}
      `;

      const storiesResult = await client.query(storiesQuery, queryParams);

      const stories: StoryWithAuthor[] = storiesResult.rows.map(row => ({
        id: row.id,
        title: row.title,
        content: row.content,
        author_id: row.author_id,
        created_at: row.created_at,
        updated_at: row.updated_at,
        author: {
          id: row.author_id,
          username: row.author_username,
          email: row.author_email,
          created_at: row.author_created_at,
          updated_at: row.author_updated_at
        },
        contributors: [], // Not fetched in list view for performance
        contributors_count: parseInt(row.contributors_count)
      }));

      return { stories, total };
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Update story
   */
  static async update(id: number, updateData: StoryUpdateData): Promise<Story | null> {
    const client = await pool.connect();
    try {
      const fields: string[] = [];
      const values: any[] = [];
      let paramCounter = 1;

      // Build dynamic update query
      if (updateData.title !== undefined) {
        fields.push(`title = $${paramCounter++}`);
        values.push(updateData.title);
      }
      if (updateData.content !== undefined) {
        fields.push(`content = $${paramCounter++}`);
        values.push(updateData.content);
      }

      if (fields.length === 0) {
        throw new Error('No fields to update');
      }

      values.push(id); // Add ID as the last parameter

      const query = `
        UPDATE stories 
        SET ${fields.join(', ')}
        WHERE id = $${paramCounter}
        RETURNING *
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
   * Delete story
   */
  static async delete(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM stories WHERE id = $1';
      const result = await client.query(query, [id]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Check if user is author of story
   */
  static async isAuthor(storyId: number, userId: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      const query = 'SELECT 1 FROM stories WHERE id = $1 AND author_id = $2';
      const result = await client.query(query, [storyId, userId]);
      return result.rows.length > 0;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Check if user is contributor of story
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
   * Check if user can edit story (author or contributor)
   */
  static async canEdit(storyId: number, userId: number): Promise<boolean> {
    const [isAuthor, isContributor] = await Promise.all([
      this.isAuthor(storyId, userId),
      this.isContributor(storyId, userId)
    ]);
    return isAuthor || isContributor;
  }

  /**
   * Get stories by user (authored and collaborated)
   */
  static async findByUser(userId: number): Promise<{ authored: StoryWithAuthor[]; collaborated: StoryWithAuthor[] }> {
    const client = await pool.connect();
    try {
      // Get authored stories
      const authoredQuery = `
        SELECT 
          s.*,
          u.id as author_id,
          u.username as author_username,
          u.email as author_email,
          u.created_at as author_created_at,
          u.updated_at as author_updated_at,
          COALESCE(c.contributor_count, 0) as contributors_count
        FROM stories s
        JOIN users u ON s.author_id = u.id
        LEFT JOIN (
          SELECT story_id, COUNT(*) as contributor_count
          FROM contributors
          GROUP BY story_id
        ) c ON s.id = c.story_id
        WHERE s.author_id = $1
        ORDER BY s.updated_at DESC
      `;

      // Get collaborated stories
      const collaboratedQuery = `
        SELECT 
          s.*,
          u.id as author_id,
          u.username as author_username,
          u.email as author_email,
          u.created_at as author_created_at,
          u.updated_at as author_updated_at,
          COALESCE(c.contributor_count, 0) as contributors_count
        FROM stories s
        JOIN users u ON s.author_id = u.id
        JOIN contributors cont ON s.id = cont.story_id
        LEFT JOIN (
          SELECT story_id, COUNT(*) as contributor_count
          FROM contributors
          GROUP BY story_id
        ) c ON s.id = c.story_id
        WHERE cont.user_id = $1
        ORDER BY s.updated_at DESC
      `;

      const [authoredResult, collaboratedResult] = await Promise.all([
        client.query(authoredQuery, [userId]),
        client.query(collaboratedQuery, [userId])
      ]);

      const mapToStoryWithAuthor = (rows: any[]): StoryWithAuthor[] => 
        rows.map(row => ({
          id: row.id,
          title: row.title,
          content: row.content,
          author_id: row.author_id,
          created_at: row.created_at,
          updated_at: row.updated_at,
          author: {
            id: row.author_id,
            username: row.author_username,
            email: row.author_email,
            created_at: row.author_created_at,
            updated_at: row.author_updated_at
          },
          contributors: [],
          contributors_count: parseInt(row.contributors_count)
        }));

      return {
        authored: mapToStoryWithAuthor(authoredResult.rows),
        collaborated: mapToStoryWithAuthor(collaboratedResult.rows)
      };
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}