'use client'

import {BellIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useEffect, useState} from "react";
import {deleteNotification, getAccesToken, getNotifications, notificationMarkSeen} from "@/actions/auth";
import {NotificationType} from "@/types";
import Notification from "@/components/notification";
import {toast} from "sonner";

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getNotifications() as NotificationType[];
      setNotifications(data);

      const accessToken = await getAccesToken();
      const ws = new WebSocket('ws://localhost:8000/ws/notifications/?token=' + accessToken);

      ws.onopen = function () {
        // console.log('connected')
      }

      ws.onerror = function (err) {
        console.log('error', err)
      }

      ws.onmessage = function (msg) {
        // console.log('message', msg.data)
        const data = JSON.parse(msg.data) as {type: string, message: string};
        toast.message(data.message);
      }
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