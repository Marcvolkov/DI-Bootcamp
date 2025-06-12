import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setSidebarOpen, openModal } from '../../features/ui/uiSlice';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state.auth);

  const closeSidebar = () => {
    dispatch(setSidebarOpen(false));
  };

  const handleCreateStory = () => {
    dispatch(openModal('createStory'));
    closeSidebar();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: '/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      label: 'Home',
    },
    {
      path: '/stories',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      ),
      label: 'All Stories',
    },
    {
      path: '/profile',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: 'Profile',
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 z-50 w-64 h-full bg-base-200 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:block`}
      >
        <div className="flex flex-col h-full">
          {/* User info */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center space-x-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-10">
                  <span className="text-sm">
                    {user?.username?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
              <div>
                <p className="font-semibold text-base-content">
                  {user?.username || 'User'}
                </p>
                <p className="text-sm text-base-content/70">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-b border-base-300">
            <button
              onClick={handleCreateStory}
              className="btn btn-primary w-full"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              New Story
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="menu menu-lg w-full">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeSidebar}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-content'
                        : 'hover:bg-base-300'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Recent Activity */}
          <div className="p-4 border-t border-base-300">
            <h3 className="text-sm font-semibold text-base-content/70 mb-2">
              Recent Activity
            </h3>
            <div className="space-y-2">
              <div className="text-xs text-base-content/60">
                No recent activity
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;