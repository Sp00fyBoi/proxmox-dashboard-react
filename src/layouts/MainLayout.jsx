import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-[1400px] w-full mx-auto px-container-padding py-8 space-y-8 flex-grow">
        {children}
      </main>
      <footer className="py-8 text-center border-t border-outline-variant opacity-60 mt-auto">
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          Infrastructure v2.4.0-stable | © {new Date().getFullYear()} VM Manager
        </p>
      </footer>
    </div>
  );
}
``