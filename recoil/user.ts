// import { atom, selector } from "recoil";
// import { recoilPersist } from "recoil-persist";
// import { Point, UserInterface } from "../types/privacy";
//
// const { persistAtom } = recoilPersist();
//
// interface UserRecoilState {
//   id: number;
//   name?: string;
//   nickname?: string;
//   email?: string;
//   phone_number?: string;
//   social_link?: string;
//   platforms: {
//     platform: string;
//   }[];
//   point: number;
// }
//
// export const userPoint = atom<Point | null>({
//   key: "userPoint",
//   default: null,
//   effects_UNSTABLE: [persistAtom],
// });
//
// export const userInfo = atom<UserInterface | null>({
//   key: "userInfo",
//   default: null,
//   effects_UNSTABLE: [persistAtom],
// });
//
// export const getUserPoint = selector<Point | null>({
//   key: "getUserPoint",
//   get: ({ get }) => {
//     return get(userPoint);
//   },
// });
//
// export const getUserInfo = selector<UserInterface | null>({
//   key: "getUserInfo",
//   get: ({ get }) => {
//     return get(userInfo);
//   },
// });
//
// export const userData = selector<UserRecoilState>({
//   key: "userDataState",
//   get: ({ get }) => {
//     const point = get(getUserPoint);
//     const info = get(getUserInfo);
//
//     return {
//       id: info?.id,
//       name: info?.name,
//       nickname: info?.nickname,
//       email: info?.email,
//       phone_number: info?.phone_number,
//       social_link: info?.social_link,
//       platforms: info?.platforms,
//       point: point?.point,
//     };
//   },
// });

export {};
