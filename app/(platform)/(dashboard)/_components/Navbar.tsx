import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="fixed z-50 px-4 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button
          size="sm"
          className="rounded-sm hidden h-auto md:block py-1.5 px-2"
        >
          Create
        </Button>
        <Button size="sm" className="rounded-sm block md:hidden">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
