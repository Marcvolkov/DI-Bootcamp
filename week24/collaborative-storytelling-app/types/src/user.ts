export interface User {
  id: number;
  username: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  created_at: Date;
  stories_count: number;
  collaborations_count: number;
}

export interface UserUpdate {
  username?: string;
  email?: string;
}