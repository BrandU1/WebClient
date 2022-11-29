import OrderList from "@components/pages/order/orderlist";
import Pricebar from "@components/pages/order/pricebar";

function OrderPage() {
  return (
    <div className="max-w-4xl m-auto flex flex-row space-x-5">
      <div className="flex flex-col">
        <p className="font-bold text-xl my-5">주문 및 결제</p>
        <OrderList />
      </div>
      <div className="price">
        <Pricebar />
      </div>
    </div>
  );
}

export default OrderPage;
