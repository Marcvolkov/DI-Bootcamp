import { User } from './user';

export interface Story {
  id: number;
  title: string;
  content: string;
  author_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface StoryWithAuthor extends Story {
  author: User;
  contributors: User[];
  contributors_count: number;
}

export interface StoryCreateData {
  title: string;
  content: string;
}

export interface CreateStoryRequest {
  title: string;
  content: string;
}

export interface StoryUpdateData {
  title?: string;
  content?: string;
}

export interface UpdateStoryRequest {
  title?: string;
  content?: string;
}

export interface StoryFilters {
  author_id?: number;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface StoryListResponse {
  stories: StoryWithAuthor[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}