import { create } from 'zustand';
import {ListItem} from "./api/getListData.ts";

type State = {
    initData: Array<ListItem>;
    awesomeList: Array<ListItem>;
    deletedCards: Array<ListItem>;
}

type Action = {
    setData: (data: Array<ListItem>) => void;
    setList: (data: Array<ListItem>) => void;
    setDeletedCards: (data: Array<ListItem>) => void;
}
const useCardStore = create<State & Action>((set) => ({
    initData: [],
    awesomeList: [],
    deletedCards: [],
    setData: (data: Array<ListItem>) => set({ initData: data }),
    setList: (data: Array<ListItem>) => set({ awesomeList: data}),
    setDeletedCards: (data: Array<ListItem>) => set({ deletedCards: data }),
}));

export default useCardStore;