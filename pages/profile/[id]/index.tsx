import Profile from "@components/pages/profile/profile";
import Head from "next/head";

function ProfilePage() {
  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>
      <div>
        <Profile />
      </div>
    </>
  );
}

export default ProfilePage;
