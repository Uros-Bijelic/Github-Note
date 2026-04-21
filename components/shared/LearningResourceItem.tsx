import Image from 'next/image';
import Link from 'next/link';

interface ILearningResourceItemProps {
  label: string;
  link: string;
}

const LearningResourceItem: React.FC<ILearningResourceItemProps> = ({
  label,
  link,
}) => {
  return (
    <Link href={link} target="_blank">
      <li className="flex items-center gap-1.5 ">
        <Image
          src="/assets/icons/icn-check-square-green.svg"
          width={20}
          height={20}
          alt="Check"
        />
        <span className="text-sm underline">{label}</span>
        <Image
          src="/assets/icons/icn-external-link.svg"
          width={20}
          height={20}
          alt="Link"
        />
      </li>
    </Link>
  );
};

export default LearningResourceItem;
