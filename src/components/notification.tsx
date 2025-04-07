import {NotificationType} from "@/types";
import {TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Notification({notification, deleteNotification, markSeen}: { notification: NotificationType, deleteNotification: (id: string) => Promise<void> , markSeen: (id: string) => Promise<void> }) {
  return (
    <div
      onClick={() => markSeen(notification.id)}
      className={'flex items-center gap-1 ' +
        (notification.seen ?
          'text-gray-600'
          : 'text-blue-500 cursor-pointer hover:bg-gray-200 p-2 rounded-md')}>
      {notification.message}
      <Button
        onClick={() => deleteNotification(notification.id)}
        className={'cursor-pointer'}
        size={'sm'}
        variant={'ghost'}>
        <TrashIcon/>
      </Button>
    </div>
  )
}