import { useCallback, useEffect, useRef, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import clsx from "clsx";
import { NodeResizer } from "@reactflow/node-resizer";

// import "@reactflow/node-resizer/dist/style.css";
// import "../helper/ResizeRotateNode";

function TextUpdateNode({ data, isConnectable, selected, ...rest }) {
  const { setNodes } = useReactFlow();
  const [disabled, setDisabled] = useState(true);

  // useEffect(() => {
  //   setDisabled(false);
  // }, [rest.id]);

  const onChange = useCallback(
    (evt) => {
      if (evt.target.value) {
        const { id } = rest;
        setNodes((nodes) => {
          return nodes.map((item) => {
            if (item.id === id) {
              item.data.label = evt.target.value;
            }
            return item;
          });
        });
      }
    },
    [rest, setNodes]
  );

  return (
    <div
      className={clsx(
        "text-updater-node break-all dark:text-slate-200 box-border w-full h-full",
        rest.id > 0 && "initial-node"
      )}
    >
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={180}
        minHeight={100}
      />
      {rest.id > 0 && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          id="node-target"
          className="mb-2 w-fit"
        />
      )}
      <div className="box-border w-full h-full pt-2">
        <textarea
          id="text"
          name="text"
          onChange={onChange}
          className={clsx(
            !disabled && "nodrag editable",
            "w-full h-full text-center pt-1"
          )}
          defaultValue={data.label}
          readOnly={disabled}
          onDoubleClick={() => {
            setDisabled(false);
            // console.log(disabled);
          }}
          onBlur={() => {
            setDisabled(true);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setDisabled(true);
            }
          }}
          autoComplete="off"
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        id="node-source"
      />
    </div>
  );
}

export default TextUpdateNode;
