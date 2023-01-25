import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import { BranduBaseResponse } from "../../../types/privacy";
import { MainInfoInterface } from "../../../types/service";
import { useRouter } from "next/router";
import MainInfoComp from "@components/pages/service/maininfo";
import Head from "next/head";

function MainInfo() {
  return (
    <>
      <Head>
        <title>서비스 주요 안내</title>
      </Head>
      <div className="m-auto">
        <MainInfoComp />
      </div>
    </>
  );
}

export default MainInfo;
