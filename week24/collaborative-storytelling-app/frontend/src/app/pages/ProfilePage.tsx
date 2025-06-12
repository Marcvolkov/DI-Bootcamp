import { useState } from 'react';
import { useAppSelector } from '../hooks';

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditData({
        username: user?.username || '',
        email: user?.email || '',
      });
    }
  };

  const handleSave = () => {
    // TODO: Implement profile update
    console.log('Saving profile:', editData);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">Profile Settings</h1>
        <p className="text-base-content/70 mt-2">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between mb-6">
                <h2 className="card-title">Profile Information</h2>
                <button
                  onClick={handleEditToggle}
                  className="btn btn-outline btn-sm"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Username</span>
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={editData.username}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleInputChange}
                      className="input input-bordered"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button onClick={handleSave} className="btn btn-primary">
                      Save Changes
                    </button>
                    <button onClick={handleEditToggle} className="btn btn-outline">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-base-content/70">
                      Username
                    </label>
                    <p className="text-lg">{user?.username}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-base-content/70">
                      Email
                    </label>
                    <p className="text-lg">{user?.email}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-base-content/70">
                      Member Since
                    </label>
                    <p className="text-lg">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Account Security */}
          <div className="card bg-base-200 shadow-lg mt-6">
            <div className="card-body">
              <h2 className="card-title mb-4">Account Security</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-base-100 rounded-lg">
                  <div>
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-base-content/70">
                      Last updated: Never
                    </p>
                  </div>
                  <button className="btn btn-outline btn-sm">
                    Change Password
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-base-100 rounded-lg">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-base-content/70">
                      Add an extra layer of security
                    </p>
                  </div>
                  <button className="btn btn-outline btn-sm">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Summary & Stats */}
        <div className="space-y-6">
          {/* Avatar & Quick Info */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body text-center">
              <div className="avatar placeholder mb-4">
                <div className="bg-primary text-primary-content rounded-full w-20">
                  <span className="text-2xl">
                    {user?.username?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold">{user?.username}</h3>
              <p className="text-base-content/70">{user?.email}</p>
              <div className="badge badge-primary badge-outline mt-2">
                Active Member
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-4">Your Stats</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-base-content/70">Stories Created</span>
                  <span className="font-bold">0</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-base-content/70">Collaborations</span>
                  <span className="font-bold">0</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-base-content/70">Words Written</span>
                  <span className="font-bold">0</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-base-content/70">Stories Read</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-4">Quick Actions</h3>
              
              <div className="space-y-2">
                <button className="btn btn-primary btn-sm w-full">
                  Create New Story
                </button>
                <button className="btn btn-outline btn-sm w-full">
                  Browse Stories
                </button>
                <button className="btn btn-outline btn-sm w-full">
                  Export My Data
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card bg-error/10 border border-error/20">
            <div className="card-body">
              <h3 className="card-title text-error mb-4">Danger Zone</h3>
              
              <div className="space-y-2">
                <button className="btn btn-error btn-outline btn-sm w-full">
                  Delete Account
                </button>
              </div>
              
              <p className="text-xs text-error/70 mt-2">
                This action cannot be undone. All your stories and data will be permanently deleted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;