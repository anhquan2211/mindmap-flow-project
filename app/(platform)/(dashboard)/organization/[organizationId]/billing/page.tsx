import { checkSubcription } from "@/lib/subcription";
import Info from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "./_components/SubscriptionButton";

const BillingPage = async () => {
  const isPro = await checkSubcription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2 dark:bg-slate-100/40" />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default BillingPage;
