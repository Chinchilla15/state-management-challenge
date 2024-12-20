import Header from "../components/ui/Header";
import type { PageLayoutProps } from "@/utils/types";

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
};
