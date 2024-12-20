import { CharacterInfoItemProps } from "@/utils/types";

export default function CharacterInfoItem(props: CharacterInfoItemProps) {
  const { title, value } = props;
  return (
    <>
      <div className="flex flex-1 justify-between border-b border-[#00000026] py-3 pr-3 text-default">
        <h3 className="font-bold text-textLight">{title}</h3>
        <p className="font-bold text-textDark">{value}</p>
      </div>
    </>
  );
}
