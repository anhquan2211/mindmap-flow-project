"use client";

import { ReactFlowProvider } from "reactflow";
import Mindmap from "./Mindmap";

import { List } from "@prisma/client";

import "reactflow/dist/style.css";

interface ProviderMindMapProps {
  data: List[];
  boardId: string;
}

const ProviderMindMap = ({ data, boardId }: ProviderMindMapProps) => {
  return (
    <ReactFlowProvider>
      <Mindmap />
    </ReactFlowProvider>
  );
};

export default ProviderMindMap;
