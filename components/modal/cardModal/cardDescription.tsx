"use client";

import { ElementRef, useRef, useState } from "react";

import { useParams } from "next/navigation";

import { AlignLeft } from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { CardWithList } from "@/types";

import { Skeleton } from "@/components/ui/skeleton";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormSubmit } from "@/components/form/formSubmit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { updateCard } from "@/actions/updateCard";
import { toast } from "sonner";

interface CardDescriptionProps {
  data: CardWithList;
}

export const CardDescription = ({ data }: CardDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const queryClient = useQueryClient();
  const params = useParams();

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Card "${data.title}" updated successfully`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;

    const boardId = params.boardId as string;

    execute({
      id: data.id,
      description,
      boardId,
    });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form ref={formRef} action={onSubmit} className="space-y-2">
            <FormTextarea
              id="description"
              className="w-full mt-2"
              placeholder="Add a more detailed description..."
              ref={textareaRef}
              defaultValue={data.description || undefined}
              errors={fieldErrors}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            onClick={enableEditing}
            className="min-h-[78px] bg-neutral-200 text-sm font-semibold py-3 px-3.5 rounded-md"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

CardDescription.Skeleton = function CardSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px] bg-neutral-200" />
      </div>
    </div>
  );
};
