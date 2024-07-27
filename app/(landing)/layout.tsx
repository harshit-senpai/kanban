import { Navbar } from "./_components/Navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-100 h-full">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100">{children}</main>
    </div>
  );
};

export default LandingLayout;
