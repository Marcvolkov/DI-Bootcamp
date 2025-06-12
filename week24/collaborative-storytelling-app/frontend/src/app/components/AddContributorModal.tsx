import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addContributor } from '../../features/stories/storiesSlice';
import { closeModal, showSuccessNotification, showErrorNotification } from '../../features/ui/uiSlice';

interface User {
  id: number;
  username: string;
  email: string;
}

const AddContributorModal = () => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state) => state.ui);
  const { currentStory, contributors } = useAppSelector((state) => state.stories);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const isOpen = modals.addContributor;

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setSearchQuery('');
      setSearchResults([]);
      setSelectedUser(null);
      setIsSearching(false);
      setIsAdding(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const searchUsers = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        // This would be a real API call in production
        // For now, simulate search results
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock search results - in real app, this would call the backend
        const mockUsers: User[] = [
          { id: 1, username: 'testuser', email: 'test@example.com' },
          { id: 3, username: 'alice', email: 'alice@example.com' },
          { id: 4, username: 'bob', email: 'bob@example.com' },
        ].filter(user => 
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        // Filter out current author and existing contributors
        const filteredUsers = mockUsers.filter(user => {
          if (user.id === currentStory?.author_id) return false;
          if (contributors.some(contributor => contributor.user_id === user.id)) return false;
          return true;
        });
        
        setSearchResults(filteredUsers);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchUsers, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentStory, contributors]);

  const handleClose = () => {
    if (!isAdding) {
      dispatch(closeModal('addContributor'));
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setSearchQuery(user.username);
    setSearchResults([]);
  };

  const handleAddContributor = async () => {
    if (!selectedUser || !currentStory) return;

    setIsAdding(true);
    try {
      await dispatch(addContributor({
        storyId: currentStory.id,
        userId: selectedUser.id
      })).unwrap();
      
      dispatch(showSuccessNotification(
        'Success', 
        `${selectedUser.username} has been added as a contributor!`
      ));
      dispatch(closeModal('addContributor'));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add contributor';
      dispatch(showErrorNotification('Error', errorMessage));
    } finally {
      setIsAdding(false);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedUser(null);
  };

  if (!isOpen || !currentStory) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">Add Contributor</h3>
          <button
            onClick={handleClose}
            disabled={isAdding}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>

        {/* Story Info */}
        <div className="bg-base-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-sm text-base-content/70 mb-1">Story</h4>
          <p className="font-medium">{currentStory.title}</p>
        </div>

        {/* Search Field */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">Search Users</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search by username or email..."
              className="input input-bordered w-full pr-10"
              disabled={isAdding}
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="loading loading-spinner loading-sm"></span>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && !selectedUser && (
          <div className="mb-4">
            <label className="label">
              <span className="label-text font-medium">Search Results</span>
            </label>
            <div className="bg-base-200 rounded-lg max-h-48 overflow-y-auto">
              {searchResults.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="w-full p-3 text-left hover:bg-base-300 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  disabled={isAdding}
                >
                  <div className="flex items-center space-x-3">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-8">
                        <span className="text-xs">{user.username[0].toUpperCase()}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-base-content/70">{user.email}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected User */}
        {selectedUser && (
          <div className="mb-6">
            <label className="label">
              <span className="label-text font-medium">Selected User</span>
            </label>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-10">
                    <span className="text-sm">{selectedUser.username[0].toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{selectedUser.username}</p>
                  <p className="text-sm text-base-content/70">{selectedUser.email}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    setSearchQuery('');
                  }}
                  disabled={isAdding}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {searchQuery.length >= 2 && !isSearching && searchResults.length === 0 && !selectedUser && (
          <div className="text-center py-8 text-base-content/50">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <p>No users found matching "{searchQuery}"</p>
          </div>
        )}

        {/* Actions */}
        <div className="modal-action">
          <button
            onClick={handleClose}
            disabled={isAdding}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            onClick={handleAddContributor}
            disabled={!selectedUser || isAdding}
            className="btn btn-primary"
          >
            {isAdding ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Adding...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                Add Contributor
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Modal backdrop */}
      <div className="modal-backdrop" onClick={handleClose}>
        <button>close</button>
      </div>
    </div>
  );
};

export default AddContributorModal;