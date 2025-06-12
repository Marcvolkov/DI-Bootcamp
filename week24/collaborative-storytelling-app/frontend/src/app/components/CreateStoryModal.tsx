import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { createStory } from '../../features/stories/storiesSlice';
import { closeModal, showSuccessNotification, showErrorNotification } from '../../features/ui/uiSlice';

const CreateStoryModal = () => {
  const dispatch = useAppDispatch();
  const { modals } = useAppSelector((state) => state.ui);
  const { isCreating } = useAppSelector((state) => state.stories);
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  
  const [errors, setErrors] = useState({
    title: '',
    content: ''
  });

  const isOpen = modals.createStory;

  useEffect(() => {
    if (isOpen) {
      // Reset form when modal opens
      setFormData({ title: '', content: '' });
      setErrors({ title: '', content: '' });
    }
  }, [isOpen]);

  const handleClose = () => {
    if (!isCreating) {
      dispatch(closeModal('createStory'));
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
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(createStory({
        title: formData.title.trim(),
        content: formData.content.trim()
      })).unwrap();
      
      dispatch(showSuccessNotification('Success', 'Story created successfully!'));
      dispatch(closeModal('createStory'));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create story';
      dispatch(showErrorNotification('Error', errorMessage));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">Create New Story</h3>
          <button
            onClick={handleClose}
            disabled={isCreating}
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
              disabled={isCreating}
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
              </span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Begin your story here... Let your imagination run wild!"
              className={`textarea textarea-bordered w-full flex-1 min-h-[300px] resize-none ${
                errors.content ? 'textarea-error' : ''
              }`}
              disabled={isCreating}
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
              disabled={isCreating}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || !formData.title.trim() || !formData.content.trim()}
              className="btn btn-primary"
            >
              {isCreating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Create Story
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

export default CreateStoryModal;