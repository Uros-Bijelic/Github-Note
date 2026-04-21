import NavProfileInfo from '../shared/NavProfileInfo';

interface IRightSidebarProps {
  children?: React.ReactNode;
}

const RightSidebar: React.FC<IRightSidebarProps> = ({ children }) => {
  return (
    <aside className="flex w-full max-w-72.5 flex-col border-l-[1.5px] border-l-gray-border bg-black-800 px-7 py-10 max-xl:hidden">
      <div className="mb-12">
        <NavProfileInfo />
      </div>
      {children}
    </aside>
  );
};

export default RightSidebar;
