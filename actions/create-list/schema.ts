import { z } from "zod";

// Define the structure of the nodes and edges objects
const Node = z.object({
  width: z.number(),
  height: z.number(),
  id: z.string(),
  type: z.string(),
  data: z.object({
    label: z.string(),
  }),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  positionAbsolute: z.object({
    x: z.number(),
    y: z.number(),
  }),
  style: z.object({
    border: z.string(),
    borderRadius: z.string(),
  }),
});

const Edge = z.object({
  style: z.object({
    stroke: z.string(),
    strokeWidth: z.number(),
  }),
  type: z.string(),
  id: z.string(),
  source: z.string(),
  target: z.string(),
});

export const CreateList = z.object({
  data_map: z.string(),
  boardId: z.string(),
  order: z.number(),
});
