import Navbar from './Navbar';

import Image from 'next/image';

const MobileNav: React.FC = () => {
  return (
    <header className="flex-between bg-black-800 px-5 py-6">
      <Image src="/assets/images/Logo.svg" width={102} height={24} alt="Logo" />
      <Navbar />
    </header>
  );
};

export default MobileNav;
