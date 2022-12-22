import { useRouter } from "next/router";
import MainInfoDetail from "@components/pages/service/maininfo/maininfodetail";

function InfoDetail() {
  const router = useRouter();
  return (
    <div>
      <MainInfoDetail detail={router.query} />
    </div>
  );
}

export default InfoDetail;
