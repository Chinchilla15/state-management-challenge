import Header from "../components/ui/Header";
import type { PageLayoutProps } from "@/utils/types";

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <Header />
      <main className="col grid min-h-screen grid-cols-[1fr_3fr]">
        {children}
      </main>
    </>
  );
};
