import React from "react";
import {useStore} from "react-redux";
import {showError} from "@/util/sendMessage";
import messages from "@/util/errorMessagesMap";
import localize from "@/localization/localize";

export default function EmptyLayout({children}) {
  const firebaseError =  useStore().getState().main.error;
  console.log(useStore().getState());

  if( firebaseError ) {
    showError(messages[firebaseError.code] || localize("Something_went_wrong"));
  }

  return (
    <div className="grey darken-1 empty-layout">
      {children}
    </div>
  );
}