import Post from "@components/pages/community/post";
import SidePost from "@components/pages/community/sidepost";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  BranduBaseResponse,
  Community,
  RecommendComment,
} from "../../../types/privacy";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

function PostPage() {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
    }
  }, [router.isReady]);
  const id = +router.query.id!;

  const getEdit = () => {
    return client.get(`communities/posts/${id}`).then((res) => res.data);
  };

  const getRecommend = () => {
    return client
      .get(`communities/posts/${id}/comments`)
      .then((res) => res.data);
  };

  const { data, isLoading } = useQuery<BranduBaseResponse<Community>>(
    ["edit", id],
    getEdit
  );

  const { data: recommend, isLoading: recommendLoading } = useQuery<
    BranduBaseResponse<RecommendComment[]>
  >(["recommend", id], getRecommend);

  return (
    <>
      <Head>
        <title>{data?.results.title}</title>
      </Head>
      <div className="flex flex-row mt-5">
        <div className="flex flex-col">
          <Post recommend={recommend?.results!} data={data?.results!} />
        </div>
        <div className="ml-14">
          <SidePost data={data?.results!} />
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default PostPage;
