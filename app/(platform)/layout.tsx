import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner"

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/logo.svg",
        },
        variables: {
          colorPrimary: "#171717",
        },
      }}
    >
      <Toaster/>
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
