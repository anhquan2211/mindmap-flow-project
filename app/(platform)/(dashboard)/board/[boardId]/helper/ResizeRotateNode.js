import React, { useState, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { NodeResizer } from "@reactflow/node-resizer";

import "@reactflow/node-resizer/dist/style.css";
import styles from "../assets/ResizeRotateNode.css";

export default function ResizeRotateNode({
  id,
  sourcePosition = Position.Left,
  targetPosition = Position.Right,
  data,
}) {
  const [resizable, setResizable] = useState(true);
  const [count, setCount] = useState(0);

  const handleResize = useCallback((e, data) => {
    // console.log(data);
  }, []);

  const handleResizeEnd = useCallback(() => {
    // console.log("Resize end count", count);
    setCount((prev) => prev + 1);
  }, []);

  return (
    <>
      <div className={styles.node}>
        <NodeResizer
          onResize={handleResize}
          onResizeEnd={handleResizeEnd}
          isVisible={resizable}
          minWidth={180}
          minHeight={100}
        />

        <div>
          {data?.label}
          <div>
            <label>
              <input
                type="checkbox"
                checked={resizable}
                onChange={(evt) => setResizable(evt.target.checked)}
              />
              resizable
            </label>
          </div>
        </div>
        <Handle
          style={{ opacity: 0 }}
          position={sourcePosition}
          type="source"
        />
        <Handle
          style={{ opacity: 0 }}
          position={targetPosition}
          type="target"
        />
      </div>
    </>
  );
}
