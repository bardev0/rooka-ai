import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import useCardStore from "../store.ts";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
  id: number,
    isCollapsed :ListItem["isCollapsed"];
  areAwesome: boolean;
};

export const Card: FC<CardProps> = ({areAwesome, id, title, description, isCollapsed}) => {
    const storeData = useCardStore((state) => state.awesomeList);
    const deletedCards = useCardStore( (state) => state.deletedCards)
    const deleteCard = (id: number) => {
        const hardCopy = JSON.parse(JSON.stringify(storeData))
        const card = storeData[id]
        const hardDelete = [...deletedCards]
        hardDelete.push(card)
        hardCopy.splice(id,1)
        useCardStore.setState({ awesomeList: hardCopy })
        useCardStore.setState({ deletedCards: hardDelete })
        sessionStorage.setItem("awesome", JSON.stringify(hardCopy))
        sessionStorage.setItem("deletedCards", JSON.stringify(hardDelete))
    }

    const expandCard = (id: number) => {
        if (areAwesome) {
            let copy = JSON.parse(JSON.stringify(storeData))
            copy[id].isCollapsed = !copy[id].isCollapsed
            console.log(copy[id])
            useCardStore.setState({ awesomeList: copy })}
         else {
        let copy = JSON.parse(JSON.stringify(deletedCards))
        copy[id].isCollapsed = !copy[id].isCollapsed
        console.log(copy[id])
            useCardStore.setState({ deletedCards: copy })}}



  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton onClick={ () => expandCard(id)}>
            <ChevronUpIcon />
          </ExpandButton>
          <DeleteButton onClick={ () => deleteCard(id)}/>
        </div>
      </div>
        {isCollapsed ? <p></p> : <p>{description}</p>}
    </div>
  );
};
