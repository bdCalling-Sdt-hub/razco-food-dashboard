import { format } from "timeago.js";
import { useNotificationsQuery } from "@/redux/slices/admin/settingApi";

const NotificationList = () => {
  const {
    data: notificationData,
    isLoading,
    error,
  } = useNotificationsQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading notifications</div>;
  }

  return (
    <div className="p-4 bg-white rounded shadow-lg h-full">
      {notificationData?.data?.map((notification: any, index: number) => (
        <div key={index} className="bg-gray-200 p-4 rounded-lg mb-2">
          <div className="text-lg font-medium">{notification.message}</div>
          <div className="text-sm text-gray-500">
            {format(notification.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
