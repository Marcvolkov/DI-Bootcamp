import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchStoryById, deleteStory, fetchContributors } from '../../features/stories/storiesSlice';
import { openModal } from '../../features/ui/uiSlice';
import { showSuccessNotification } from '../../features/ui/uiSlice';

const StoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { currentStory, contributors, isLoading, isDeleting } = useAppSelector((state) => state.stories);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      const storyId = parseInt(id);
      if (!isNaN(storyId)) {
        dispatch(fetchStoryById(storyId));
        dispatch(fetchContributors(storyId));
      }
    }
  }, [dispatch, id]);

  const handleEdit = () => {
    dispatch(openModal('editStory'));
  };

  const handleDelete = async () => {
    if (!currentStory || !window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      return;
    }

    try {
      await dispatch(deleteStory(currentStory.id)).unwrap();
      dispatch(showSuccessNotification('Success', 'Story deleted successfully'));
      navigate('/stories');
    } catch (error) {
      console.error('Failed to delete story:', error);
    }
  };

  const handleAddContributor = () => {
    dispatch(openModal('addContributor'));
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isAuthor = currentStory && user && currentStory.author_id === user.id;
  const isContributor = contributors.some(contributor => contributor.user_id === user?.id);
  const canEdit = isAuthor || isContributor;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-base-content/70">Loading story...</p>
        </div>
      </div>
    );
  }

  if (!currentStory) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-base-content mb-4">Story Not Found</h2>
        <p className="text-base-content/70 mb-8">
          The story you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/stories" className="btn btn-primary">
          Back to Stories
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-6">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/stories">Stories</Link></li>
          <li className="text-base-content/70">{currentStory.title}</li>
        </ul>
      </div>

      {/* Story Header */}
      <div className="card bg-base-200 shadow-lg mb-8">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-base-content mb-2">
                {currentStory.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
                <div className="flex items-center">
                  <div className="avatar placeholder mr-2">
                    <div className="bg-primary text-primary-content rounded-full w-8">
                      <span className="text-xs">A</span>
                    </div>
                  </div>
                  <span>By Author</span>
                  {isAuthor && <span className="badge badge-primary badge-sm ml-2">You</span>}
                </div>
                
                <span>Created: {formatDate(currentStory.created_at)}</span>
                <span>Updated: {formatDate(currentStory.updated_at)}</span>
                <span>{currentStory.content.split(' ').length} words</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4 lg:mt-0">
              {canEdit && (
                <button onClick={handleEdit} className="btn btn-primary btn-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </button>
              )}
              
              {isAuthor && (
                <>
                  <button onClick={handleAddContributor} className="btn btn-outline btn-sm">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                    </svg>
                    Add Contributor
                  </button>
                  
                  <button 
                    onClick={handleDelete} 
                    disabled={isDeleting}
                    className="btn btn-error btn-outline btn-sm"
                  >
                    {isDeleting ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Delete
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Contributors */}
          {contributors.length > 0 && (
            <div className="border-t border-base-300 pt-4">
              <h3 className="font-semibold mb-2">Contributors ({contributors.length})</h3>
              <div className="flex flex-wrap gap-2">
                {contributors.map((contributor) => (
                  <div key={contributor.id} className="badge badge-outline">
                    {contributor.user?.username || `User ${contributor.user_id}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Story Content */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap leading-relaxed">
              {currentStory.content}
            </div>
          </div>
        </div>
      </div>

      {/* Story Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="stat bg-base-200 shadow-lg rounded-lg">
          <div className="stat-figure text-primary">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <div className="stat-title">Words</div>
          <div className="stat-value text-primary">{currentStory.content.split(' ').length}</div>
        </div>

        <div className="stat bg-base-200 shadow-lg rounded-lg">
          <div className="stat-figure text-secondary">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <div className="stat-title">Contributors</div>
          <div className="stat-value text-secondary">{contributors.length}</div>
        </div>

        <div className="stat bg-base-200 shadow-lg rounded-lg">
          <div className="stat-figure text-accent">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <div className="stat-title">Characters</div>
          <div className="stat-value text-accent">{currentStory.content.length}</div>
        </div>
      </div>

      {/* Related Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link to="/stories" className="btn btn-outline flex-1">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Stories
        </Link>
        
        {!canEdit && (
          <button className="btn btn-primary flex-1">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            Request to Collaborate
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryDetailPage;