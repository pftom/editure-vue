import { keymap } from "prosemirror-keymap";
// import { TextSelection } from "prosemirror-state";
import {} from "tiptap";

export default function EnterBlockPlugin({ regex, name }) {
  console.log("name", name);
  return keymap({
    Enter: (state, dispatch) => {
      console.log("Enter triggered");
      console.log("state", state);
      console.log("dispatch", dispatch);
      const content = state.selection.$head.parent.textContent;
      console.log("content", content);
      const match = content.match(regex);
      console.log("match", match);

      if (match) {
        // dispatch(
        //   state.tr.delete(state.selection.$head.start(), state.selection.head)
        // );
        dispatch(
          state.tr.setBlockType(
            state.selection.from,
            state.selection.to,
            state.schema.nodes[name]
          )
        );
        return true;
      }
      return false;
    },
  });
}
