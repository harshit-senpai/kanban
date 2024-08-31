"use client";

import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "../../ui/dialog";

import { AuditLog } from "@prisma/client";

import { CardWithList } from "@/types";

import { useCardModal } from "@/hooks/useCardModal";
import { fetcher } from "@/lib/fetcher";

import { Header } from "./cardHeader";
import { CardDescription } from "./cardDescription";
import { CardActions } from "./cardActions";
import { Activity } from "./activity";

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <CardDescription.Skeleton />
              ) : (
                <CardDescription data={cardData} />
              )}
            </div>
          </div>
          {!cardData ? (
            <CardActions.Skeleton />
          ) : (
            <CardActions data={cardData} />
          )}
          {!auditLogsData ? (
            <div className="col-span-3">
              <Activity.Skeleton />
            </div>
          ) : (
            <div className="col-span-3">
              <Activity items={auditLogsData} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
