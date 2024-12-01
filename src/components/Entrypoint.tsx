import { useEffect} from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import useCardStore from "../store.ts";

export const Entrypoint = () => {
  const listQuery = useGetListData();  // Assuming this fetches data
  const deletedCards = useCardStore((state) => state.deletedCards);
  const awesom = useCardStore((state) => state.awesomeList);
  const setAwesome = useCardStore((state) => state.setList);

  // if session storage exists load from session storage
  // if not load form listQuery
  //

  let sS = sessionStorage.getItem("awesomeList");
  console.log(sS)

  // useEffect(() => {
  //   if (sS != undefined && sS != null) {
  //     setAwesome(JSON.parse(sS));
  //   } else {
  //     if (!listQuery.isLoading && listQuery.data) {
  //       setAwesome(listQuery.data)
  //     }
  //   }
  //
  // }, [listQuery.isLoading, listQuery.data]);
  //
  // if (sS == "") {
  // }
  // useEffect(() => {
  //
  // }, []);
  //
  // useEffect(() => {
  //   setAwesome(awesom)
  //   sessionStorage.clear()
  //   sessionStorage.setItem("awesomeList", JSON.stringify(awesom));
  // }, [awesom]);
  //
  if (listQuery.isLoading) {
    return <Spinner />;
  }

  const refershBtn = () => {
    listQuery.refetch()
  }

  return (
      <div className="flex gap-x-16">
        <div className="w-full max-w-xl">
          <h1 className="inline-block mb-1 font-medium text-lg">My Awesome List ({awesom.length})</h1>
          <button
              className="iniline-block text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"

          >
            Refresh
          </button>
          <div className="flex flex-col gap-y-3">
            {awesom.map((card: ListItem, index: number) => (
                <Card key={card.id} id={index} title={card.title} description={card.description}/>
            ))}
          </div>
        </div>

        <div className="w-full max-w-xl">
          <div>
            <h1 className="inline-block mb-1 font-medium text-lg">Deleted Cards ({deletedCards.length})</h1>
            <button
                disabled
                className="iniline-block text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            >
              Reveal
            </button>

          </div>
          <div className="flex flex-col gap-y-3">
            {deletedCards.map((card: ListItem, index: number) => (
                <Card key={card.id}  id={index} title={card.title} description={card.description}/>
            ))}
          </div>

        </div>

      </div>
  );
};
