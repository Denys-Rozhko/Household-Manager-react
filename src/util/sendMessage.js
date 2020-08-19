export function showMessage(text) {
  window.M.toast({ html: text });
}

export function showError(text) {
  window.M.toast({ html: `[Ошибка] ${text}` });
}