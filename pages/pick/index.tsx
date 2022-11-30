import PickList from "@components/pick/pick";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";

function Index() {
  const getPickList = () => {
    return client.get(`accounts/wishes/`).then((res) => res.data);
  };
  const { data, isLoading } = useQuery(["pickList"], getPickList);

  return (
    <div>
      <PickList />
    </div>
  );
}
export default Index;
