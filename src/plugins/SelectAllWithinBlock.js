import { keymap } from "prosemirror-keymap";

export default function SelectAllWithinBlockPlugin() {
  return keymap({
    "Mod-a": (state, dispatch) => {
      console.log("state", state);
      console.log("dispatch", dispatch);
      return false;
    },
  });
}
