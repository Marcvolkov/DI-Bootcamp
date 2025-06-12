import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchStories, setFilters } from '../../features/stories/storiesSlice';
import { openModal } from '../../features/ui/uiSlice';

const StoriesPage = () => {
  const dispatch = useAppDispatch();
  const { stories, isLoading, filters, pagination } = useAppSelector((state) => state.stories);
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    // Fetch stories with current filters
    dispatch(fetchStories({
      page: pagination.page,
      limit: pagination.limit,
      search: filters.search,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    }));
  }, [dispatch, filters, pagination.page, pagination.limit]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch(setFilters({ search: searchInput }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split('-') as [string, 'asc' | 'desc'];
    dispatch(setFilters({ sortBy: sortBy as 'created_at' | 'updated_at' | 'title', sortOrder }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ status: e.target.value as 'all' | 'active' | 'completed' }));
  };

  const handleCreateStory = () => {
    dispatch(openModal('createStory'));
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading && stories.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-base-content/70">Loading stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-base-content">All Stories</h1>
          <p className="text-base-content/70 mt-2">
            Discover and collaborate on amazing stories
          </p>
        </div>
        <button
          onClick={handleCreateStory}
          className="btn btn-primary mt-4 sm:mt-0"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create Story
        </button>
      </div>

      {/* Filters */}
      <div className="card bg-base-200 shadow-lg mb-8">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="join w-full">
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Search stories..."
                  className="input input-bordered join-item flex-1"
                />
                <button
                  onClick={handleSearchSubmit}
                  className="btn btn-primary join-item"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Sort */}
            <select
              onChange={handleSortChange}
              value={`${filters.sortBy}-${filters.sortOrder}`}
              className="select select-bordered"
            >
              <option value="updated_at-desc">Recently Updated</option>
              <option value="created_at-desc">Newest First</option>
              <option value="created_at-asc">Oldest First</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>

            {/* Status Filter */}
            <select
              onChange={handleStatusChange}
              value={filters.status}
              className="select select-bordered"
            >
              <option value="all">All Stories</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      {stories.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stories.map((story) => (
              <div key={story.id} className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <h3 className="card-title line-clamp-2 text-lg">
                    {story.title}
                  </h3>
                  
                  <p className="text-base-content/70 line-clamp-3 flex-1">
                    {story.content.substring(0, 150)}...
                  </p>

                  <div className="flex items-center justify-between mt-4 text-sm text-base-content/60">
                    <div className="flex items-center space-x-2">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-6">
                          <span className="text-xs">A</span>
                        </div>
                      </div>
                      <span>Author</span>
                    </div>
                    <span>{formatDate(story.updated_at)}</span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-base-content/60">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        0 contributors
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                        {story.content.split(' ').length} words
                      </span>
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

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center">
              <div className="join">
                <button 
                  className="join-item btn"
                  disabled={pagination.page <= 1}
                  onClick={() => dispatch(setFilters({ page: pagination.page - 1 }))}
                >
                  «
                </button>
                
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      className={`join-item btn ${pagination.page === page ? 'btn-active' : ''}`}
                      onClick={() => dispatch(setFilters({ page }))}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button 
                  className="join-item btn"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => dispatch(setFilters({ page: pagination.page + 1 }))}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-base-content/20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-base-content mb-2">
            No stories found
          </h3>
          <p className="text-base-content/70 mb-8 max-w-md mx-auto">
            {filters.search ? 
              `No stories match "${filters.search}". Try a different search term.` :
              "Be the first to create a story and start the collaborative writing journey!"
            }
          </p>
          <button 
            onClick={handleCreateStory}
            className="btn btn-primary btn-lg"
          >
            Create Your First Story
          </button>
        </div>
      )}
    </div>
  );
};

export default StoriesPage;