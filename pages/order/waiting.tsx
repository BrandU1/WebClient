import { useRouter } from "next/router";
import { useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { useMutation } from "@tanstack/react-query";
import client from "@lib/api";

interface ConfirmOrder {
  orderId: string;
  paymentKey: string;
  amount: string;
}

const confirmTossOrder = async (data: ConfirmOrder) => {
  const response = await client.post("orders/toss/confirm", data);
  return response.data;
};

function Waiting() {
  const router = useRouter();
  const confirmOrder = useMutation({
    mutationFn: (data: ConfirmOrder) => confirmTossOrder(data),
    onSuccess: async (data) => {
      await router.push(`/order/${data.results.order_id}/success`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (router.query.orderId) {
      const { orderId, paymentKey, amount } = router.query;
      confirmOrder.mutate({
        orderId: orderId as string,
        paymentKey: paymentKey as string,
        amount: amount as string,
      });
    }
  }, [router]);
  return (
    <div className="flex flex-col justify-center items-center h-[55vh]">
      <h2 className="mb-3 text-lg font-bold text-main">
        결제가 진행중입니다. 조금만 기다려주세요.
      </h2>
      <CircularProgress size={50} sx={{ color: "#0CABA8" }} />
    </div>
  );
}

export const getStaticProps = async (context: any) => {
  console.log(context);
  return {
    props: {},
  };
};

export default Waiting;
