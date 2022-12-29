import FaqDetailComp from "@components/pages/service/faq/faqdetailcomp";
import { useRouter } from "next/router";

function FaqDetail() {
  const router = useRouter();

  return (
    <div>
      <FaqDetailComp data={router.query} />
    </div>
  );
}

export default FaqDetail;
