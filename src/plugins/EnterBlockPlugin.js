import { keymap } from "prosemirror-keymap";

export default function EnterBlockPlugin({ regex, name }) {
  console.log("match", match);
  console.log("name", name);
  return keymap({
    Enter: (state, dispatch) => {
      console.log("Enter triggered");
      console.log("state", state);
      console.log("dispatch", dispatch);
      const content = state.selection.$head.parent.textContent;
      const match = content.match(regex);
      if (match) {
        console.log("match", match);
      }
      console.log(
        "content",
        state.selection.$head
          .node()
          .textBetween(state.selection.$head.start(), state.selection.head)
      );
      return false;
    },
  });
}
