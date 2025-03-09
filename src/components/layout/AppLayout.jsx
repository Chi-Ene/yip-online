import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

export default function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      <div className="overflow-scroll">
        <main className="max-w-6xl mx-auto text-center pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
