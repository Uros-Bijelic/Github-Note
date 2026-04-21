import Image from 'next/image';

interface IChecklistItemProps {
  title: string;
  isBlueIcon?: boolean;
}

const ChecklistItem: React.FC<IChecklistItemProps> = ({
  title,
  isBlueIcon = false,
}) => {
  return (
    <li className="flex items-center gap-2.5">
      <Image
        src={`/assets/icons/${isBlueIcon ? 'icn-check-square.svg' : 'icn-check-square-green.svg'}`}
        width={20}
        height={20}
        alt="Check"
        className="size-5"
      />
      <span className="p2-regular">{title}</span>
    </li>
  );
};

export default ChecklistItem;
