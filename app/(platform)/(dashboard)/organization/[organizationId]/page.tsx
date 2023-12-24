import ReactFlow, { ReactFlowProvider } from "reactflow";
import Info from "./_components/Info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./_components/BoardList";
import { Suspense } from "react";
import { checkSubcription } from "@/lib/subcription";

const OrganizationIdPage = async () => {
  const isPro = await checkSubcription();

  return (
    // <ReactFlowProvider>
    //   <Mindmap />
    // </ReactFlowProvider>
    <div className="w-full mb-20">
      <Info isPro={isPro} />
      <Separator className="my-4 dark:bg-slate-100/40" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
