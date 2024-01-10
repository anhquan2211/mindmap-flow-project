const api = "https://ff9cn8-8080.csb.app/mindmap";

export const getMindmap = async () => {
  const response = await fetch(`${api}`);
  const data = await response.json();
  return { data, boardId };
};

export const postMindmap = async (data) => {
  // console.log("data: ", data);
  const response = await fetch(`${api}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return data;
  }
  return null;
};

export const updateMindmap = async (data) => {
  const response = await fetch(`${api}/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return data;
  }
  return null;
};
