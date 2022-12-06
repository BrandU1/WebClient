import { useState } from "react";
import client from "@lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  WritableReviewInterface,
  WrittenReviewInterface,
} from "../../../types/review";

function ReviewComp() {
  const [reviewTab, setReviewTab] = useState<number>(0);
  const getWrittenReview = () => {
    return client.get(`accounts/reviews`).then((res) => res.data);
  };
  const { data: writtenData, isLoading: writtenIsLoading } = useQuery<
    WrittenReviewInterface[]
  >(["myWrittenReview"], getWrittenReview);
  const getWritableReview = () => {
    return client.get(`accounts/reviews/writable`).then((res) => res.data);
  };
  const { data: writableData, isLoading: writableIsLoading } = useQuery<
    WritableReviewInterface[]
  >(["myWritableReview"], getWritableReview);

  if (writtenData || writableData) {
    return <div></div>;
  }

  return (
    <div className="pl-5 flex flex-col flex-1">
      <div className="title flex flex-row items-center border-b pb-5">
        <span className="font-bold text-lg">취소/교환/환불 내역</span>
      </div>

      <div className="border border-main w-full rounded-lg flex justify-evenly mt-5 overflow-hidden">
        <button
          onClick={() => setReviewTab(0)}
          className={`w-full py-[10px] ${
            reviewTab === 0 ? "bg-main text-white" : "text-main"
          }`}
        >
          <span>작성가능한 리뷰</span>
        </button>
        <button
          onClick={() => setReviewTab(1)}
          className={`w-full py-[10px] ${
            reviewTab === 1 ? "bg-main text-white" : "text-main"
          }`}
        >
          <span>작성한 리뷰</span>
        </button>
      </div>
      <div className="border-b border-[#EDEDED] mt-5" />

      {/*작성 가능한 리뷰*/}

      <div className={`${reviewTab === 1 ? "hidden" : null}`}>
        {/*{writableData?.map((list, idx) => {*/}
        {/*  return (*/}
        {/*    <div*/}
        {/*      key={idx}*/}
        {/*      className={`border-b pb-5 border-[#EDEDED] flex justify-between mt-4 ${*/}
        {/*        list.is_write ? "hidden" : null*/}
        {/*      }`}*/}
        {/*    >*/}
        {/*      <div className="flex flex-row">*/}
        {/*        <div className="img w-[100px] h-[100px] rounded-lg bg-gray-300 mx-[10px]" />*/}
        {/*        <div className="inform flex flex-col">*/}
        {/*          <span className="text-sm mb-1">{list.product_name}</span>*/}
        {/*          <span className="text-sm text-[#767676] mb-8">*/}
        {/*            구매일 : {list.payment_day.slice(0, 11)}*/}
        {/*          </span>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="reviewBtn">*/}
        {/*        {list.is_write ? (*/}
        {/*          <button*/}
        {/*            onClick={() => {*/}
        {/*              // setModifyOpen(true);*/}
        {/*              // setModalIndex(list.id);*/}
        {/*            }}*/}
        {/*            className="text-sm bg-white text-Main-deepblue border border-Main-deepblue rounded-lg py-2 px-5"*/}
        {/*          >*/}
        {/*            리뷰수정*/}
        {/*          </button>*/}
        {/*        ) : (*/}
        {/*          <button*/}
        {/*            onClick={() => {*/}
        {/*              // setReviewOpen(true);*/}
        {/*              // setModalIndex(list.id);*/}
        {/*            }}*/}
        {/*            className="text-sm text-white bg-Main-deepblue rounded-lg py-2 px-5"*/}
        {/*          >*/}
        {/*            리뷰쓰기*/}
        {/*          </button>*/}
        {/*        )}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})}*/}
      </div>

      {/*작성한 리뷰 */}

      <div className={`${reviewTab === 0 ? "hidden" : null}`}>
        {/*{writtenData?.map((list, idx) => {*/}
        {/*  return (*/}
        {/*    <div*/}
        {/*      key={idx}*/}
        {/*      className={`border-b pb-5 border-[#EDEDED] flex justify-between mt-4 ${*/}
        {/*        list.is_write ? null : "hidden"*/}
        {/*      }`}*/}
        {/*    >*/}
        {/*      <div*/}
        {/*        className="flex flex-row w-[600px]"*/}
        {/*        onClick={() => {*/}
        {/*          // setConfirmOpen(true);*/}
        {/*          // setModalIndex(list.id);*/}
        {/*        }}*/}
        {/*      >*/}
        {/*        <div className="img w-[100px] h-[100px] rounded-lg bg-gray-300 mx-[10px]" />*/}
        {/*        <div className="inform flex flex-col">*/}
        {/*          <span className="text-sm mb-1">{list.product_name}</span>*/}
        {/*          <span className="text-sm text-[#767676] mb-8">*/}
        {/*            구매일 : {list.payment_day.slice(0, 11)}*/}
        {/*          </span>*/}
        {/*          <div className="flex space-x-1">*/}
        {/*            /!*<Rating*!/*/}
        {/*            /!*  name="read-only"*!/*/}
        {/*            /!*  value={list.star / 2}*!/*/}
        {/*            /!*  readOnly*!/*/}
        {/*            /!*  precision={0.5}*!/*/}
        {/*            /!*  emptyIcon={*!/*/}
        {/*            /!*    <StarIcon style={{ opacity: 1 }} fontSize="inherit" />*!/*/}
        {/*            /!*  }*!/*/}
        {/*/>*/}
        {/*</div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="reviewBtn">*/}
        {/*        {list.description ? (*/}
        {/*          <button*/}
        {/*            onClick={() => {*/}
        {/*              // setModifyOpen(true);*/}
        {/*              // setModalIndex(list.id);*/}
        {/*            }}*/}
        {/*            className="text-sm bg-white text-Main-deepblue border border-Main-deepblue rounded-lg py-2 px-5"*/}
        {/*          >*/}
        {/*            리뷰수정*/}
        {/*          </button>*/}
        {/*        ) : (*/}
        {/*          <button*/}
        {/*            onClick={() => {*/}
        {/*              // setReviewOpen(true);*/}
        {/*              // setModalIndex(list.id);*/}
        {/*            }}*/}
        {/*            className="text-sm text-white bg-Main-deepblue rounded-lg py-2 px-5"*/}
        {/*          >*/}
        {/*            리뷰수정*/}
        {/*          </button>*/}
        {/*        )}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})}*/}
      </div>
    </div>
  );
}

export default ReviewComp;
