import { CharacterInfoProps } from "@/utils/types";

export default function CharacterInfo({
  children,
  imageSource,
  imageAlt,
}: CharacterInfoProps) {
  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto">
      <div className="container px-4 py-8 md:px-32">
        {children}

        <div className="mt-8 flex justify-center">
          {imageSource && (
            <div className="w-full max-w-xs">
              <img
                src={imageSource}
                alt={imageAlt}
                className="h-auto w-full rounded-md border border-ravnBlack shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
