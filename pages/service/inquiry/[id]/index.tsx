import { useRouter } from "next/router";
import InquiryDetailComp from "@components/pages/service/inquiry/inquirydetail";

function InquiryDetail() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <InquiryDetailComp id={String(id)} />
    </div>
  );
}

export default InquiryDetail;
