"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  Connection,
  Edge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  Panel,
} from "reactflow";
import ResizeRotateNode from "../helper/ResizeRotateNode";
import TextUpdateNode from "../helper/TextUpdate";

import "reactflow/dist/style.css";
import "@/assets/index.css";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import DownloadButton from "../helper/DownloadButton";

import useSWR from "swr";

import {
  getMindmap,
  postMindmap,
  updateMindmap,
} from "@/helpers/mindmapService";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";

const initialNodes = [
  {
    id: "0",
    type: "textUpdater",
    data: { label: "My Mindmap" },
    position: { x: 0, y: 50 },
    style: { border: "2px solid #ccc", borderRadius: "6px" },
  },
];

const flowKey = "mindmap-flow";

const nodeTypes = { textUpdater: TextUpdateNode };

const defaultViewport = { x: 0, y: 0, zoom: 1 };

const flowArr = [];

const snapGrid = [25, 25];

function shouldNodeBeRemoved(node) {
  if (node.id !== "0") {
    return true;
  }

  return false;
}

function shouldEdgeBeRemoved(edge) {
  if (edge.source !== "0") {
    return true;
  }

  return false;
}

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Mindmap = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const restoreButtonRef = useRef(null);
  const saveButtonRef = useRef(null);

  const params = useParams();
  const router = useRouter();

  const [selectedId, setSelectedId] = useState(false);
  const [selectedSource, setSelectedSource] = useState(false);
  const [focusId, setFocusId] = useState(null);
  const [rfInstance, setRfInstance] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition, getNode, getEdge, addNodes, setViewport } =
    useReactFlow();

  // const { data } = useSWR(`https://ff9cn8-8080.csb.app/mindmap/${params.boardId}`, fetcher);

  // console.log("data: ", data);

  let id = 0;
  if (nodes?.length) {
    const ids = nodes.map((node) => node.id);
    id = Math.max(...ids) + 1;
  }

  const getId = useCallback(() => `${id++}`, [id]);

  const { execute } = useAction(createList, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (restoreButtonRef.current) {
      restoreButtonRef.current.click();
    }
  }, [params.boardId]);

  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (saveButtonRef.current) {
        saveData();
      }
    }, 15000); // 10 seconds (10,000 milliseconds)

    return () => clearInterval(saveInterval);
  }, []);

  const saveData = useCallback(() => {
    if (rfInstance) {
      let flow = rfInstance.toObject();
      flow = { ...flow, id: params.boardId };

      const index = flowArr.findIndex(
        (item) => item.boardId === params.boardId
      );

      if (index !== -1) {
        // If boardId exists in flowArr, update the existing element
        flowArr[index] = flow;

        // console.log("flow: ", flow[0]);
      } else {
        // If boardId doesn't exist, push the new element
        flowArr.push(flow);
      }

      localStorage.setItem(flowKey, JSON.stringify(flowArr));
      // console.log("flowArr: ", flowArr);
      // flowArr.map((flow) => {
      //   if (flow.id === params.boardId) {
      //     console.log("flow: ", flow);
      //     // updateMindmap(flow);
      //     // postMindmap(flow);
      //     execute({
      //       data_map: flow,
      //       boardId: params.boardId,
      //     });
      //   }
      // });
    }
  }, [rfInstance, params.boardId]);

  const onSave = () => {
    saveData();

    toast.success("Saved Successfully!");
  };

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));
      console.log("flow in onRestore: ", flow);
      if (flow) {
        flow.map((item) => {
          if (item.id === params.boardId) {
            const { x = 0, y = 0, zoom = 1 } = item.viewport;
            setNodes(item.nodes || []);
            setEdges(item.edges || []);
            setViewport({ x, y, zoom });
          }
        });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport, setEdges, params.boardId]);

  const onConnect = useCallback(
    (params) => {
      // reset the start node on connections
      connectingNodeId.current = null;
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
          type: "textUpdater",
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectingNodeId.current,
            target: id,
          })
        );
      }
    },
    [screenToFlowPosition, setEdges, setNodes, getId]
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      const nodesToDelete = deleted.filter((node) => node.id !== "0");

      if (nodesToDelete.length === 0) return;
      console.log("deleted: ", deleted);
      setEdges(
        deleted.reduce((acc, node) => {
          console.log("acc: ", acc);
          console.log("node: ", node);

          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges, setEdges]
  );

  function handleNodesChange(changes) {
    const nextChanges = changes.reduce((acc, change) => {
      if (change.type === "remove") {
        const node = getNode(change.id);

        if (shouldNodeBeRemoved(node)) {
          return [...acc, change];
        }

        return acc;
      }

      return [...acc, change];
    }, []);

    onNodesChange(nextChanges);
  }

  function handleEdgesChange(changes) {
    const nextChanges = changes.reduce((acc, change) => {
      if (change.type === "remove") {
        const edge = getEdge(change.id);

        if (shouldEdgeBeRemoved(edge)) {
          return [...acc, change];
        }

        return acc;
      }

      return [...acc, change];
    }, []);

    onEdgesChange(nextChanges);
  }

  const connectionLineStyle = {
    stroke: "rgb(79 70 229)",
    strokeWidth: 2,
  };

  const defaultEdgeOptions = {
    style: connectionLineStyle,
    type: "default",
  };

  const saveUpdateMindMap = async () => {
    try {
      if (data) {
        const result = await postMindmap(params);
        console.log();
      }
    } catch (e) {}
  };

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Delete" && selectedId !== false && selectedId !== "0") {
        setNodes((nodes) => nodes.filter((node) => node.id !== selectedId));
        setEdges((edges) => edges.filter((edge) => edge.source !== selectedId));
      }
    });
  }, [selectedId, selectedSource, setNodes, setEdges]);

  return (
    <div
      className="wrapper overflow-hidden border-hover"
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onNodesDelete={onNodesDelete}
        onConnectStart={onConnectStart}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineStyle={connectionLineStyle}
        defaultViewport={defaultViewport}
        fitViewOptions={{ padding: 2 }}
        nodeTypes={nodeTypes}
        onInit={setRfInstance}
        snapToGrid={true}
        snapGrid={snapGrid}
        className="download-image"
        fitView
        nodeOrigin={[0.5, 0]}
        onNodeClick={(_, { id }) => {
          setSelectedId(id);
        }}
        onEdgeClick={(_, { id }) => {
          setSelectedId(id);
        }}
      >
        <MiniMap />
        <Controls />
        <Panel
          className="panel-btn transition"
          position="top-right"
          style={{
            position: "absolute",
            top: "100px",
            backgroundColor: "#686de0",
            padding: "8px 10px",
            borderRadius: "6px",
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
            color: "#fff",
          }}
        >
          <button
            onClick={() => {
              const id = getId();
              const dimensions =
                reactFlowWrapper.current.getBoundingClientRect();
              addNodes([
                {
                  id,
                  data: { label: `Node ${id}` },
                  position: {
                    x: Math.random() * 200,
                    y: Math.random() * 200,
                  },
                  type: "textUpdater",
                },
              ]);

              setFocusId(id);
            }}
          >
            Add a node
          </button>
        </Panel>
        <Panel
          className="panel-btn transition"
          position="top-right"
          style={{
            position: "absolute",
            top: "150px",
            backgroundColor: "#686de0",
            padding: "8px 10px",
            borderRadius: "6px",
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
            color: "#fff",
          }}
        >
          <button ref={saveButtonRef} onClick={onSave}>
            Save
          </button>
        </Panel>

        <Panel
          className="panel-btn transition"
          position="top-right"
          style={{
            position: "absolute",
            top: "200px",
            backgroundColor: "#686de0",
            padding: "8px 10px",
            borderRadius: "6px",
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
            color: "#fff",
          }}
        >
          <button ref={restoreButtonRef} onClick={onRestore}>
            Restore
          </button>
        </Panel>
        <Background className="bg-[#81ecec] dark:bg-[#2f2b3a]" />
        <DownloadButton />
      </ReactFlow>
    </div>
  );
};

export default Mindmap;
