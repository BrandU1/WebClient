import CloseIcon from "@icons/close";
import BasketIcon from "@icons/basket";
import Image from "next/image";
import { pickInterface } from "../../types/privacy";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@lib/api";

interface PickList {
  picks: pickInterface[];
}

function PickList({ picks }: PickList) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (id: number) =>
      client.post(`/accounts/baskets/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["basketList"]);
      },
    }
  );

  const mutationDelete = useMutation(
    (id: number) => client.delete(`accounts/wishes/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["pickList"]);
      },
    }
  );

  console.log(picks);

  return (
    <div className="max-w-4xl m-auto ">
      <div>
        <h2 className="py-5 font-bold text-xl">찜한상품</h2>
        <div className="border-[1px] border-black" />
      </div>
      <div className="pickList grid grid-cols-2 gap-x-7 m-auto">
        {picks?.map((res, idx) => {
          return (
            <div key={idx} className=" py-4  flex justify-between w-full ">
              <div className="flex space-x-4">
                <div className="relative w-24 h-24">
                  <Image
                    className="rounded-lg"
                    src={`${res.product.backdrop_image}`}
                    layout="fill"
                    alt="product"
                  />
                </div>

                <div>
                  <p className="font-semibold text-xs text-[#ff0000] py-1 w-20">
                    [품절임박]
                  </p>
                  <h2 className="font-normal text-sm">{res.product.name}</h2>
                  <p>
                    <span className="font-[1100] text-sm">
                      {res.product.price.toLocaleString()}
                    </span>
                    원
                  </p>
                </div>
              </div>

              <div className=" flex-row items-center space-y-14 align-middle ml-52">
                <div
                  onClick={() => {
                    mutationDelete.mutate(res.product.id);
                  }}
                  className="ml-2"
                >
                  <CloseIcon />
                </div>

                {/*<div*/}
                {/*  onClick={() => {*/}
                {/*    mutation.mutate(res.product.id);*/}
                {/*  }}*/}
                {/*  className={`${*/}
                {/*    res.is_basket === true ? "bg-[#0CABA8]" : "bg-[#D9D9D9]"*/}
                {/*  } bg-gray rounded-lg flex justify-center items-center w-7 h-7 mt-3`}*/}
                {/*>*/}
                {/*  <BasketIcon*/}
                {/*    color={`${res.is_basket === true ? "#fff" : "none"}`}*/}
                {/*    width={18}*/}
                {/*    height={18}*/}
                {/*    stroke={`${res.is_basket === true ? "none" : "#fff"}`}*/}
                {/*  />*/}
                {/*</div>*/}
              </div>

              {/*<div className="bg-gray w-7 h-7 rounded-lg flex justify-center items-center  ">*/}
              {/*  <BasketIcon color="white  ₩₩  " width="18" height="18" />*/}
              {/*</div>*/}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PickList;
