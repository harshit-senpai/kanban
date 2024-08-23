"use client";

import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "../../ui/dialog";

import { CardWithList } from "@/types";

import { useCardModal } from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";

import { Header } from "./cardHeader";
import { CardDescription } from "./cardDescription";

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
        <div className="gird gird-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-2">
            <div className="w-full space-y-6">
              {!cardData ? (
                <CardDescription.Skeleton />
              ) : (
                <CardDescription data={cardData} />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
