import { create } from 'zustand';
import {ListItem} from "./api/getListData.ts";

type State = {
    initData: Array<ListItem>;
    awesomeList: Array<ListItem>;
    deletedCards: Array<ListItem>;
    areDeletedVisible: boolean;
}

type Action = {
    setData: (data: Array<ListItem>) => void;
    setList: (data: Array<ListItem>) => void;
    setDeletedCards: (data: Array<ListItem>) => void;
    setDeletedVisibleS: (data: boolean) => void;
}
const useCardStore = create<State & Action>((set) => ({
    initData: [],
    awesomeList: [],
    deletedCards: [],
    areDeletedVisible: false,
    setData: (data: Array<ListItem>) => set({ initData: data }),
    setList: (data: Array<ListItem>) => set({ awesomeList: data}),
    setDeletedCards: (data: Array<ListItem>) => set({ deletedCards: data }),
    setDeletedVisibleS: (data: boolean) => set({ areDeletedVisible: data })
}));

export default useCardStore;