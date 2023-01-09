import Search from "components/pages/search/search";
import client from "@lib/api";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import {
  BranduBaseResponse,
  SearchBase,
  SearchResult,
} from "../../types/privacy";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    setResult(router.query.query as string);
  }, [router.isReady, router.query.query]);

  const SearchResult = () => {
    return client.get(`search/?query=${result}`).then((res) => res.data);
  };

  const { data, isLoading } = useQuery<BranduBaseResponse<SearchBase>>(
    ["search", result],
    SearchResult
  );

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      <Search searchResult={data?.results!} />
    </div>
  );
}

export default Index;
