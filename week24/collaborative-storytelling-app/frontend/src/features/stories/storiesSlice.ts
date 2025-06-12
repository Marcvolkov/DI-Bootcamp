import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Story, CreateStoryRequest, UpdateStoryRequest, ContributorWithUser } from '@storytelling/types';
import { api } from '../../app/utils/api';

interface StoriesState {
  stories: Story[];
  currentStory: Story | null;
  contributors: ContributorWithUser[];
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    search: string;
    status: 'all' | 'active' | 'completed';
    sortBy: 'created_at' | 'updated_at' | 'title';
    sortOrder: 'asc' | 'desc';
    page?: number;
  };
}

const initialState: StoriesState = {
  stories: [],
  currentStory: null,
  contributors: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {
    search: '',
    status: 'all',
    sortBy: 'updated_at',
    sortOrder: 'desc',
  },
};

export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async (params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
      
      const response = await api.get(`/stories?${queryParams.toString()}`);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Failed to fetch stories'
      );
    }
  }
);

export const fetchStoryById = createAsyncThunk(
  'stories/fetchStoryById',
  async (storyId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/stories/${storyId}`);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Failed to fetch story'
      );
    }
  }
);

export const createStory = createAsyncThunk(
  'stories/createStory',
  async (storyData: CreateStoryRequest, { rejectWithValue }) => {
    try {
      const response = await api.post('/stories', storyData);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Failed to create story'
      );
    }
  }
);

export const updateStory = createAsyncThunk(
  'stories/updateStory',
  async ({ storyId, updates }: { storyId: number; updates: UpdateStoryRequest }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/stories/${storyId}`, updates);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Failed to update story'
      );
    }
  }
);

export const deleteStory = createAsyncThunk(
  'stories/deleteStory',
  async (storyId: number, { rejectWithValue }) => {
    try {
      await api.delete(`/stories/${storyId}`);
      return { storyId };
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Failed to delete story'
      );
    }
  }
);

export const fetchContributors = createAsyncThunk(
  'stories/fetchContributors',
  async (storyId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/stories/${storyId}/contributors`);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Failed to fetch contributors'
      );
    }
  }
);

export const addContributor = createAsyncThunk(
  'stories/addContributor',
  async ({ storyId, userId }: { storyId: number; userId: number }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/stories/${storyId}/contributors`, { userId });
      return response.data;
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Failed to add contributor'
      );
    }
  }
);

export const removeContributor = createAsyncThunk(
  'stories/removeContributor',
  async ({ storyId, contributorId }: { storyId: number; contributorId: number }, { rejectWithValue }) => {
    try {
      await api.delete(`/stories/${storyId}/contributors/${contributorId}`);
      return { contributorId };
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        apiError.response?.data?.message || 'Failed to remove contributor'
      );
    }
  }
);

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentStory: (state) => {
      state.currentStory = null;
    },
    setFilters: (state, action: PayloadAction<Partial<StoriesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action: PayloadAction<Partial<StoriesState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    optimisticUpdateStory: (state, action: PayloadAction<{ storyId: number; updates: Partial<Story> }>) => {
      const { storyId, updates } = action.payload;
      const storyIndex = state.stories.findIndex(story => story.id === storyId);
      
      if (storyIndex !== -1) {
        state.stories[storyIndex] = { ...state.stories[storyIndex], ...updates };
      }
      
      if (state.currentStory?.id === storyId) {
        state.currentStory = { ...state.currentStory, ...updates };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Stories
      .addCase(fetchStories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stories = action.payload.stories;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        };
        state.error = null;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Story by ID
      .addCase(fetchStoryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentStory = action.payload;
        state.error = null;
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
      // Create Story
      .addCase(createStory.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.isCreating = false;
        state.stories.unshift(action.payload);
        state.currentStory = action.payload;
        state.error = null;
      })
      .addCase(createStory.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      
      // Update Story
      .addCase(updateStory.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        state.isUpdating = false;
        const updatedStory = action.payload;
        const storyIndex = state.stories.findIndex(story => story.id === updatedStory.id);
        
        if (storyIndex !== -1) {
          state.stories[storyIndex] = updatedStory;
        }
        
        if (state.currentStory?.id === updatedStory.id) {
          state.currentStory = updatedStory;
        }
        
        state.error = null;
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })
      
      // Delete Story
      .addCase(deleteStory.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.isDeleting = false;
        const { storyId } = action.payload;
        state.stories = state.stories.filter(story => story.id !== storyId);
        
        if (state.currentStory?.id === storyId) {
          state.currentStory = null;
        }
        
        state.error = null;
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      })
      
      // Fetch Contributors
      .addCase(fetchContributors.fulfilled, (state, action) => {
        state.contributors = action.payload;
      })
      
      // Add Contributor
      .addCase(addContributor.fulfilled, (state, action) => {
        state.contributors.push(action.payload);
      })
      
      // Remove Contributor
      .addCase(removeContributor.fulfilled, (state, action) => {
        const { contributorId } = action.payload;
        state.contributors = state.contributors.filter(contributor => contributor.id !== contributorId);
      });
  },
});

export const { 
  clearError, 
  clearCurrentStory, 
  setFilters, 
  setPagination, 
  optimisticUpdateStory 
} = storiesSlice.actions;

export default storiesSlice.reducer;