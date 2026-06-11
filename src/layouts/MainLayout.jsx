import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-6 py-8 space-y-8">
        {children}
      </main>
    </div>
  );
}
``