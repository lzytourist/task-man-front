'use client'

import {BellIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useEffect, useState} from "react";
import {deleteNotification, getNotifications, notificationMarkSeen} from "@/actions/auth";
import {NotificationType} from "@/types";
import Notification from "@/components/notification";

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getNotifications() as NotificationType[];
      setNotifications(data);
    })()
  }, []);

  const markSeenSingle = async (id: string) => {
    await notificationMarkSeen([id]);

    setNotifications((prevState) => {
      const new_state: NotificationType[] = [];
      prevState.forEach((notification) => {
        if (notification.id === id) {
          new_state.push({
            ...notification,
            seen: true
          });
        } else {
          new_state.push(notification);
        }
      });
      return new_state;
    });
  }

  const handleDelete = async (id: string) => {
    await deleteNotification(id);

    setNotifications((prevState) => {
      return prevState.filter(notification => notification.id !== id)
    });
  }

  return (
    <Popover>
      <PopoverTrigger
        className="cursor-pointer h-6 w-6 shrink-0 group-data-[collapsible=icon]:opacity-0">
        <BellIcon/>
      </PopoverTrigger>
      <PopoverContent>
        {notifications.map((notification, index) => <Notification
          key={index}
          deleteNotification={handleDelete}
          markSeen={markSeenSingle}
          notification={notification}/>)}
      </PopoverContent>
    </Popover>
  )
}