import { User } from './user';
import { Story } from './story';

export interface Contributor {
  id: number;
  story_id: number;
  user_id: number;
  added_at: Date;
}

export interface ContributorWithUser extends Contributor {
  user: User;
}

export interface ContributorWithStory extends Contributor {
  story: Story;
}

export interface AddContributorData {
  story_id: number;
  user_id: number;
}

export interface ContributorPermissions {
  canEdit: boolean;
  canDelete: boolean;
  canAddContributors: boolean;
}