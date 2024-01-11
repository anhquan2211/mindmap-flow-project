"use client";

import { ReactFlowProvider } from "reactflow";
import Mindmap from "./Mindmap";

import { List } from "@prisma/client";

import "reactflow/dist/style.css";
import BoardSave from "./board-save";
import { useState } from "react";

interface ProviderMindMapProps {
  data: List[];
  boardId: string;
}

const ProviderMindMap = ({ data, boardId }: ProviderMindMapProps) => {
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  const toggleAutoSave = () => {
    setAutoSaveEnabled((prev) => !prev);
  };
  return (
    <ReactFlowProvider>
      <BoardSave
        autoSaveEnabled={autoSaveEnabled}
        toggleAutoSave={toggleAutoSave}
      />
      <Mindmap autoSaveEnabled={autoSaveEnabled} />
    </ReactFlowProvider>
  );
};

export default ProviderMindMap;
