import Sidebar from "../_components/Sidebar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-full 2xl:max-w-screen-2xl mx-auto dark:bg-[#2f2b3a]">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block ">
          {/* Sidebar */}
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganizationLayout;
