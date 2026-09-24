import ChangePasswordSection from "./ChangePassword/ChangePasswordSection";
import ChangeEmailSection from "./ChangeEmail/ChangeEmailSection";

const AccountSettings = () => {
  return (
    <div className="space-y-5">
      <ChangePasswordSection />
      <ChangeEmailSection />
    </div>
  );
};

export default AccountSettings;