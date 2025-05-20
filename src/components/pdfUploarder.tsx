"use client";

import { useState } from "react";

interface IPdfUploader {
  pdfId: number;
}

export function PdfUploader({ pdfId } : IPdfUploader) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected && selected.type !== "application/pdf") {
      setStatus("Só PDF, por favor!");
      setFile(null);
      return;
    }
    setStatus("");
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!file) {
    //   setStatus("Selecione um arquivo PDF primeiro");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("file", file);

    setStatus("Enviando...");

    // try {
    //   const res = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const data = await res.json();

    //   if (!res.ok) {
    //     setStatus(`Erro: ${data.error || "Algo deu errado"}`);
    //   } else {
        setStatus("Upload feito com sucesso!");
        console.log("deu boa!")
        setFile(null);
//       }
//     } catch (err) {
//       setStatus("Erro ao enviar arquivo.");
//     }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="bg-white"/>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Enviar PDF
      </button>
      {status && <p className="text-(--text)">{status}</p>}
    </form>
  );
}
