import { QueryClient, useQuery } from "@tanstack/react-query";
import { QueryKey } from "@tanstack/query-core";
import { BranduBaseResponse } from "../types/privacy";

interface BranduQueryProps {
  queryKey: QueryKey;
  queryFn: () => Promise<any>;
}

interface BranduQueryResult<T> {
  data?: BranduBaseResponse<T>;
  isLoading: boolean;
  isError: boolean;
  error?: any;
}

function useBranduQuery<T>({
  queryKey,
  queryFn,
}: BranduQueryProps): BranduQueryResult<T> {
  const queryClient = new QueryClient();
  const cachedData = queryClient.getQueryData<BranduBaseResponse<T>>(queryKey);
  if (cachedData) {
    return {
      data: cachedData,
      isLoading: false,
      isError: false,
    };
  }
  const { data, isLoading, error, isError } = useQuery<BranduBaseResponse<T>>({
    queryKey: queryKey,
    queryFn: queryFn,
    onSuccess: (data) => {
      if (data.success) {
        return data.results;
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { data, isLoading, error, isError };
}

export default useBranduQuery;
