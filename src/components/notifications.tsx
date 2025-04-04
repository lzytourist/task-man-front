'use client'

import {BellIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useEffect, useState} from "react";
import {getNotifications} from "@/actions/auth";
import {Notification} from "@/types";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getNotifications() as Notification[];
      setNotifications(data);
    })()
  }, []);

  return (
    <Popover>
      <PopoverTrigger
        className="cursor-pointer h-6 w-6 shrink-0 group-data-[collapsible=icon]:opacity-0">
        <BellIcon/>
      </PopoverTrigger>
      <PopoverContent>
        {notifications.map((notification, index) => (
          <div className={'border-b-2 border-gray-100 py-1'} key={index}>{notification.message}</div>
        ))}
      </PopoverContent>
    </Popover>
  )
}