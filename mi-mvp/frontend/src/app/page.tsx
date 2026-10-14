"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<string>("Loading...");
  const [dbStatus, setDbStatus] = useState<string>("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    fetch(`${apiUrl}/status`)
      .then((res) => res.json())
      .then((data) => {
        setBackendStatus(data.status);
        setDbStatus(data.database);
      })
      .catch(() => {
        setBackendStatus("unreachable");
        setDbStatus("unknown");
      });
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>🚀 MVP is ready</h1>
      <p>
        <strong>Backend status:</strong> {backendStatus}
      </p>
      <p>
        <strong>Database status:</strong> {dbStatus}
      </p>
    </main>
  );
}