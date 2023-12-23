import { OrganizationProfile } from "@clerk/nextjs";
import "@/assets/index.css";

const SettingsPage = () => {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
              width: "95%",
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "100%",
              backgroundColor: "dark:bg-[#2f2b3a]",
            },
          },
        }}
      />
    </div>
  );
};

export default SettingsPage;
