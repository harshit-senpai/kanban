"use client";

import { copyCard } from "@/actions/copyCard";
import { deleteCard } from "@/actions/deletecard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { useCardModal } from "@/hooks/useCardModal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface CardActionsProps {
  data: CardWithList;
}

export const CardActions = ({ data }: CardActionsProps) => {
  const CardModal = useCardModal();
  const params = useParams();

  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title} copied!"`);
        CardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title} deleted!"`);
        CardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    executeCopy({
      id: data.id,
      boardId,
    });
  };

  const onDelete = () => {
    const boarId = params.boardId as string;

    executeDelete({
      id: data.id,
      boardId: boarId,
    });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="gray"
        size="inline"
        className="w-full justify-start"
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy
      </Button>
      <Button
        variant="gray"
        size="inline"
        className="w-full justify-start"
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

CardActions.Skeleton = function CardActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-6 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full g-8 bg-neutral-200" />
    </div>
  );
};
