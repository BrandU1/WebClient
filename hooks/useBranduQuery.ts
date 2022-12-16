import { QueryClient, useQuery } from "@tanstack/react-query";
import { QueryKey } from "@tanstack/query-core";

interface BranduQueryProps {
  queryKey: QueryKey;
  queryFn: () => Promise<any>;
}

interface BranduQueryResult {
  data?: any;
  isLoading: boolean;
  isError: boolean;
  error?: any;
}

const useBranduQuery = ({
  queryKey,
  queryFn,
}: BranduQueryProps): BranduQueryResult => {
  const queryClient = new QueryClient();
  const cachedData = queryClient.getQueryData(queryKey);
  if (cachedData) {
    return {
      data: cachedData,
      isLoading: false,
      isError: false,
    };
  }
  const { data, isLoading, error, isError } = useQuery({
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
};

export default useBranduQuery;
