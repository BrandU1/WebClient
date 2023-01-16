import Head from "next/head";
import ScrapList from "@components/scrap/scraplist";

function Scrap() {
  return (
    <>
      <Head>
        <title>스크랩북</title>
      </Head>
      <div>
        <ScrapList />
      </div>
    </>
  );
}

export default Scrap;
