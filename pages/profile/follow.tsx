import FollowComp from "@components/pages/profile/followcomp";
import { useRouter } from "next/router";

function FollowPage() {
  const router = useRouter();
  return (
    <div>
      <FollowComp tab={+router.query.tab!} />
    </div>
  );
}

export default FollowPage;
