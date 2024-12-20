import Header from "../components/ui/Header";
import type { PageLayoutProps } from "@/utils/types";

export const PageLayout = ({
  children,
  isMobileView,
  selectedCharacter,
}: PageLayoutProps) => {
  return (
    <>
      <Header showBack={isMobileView && selectedCharacter} />
      <main
        className={`flex min-h-screen flex-col ${
          isMobileView && selectedCharacter
            ? "grid-cols-1"
            : "sm:grid sm:grid-cols-[1fr_3fr]"
        }`}
      >
        {children}
      </main>
    </>
  );
};
