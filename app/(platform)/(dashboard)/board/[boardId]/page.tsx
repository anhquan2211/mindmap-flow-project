import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import ProviderMindMap from "./_components/provider-mindmap";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { orgId, userId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  console.log("userId", userId);

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
  });

  return (
    <>
      <ProviderMindMap boardId={params.boardId} data={lists} />
    </>
  );
};

export default BoardIdPage;
