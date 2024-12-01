import { useEffect} from "react";
import { ListItem, useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import useCardStore from "../store.ts";
import {ToggleButton} from "./Buttons.tsx";

export const Entrypoint = () => {
  const listQuery = useGetListData();  // Assuming this fetches data
  const deletedCards = useCardStore((state) => state.deletedCards);
  const awesom = useCardStore((state) => state.awesomeList);
  const setAwesome = useCardStore((state) => state.setList);
  const setDeletedCards = useCardStore((state) => state.setDeletedCards);
  const areDeletedVisible = useCardStore((state) => state.areDeletedVisible);
  const setDeletedVisible = useCardStore((state) => state.setDeletedVisibleS);

  useEffect(() => {
    const awesomFromSession = sessionStorage.getItem("awesome");
    const deletedCardsFromSession = sessionStorage.getItem("deletedCards");

    console.log(sessionStorage.length)
    if (sessionStorage.length >= 2) {
      if (awesomFromSession != null) {
        setAwesome(JSON.parse(awesomFromSession))
      }
      if (deletedCardsFromSession != null) {
        setDeletedCards(JSON.parse(deletedCardsFromSession))
      }
    } else {
        if (!listQuery.isLoading && listQuery.data) {

          let emptyMatrix: Array<ListItem> = []
              listQuery.data.map( (data) => {
                let toPush = data
                toPush.isCollapsed = true
                emptyMatrix.push(toPush)
          } )
          setAwesome(emptyMatrix)
        }
      }}, [listQuery.isLoading, listQuery.data]);

  useEffect(() => {
    setAwesome(awesom)
  }, [awesom]);

  useEffect(() => {
    setDeletedCards(deletedCards)
  }, [deletedCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  const refreshBtn = () => {
    setAwesome([])
    setDeletedCards([])
    sessionStorage.clear();
    listQuery.refetch();
  }

  const setDeletedStatus = () => {
    setDeletedVisible(!areDeletedVisible)
  }
  return (
      <div className="flex gap-x-16">
        <div className="w-full max-w-xl">
          <h1 className="inline-block mb-1 font-medium text-lg">My Awesome List ({awesom.length})</h1>
          <button
              className="iniline-block text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
              onClick={ () => refreshBtn()}
          >
            Refresh
          </button>
          <div className="flex flex-col gap-y-3">
            {awesom.map((card: ListItem, index: number) => (
                <Card areAwesome={true} key={card.id} id={index} title={card.title} description={card.description} isCollapsed={card.isCollapsed}/>
            ))}
          </div>
        </div>

        <div className="w-full max-w-xl">
          <div>
            <h1 className="inline-block mb-1 font-medium text-lg">Deleted Cards ({deletedCards.length})</h1>
            <button
                className="iniline-block text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
                onClick={ () => setDeletedStatus() }
            >
              Reveal
            </button>

          </div>
          {areDeletedVisible ? <div className="flex flex-col gap-y-3">
            {deletedCards.map((card: ListItem, index: number) => (
                <Card areAwesome={false} key={card.id} id={index} title={card.title} description={card.description}
                      isCollapsed={card.isCollapsed}/>
            ))}
          </div> : <p></p>}


        </div>

      </div>
  );
};
