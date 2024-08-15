"use client";

import { ElementRef, useRef, useState } from "react";

import { Board } from "@prisma/client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { FormInput } from "@/components/form/formInput";

import { useAction } from "@/hooks/useAction";
import { UpdateBoard } from "@/actions/updateBoard";

interface BoardTitleFormProps {
  data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(data.title);

  const { execute } = useAction(UpdateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" updated`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({
      title,
      id: data.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        className="flex gap-x-2 items-center"
        ref={formRef}
      >
        <FormInput
          onBlur={onBlur}
          id="title"
          ref={inputRef}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
      variant="transparent"
    >
      {title}
    </Button>
  );
};
