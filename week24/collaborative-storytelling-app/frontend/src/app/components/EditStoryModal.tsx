import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateStory } from '../../features/stories/storiesSlice';
import { closeModal, showSuccessNotification, showErrorNotification } from '../../features/ui/uiSlice';

const EditStoryModal = () => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state) => state.ui);
  const { currentStory, isUpdating } = useAppSelector((state) => state.stories);
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  
  const [errors, setErrors] = useState({
    title: '',
    content: ''
  });

  const [hasChanges, setHasChanges] = useState(false);

  const isOpen = modals.editStory;

  useEffect(() => {
    if (isOpen && currentStory) {
      // Initialize form with current story data
      setFormData({
        title: currentStory.title,
        content: currentStory.content
      });
      setErrors({ title: '', content: '' });
      setHasChanges(false);
    }
  }, [isOpen, currentStory]);

  useEffect(() => {
    // Check if form has changes
    if (currentStory) {
      const changed = 
        formData.title !== currentStory.title || 
        formData.content !== currentStory.content;
      setHasChanges(changed);
    }
  }, [formData, currentStory]);

  const handleClose = () => {
    if (!isUpdating) {
      if (hasChanges) {
        const confirmClose = window.confirm(
          'You have unsaved changes. Are you sure you want to close?'
        );
        if (!confirmClose) return;
      }
      dispatch(closeModal('editStory'));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      title: '',
      content: ''
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.content;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentStory || !validateForm()) {
      return;
    }

    try {
      await dispatch(updateStory({
        storyId: currentStory.id,
        updates: {
          title: formData.title.trim(),
          content: formData.content.trim()
        }
      })).unwrap();
      
      dispatch(showSuccessNotification('Success', 'Story updated successfully!'));
      dispatch(closeModal('editStory'));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update story';
      dispatch(showErrorNotification('Error', errorMessage));
    }
  };

  if (!isOpen || !currentStory) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg">Edit Story</h3>
            <p className="text-sm text-base-content/70">
              Last updated: {new Date(currentStory.updated_at).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isUpdating}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          {/* Title Field */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Title</span>
              <span className="label-text-alt">
                {formData.title.length}/255
              </span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your story title..."
              className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
              disabled={isUpdating}
              maxLength={255}
            />
            {errors.title && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.title}</span>
              </label>
            )}
          </div>

          {/* Content Field */}
          <div className="form-control flex-1 mb-6">
            <label className="label">
              <span className="label-text font-medium">Content</span>
              <span className="label-text-alt">
                {formData.content.length} characters
                {hasChanges && <span className="text-warning ml-2">• Unsaved changes</span>}
              </span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Continue your story..."
              className={`textarea textarea-bordered w-full flex-1 min-h-[300px] resize-none ${
                errors.content ? 'textarea-error' : ''
              }`}
              disabled={isUpdating}
            />
            {errors.content && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.content}</span>
              </label>
            )}
          </div>

          {/* Actions */}
          <div className="modal-action mt-auto">
            <button
              type="button"
              onClick={handleClose}
              disabled={isUpdating}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isUpdating || 
                !hasChanges || 
                !formData.title.trim() || 
                !formData.content.trim()
              }
              className="btn btn-primary"
            >
              {isUpdating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Modal backdrop */}
      <div className="modal-backdrop" onClick={handleClose}>
        <button>close</button>
      </div>
    </div>
  );
};

export default EditStoryModal;