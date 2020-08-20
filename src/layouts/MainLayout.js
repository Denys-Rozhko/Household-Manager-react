import React from "react";
import {useStore} from "react-redux";
import {showError} from "@/util/sendMessage";
import messages from "@/util/errorMessagesMap";
import localize from "@/localization/localize";

export default function EmptyLayout({children}) {
  const firebaseError =  useStore().getState().main.error;
  console.log(useStore().getState());

  if( firebaseError ) {
    showError(showError(messages[firebaseError.code] || localize("Something_went_wrong"));
  }

  return ();
}