import InquiryComp from "@components/pages/service/inquiry";
import Head from "next/head";
import FaqDetailComp from "@components/pages/service/faq/faqdetailcomp";

function InquiryPage() {
  return (
    <>
      <Head>
        <title>1:1 문의내역</title>
      </Head>
      <div>
        <InquiryComp />
      </div>
    </>
  );
}

export default InquiryPage;
