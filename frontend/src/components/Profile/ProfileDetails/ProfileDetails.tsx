import React from "react";
import PersonalInformation from "./PersonalInformation";
import AccountInformation from "./AccountInformation";
const ProfileDetails = ({profile}) => {
  return (
    <div>
      <PersonalInformation user={profile.user}></PersonalInformation>
      <AccountInformation auth={profile.auth}></AccountInformation>
    </div>
  );
};

export default ProfileDetails;
