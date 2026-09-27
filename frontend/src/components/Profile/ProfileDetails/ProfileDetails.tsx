import PersonalInformation from "./PersonalInformation";
import AccountInformation from "./AccountInformation";

import type { MeResponse } from "../../../types/auth";

interface ProfileDetailsProps {
  profile: MeResponse;
}

const ProfileDetails = ({ profile }: ProfileDetailsProps) => {
  return (
    <div>
      <PersonalInformation user={profile.user} />
      <AccountInformation auth={profile.auth} />
    </div>
  );
};

export default ProfileDetails;