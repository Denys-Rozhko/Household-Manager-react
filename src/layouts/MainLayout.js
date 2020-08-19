import React from "react";
import {useStore} from "react-redux";
import {showError} from "@/util/sendMessage";

export default function EmptyLayout({children}) {
  const error =  useStore().getState().main.error;
  console.log(useStore().getState());

  if( error ) {
    showError("test");
  }

  return ();
}