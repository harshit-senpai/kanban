import { ClerkProvider } from "@clerk/nextjs";

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
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
