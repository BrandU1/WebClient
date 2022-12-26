// import { atom, selector } from "recoil";
// import { recoilPersist } from "recoil-persist";
// import client from "@lib/api";
// import { useQuery } from "@tanstack/react-query";
//
// interface userRecoilState {
//   point: number;
// }
//
// const { persistAtom } = recoilPersist();
//
// export const userPointState = atom({
//   key: "pointState",
//   default: { point: 0 },
//   effects_UNSTABLE: [persistAtom],
// });
//
// function getData() {
//   const response = () => {
//     return client.get("accounts/point").then((res) => res.data);
//   };
//   const { data } = useQuery(["userData", "point"], response);
//   return data;
// }
//
// export const getUserData = selector({
//   key: "userdata/get",
//   get: async ({ get }) => {
//     const { data } = get(await getData());
//     return data.point;
//   },
//   set: ({ set }, newValue) => {
//     set(userPointState, newValue);
//   },
// });
// @ts-ignore
