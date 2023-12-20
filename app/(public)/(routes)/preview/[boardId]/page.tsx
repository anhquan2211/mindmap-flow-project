import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import ProviderMindMap from "@/app/(platform)/(dashboard)/board/[boardId]/_components/provider-mindmap";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPagePublic = async ({ params }: BoardIdPageProps) => {
  const { orgId, userId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
  });

  console.log("Đã vào preview");
  console.log("userId: ", userId);

  return (
    <>
      <ProviderMindMap boardId={params.boardId} data={lists} />
    </>
  );
};

export default BoardIdPagePublic;
