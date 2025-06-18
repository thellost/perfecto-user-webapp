"use client";
import { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import { Popover } from '@headlessui/react';
import { format } from 'date-fns';
import { Notification, NotificationType } from '../../app/types/DefaultType';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasUnread, setHasUnread] = useState(false);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/crud/notifications');
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data.notifications);
      setHasUnread(data.notifications.some((notif: Notification) => !notif.isRead));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/crud/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isRead: true,
        }),
      });
      setHasUnread(false);
      // Refresh notifications
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'offer':
        return '💰';
      case 'counteroffer':
        return '🤝';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  return (
    <Popover className="relative ">
      <Popover.Button className="cursor-pointer relative p-2 rounded-full hover:bg-gray-100 focus:outline-none">
        <FiBell className="w-5 h-5 text-gray-600" />
        {hasUnread && (
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full" />
        )}
      </Popover.Button>

      <Popover.Panel 
        className="absolute right-0 z-10 mt-2 w-80 max-h-96 overflow-y-auto bg-white rounded-md shadow-lg ring-1 ring-gray-300 ring-opacity-5"
        onClick={markAllAsRead}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            {notifications.length > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 cursor-pointer hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No notifications</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.notification_id}
                  className={`p-3 rounded-lg ${
                    !notification.isRead ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">
                      {getNotificationIcon(notification.type as NotificationType)}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <span className="text-xs text-gray-400">
                        {format(new Date(notification.created_at), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                  </div>
                  {notification.link && (
                    <a
                      href={notification.link}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800 block"
                    >
                      View details →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default NotificationBell;