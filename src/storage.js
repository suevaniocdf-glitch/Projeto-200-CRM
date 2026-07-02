// src/storage.js
export const load = () => {
  const data = localStorage.getItem("crm_data");
  return data ? JSON.parse(data) : null;
};

export const persist = (data) => {
  localStorage.setItem("crm_data", JSON.stringify(data));
};

