import { HelpCircle, User2 } from "lucide-react";

import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { Hint } from "@/components/Hint";
import { FormPopover } from "@/components/form/formPopover";
import { db } from "@/lib/db";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Board
      </div>
      <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="bg-no-repeat bg-center bg-cover rounded-sm h-full w-full p-2 aspect-video overflow-hidden group relative bg-sky-700 "
          >
            <div className="absolute bg-black/30 group-hover:bg-black/40 transition inset-0" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create new board</p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={40}
              description={`Free Workspace can have up to 5 open boards, for unlimited boards upgrade to PRO`}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoarderList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-dull w-full p-2" />
      <Skeleton className="aspect-video h-dull w-full p-2" />
      <Skeleton className="aspect-video h-dull w-full p-2" />
      <Skeleton className="aspect-video h-dull w-full p-2" />
      <Skeleton className="aspect-video h-dull w-full p-2" />
      <Skeleton className="aspect-video h-dull w-full p-2" />
      <Skeleton className="aspect-video h-dull w-full p-2" />
      <Skeleton className="aspect-video h-dull w-full p-2" />
    </div>
  );
};
