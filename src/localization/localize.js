import store from "@/store";
import ru from "./RU-locale.json";
import en from "./EN-locale.json";

const locales = {
  "ru-RU": ru,
  "en-US": en
};

export default function(key) {
  const locale = store.getState().info.locale || "en-US";
  return locales[locale][key] || `[Localize error] key ${key} not found`;
}
