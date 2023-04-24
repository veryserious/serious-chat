import React from "react";
import Sidebar from "./Sidebar";

export default function Dashboard({ id }: { id: string }) {
  return <Sidebar id={id} />;
}
