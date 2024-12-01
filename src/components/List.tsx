import { FC } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import useCardStore from "../store.ts";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
  id: number
};

export const Card: FC<CardProps> = ({id, title, description}) => {
    const storeData = useCardStore((state) => state.awesomeList);

    const deleteCard = (id: number) => {
        const hardCopy = JSON.parse(JSON.stringify(storeData))
        const card = storeData[id]
        // console.log(hardCopy)
        hardCopy.splice(id,1)
        console.log(hardCopy)
        useCardStore.setState({ awesomeList: hardCopy })
        useCardStore.setState({ deletedCards: [...useCardStore.getState().deletedCards, card] })
    }

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton>
            <ChevronUpIcon />
          </ExpandButton>
          <DeleteButton onClick={ () => deleteCard(id)}/>
        </div>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};
