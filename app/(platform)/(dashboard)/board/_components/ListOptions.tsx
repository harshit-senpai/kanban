import { ElementRef, useRef } from "react";

import { MoreHorizontal, X } from "lucide-react";

import { List } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { toast } from "sonner";

import { FormSubmit } from "@/components/form/formSubmit";
import { useAction } from "@/hooks/useAction";
import { deleteList } from "@/actions/deleteList";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-semibold text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose asChild>
          <Button
            ref={closeRef}
            className="h-auto w-auto absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          variant="ghost"
          className="w-full h-auto p-2 px-5 justify-start font-normal text-sm rounded-none"
        >
          Add Card...
        </Button>
        <form>
          <input name="id" value={data.id} hidden id="id" />
          <input value={data.boardId} name="boardId" hidden id="boardId" />
          <FormSubmit
            variant="ghost"
            className="w-full h-auto p-2 px-5 justify-start font-normal text-sm rounded-none"
          >
            Copy List...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input name="id" value={data.id} hidden id="id" />
          <input value={data.boardId} name="boardId" hidden id="boardId" />
          <FormSubmit
            variant="ghost"
            className="w-full h-auto p-2 px-5 justify-start font-normal text-sm rounded-none"
          >
            Delete List...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
