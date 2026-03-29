import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingChat from "./components/FloatingChat";
import AppRoutes from "./routes";

export default function App() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 flex flex-col relative">
            <Navbar />
            <main className="flex-1 flex flex-col relative w-full h-full">
                <AppRoutes />
                <FloatingChat />
            </main>
            <Footer />
        </div>
    );
}