import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchStories } from '../../features/stories/storiesSlice';
import { openModal } from '../../features/ui/uiSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { stories, isLoading } = useAppSelector((state) => state.stories);

  useEffect(() => {
    // Fetch recent stories on page load
    dispatch(fetchStories({ page: 1, limit: 6 }));
  }, [dispatch]);

  const handleCreateStory = () => {
    dispatch(openModal('createStory'));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-base-content/70">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="hero min-h-[40vh] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl mb-8">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-base-content">
              Welcome back, {user?.username}!
            </h1>
            <p className="py-6 text-base-content/70">
              Continue your storytelling journey or start a new collaborative adventure.
            </p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleCreateStory}
            >
              Create New Story
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats shadow mb-8 w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <div className="stat-title">Total Stories</div>
          <div className="stat-value text-primary">{stories.length}</div>
          <div className="stat-desc">Stories you've created or contributed to</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <div className="stat-title">Collaborations</div>
          <div className="stat-value text-secondary">0</div>
          <div className="stat-desc">Active collaborative projects</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="stat-title">Favorite Stories</div>
          <div className="stat-value text-accent">0</div>
          <div className="stat-desc">Stories you've liked</div>
        </div>
      </div>

      {/* Recent Stories */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Stories</h2>
          <Link to="/stories" className="btn btn-outline">
            View All Stories
          </Link>
        </div>

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.slice(0, 6).map((story) => (
              <div key={story.id} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <h3 className="card-title line-clamp-2">{story.title}</h3>
                  <p className="text-base-content/70 line-clamp-3">
                    {story.content.substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          <span className="text-xs">A</span>
                        </div>
                      </div>
                      <span className="text-sm text-base-content/70">Author</span>
                    </div>
                    <Link 
                      to={`/stories/${story.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-base-content/30" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No stories yet</h3>
            <p className="text-base-content/70 mb-4">
              Start your storytelling journey by creating your first story!
            </p>
            <button 
              className="btn btn-primary"
              onClick={handleCreateStory}
            >
              Create Your First Story
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-primary text-primary-content shadow-lg">
          <div className="card-body">
            <h3 className="card-title">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Start Writing
            </h3>
            <p>Create a new story and invite others to collaborate.</p>
            <div className="card-actions justify-end">
              <button 
                className="btn btn-secondary"
                onClick={handleCreateStory}
              >
                Create Story
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-lg">
          <div className="card-body">
            <h3 className="card-title">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              Join Collaboration
            </h3>
            <p>Explore stories where you can contribute and collaborate.</p>
            <div className="card-actions justify-end">
              <Link to="/stories" className="btn btn-primary">
                Browse Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;