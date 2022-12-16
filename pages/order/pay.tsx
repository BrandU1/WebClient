import PriceBar from "@components/pages/order/pricebar";
import OrderPay from "@components/pages/order/orderpay";

function PayPage() {
  return (
    <div className=" m-auto flex flex-row space-x-5">
      <div className="flex flex-col">
        <p className="font-bold text-xl my-5">주문 및 결제</p>
        <OrderPay />
      </div>
    </div>
  );
}

export default PayPage;
