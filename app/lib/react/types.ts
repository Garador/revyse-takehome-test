import { DraggableProvided } from "@hello-pangea/dnd";
import React from "react";

export type Crypto = {
  id: string;
  name?: string | null;
  symbol: string;
  image: string;
  rate: string;
};

export interface DragEvent {
  draggableId: string;
  type: string;
  source: {
    index: number;
    droppableId: string;
  };
  reason: string;
  mode: string;
  destination: {
    droppableId: string;
    index: number;
  } | null;
  combine: any | null;
}

export interface IStoreUser {
  email: string;
  uid: string;
}

export interface IAuthStore {
  auth: {
    user: IStoreUser | null;
  };
}

export type GetItemStyleType = (
    isDragging: boolean,
    draggableStyle: any,
    isDarkMode: boolean
  ) => React.CSSProperties

export interface WatchlistElementProps {
  item: Crypto;
  provided: DraggableProvided;
  snapshot: {
    isDragging: boolean;
  };
  isDarkMode: boolean;
  getItemStyle: GetItemStyleType;
  setItems: React.Dispatch<React.SetStateAction<Crypto[]>>
}