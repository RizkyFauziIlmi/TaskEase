import { Activity, TodoData } from "../../types";

export const downloadJsonFile = (data: TodoData[] | Activity[], namaFile: string) => {
  const jsonString = JSON.stringify(data, null, 2); // Konversi objek JSON ke string dengan indentasi
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${namaFile}.json`; // Ganti 'nama_file' sesuai kebutuhan Anda
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
