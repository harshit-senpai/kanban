"use client";

import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "../../ui/dialog";

import { CardWithList } from "@/types";

import { useCardModal } from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";

import { Header } from "./cardHeader";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
      </DialogContent>
    </Dialog>
  );
};
