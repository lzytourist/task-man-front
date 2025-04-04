'use client'

import {RefreshCw, TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {useState, useTransition} from "react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface Props {
  id: string;
  action: (id: string) => Promise<boolean>
}

export default function DeleteButton({id, action}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();

  const router = useRouter();

  const confirmDelete = () => {
    startTransition(async () => {
      const ok = await action(id);
      if (ok) {
        toast.success('Deleted successfully');
        router.refresh()
      } else {
        toast.error('Could not delete')
      }
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={true}>
        <Button variant={'ghost'} className={'cursor-pointer'} size={'sm'}>
          <TrashIcon onClick={() => setOpen(true)}/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={confirmDelete}
            type="submit"
            className={'cursor-pointer flex gap-x-2 items-center'}
            variant={'destructive'}>
            <span>Confirm</span>
            {pending && <RefreshCw className={'animate-spin'}/>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}