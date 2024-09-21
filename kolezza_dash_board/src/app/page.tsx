"use client";

import Layout from "./(admin)/admin/patients/components/Layout";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div>
      <Layout>
        <Dashboard />
      </Layout>
    </div>
  );
}
