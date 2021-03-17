import { isNodeActive } from "../queries";

export default function tableColMenuItems(state, index, dictionary) {
  const { schema } = state;

  return [
    {
      name: "setColumnAttr",
      tooltip: dictionary.alignLeft,
      attrs: { index, alignment: "left" },
      active: isNodeActive(schema.nodes.th, {
        colspan: 1,
        rowspan: 1,
        alignment: "left",
      }),
    },
    {
      name: "setColumnAttr",
      tooltip: dictionary.alignCenter,
      attrs: { index, alignment: "center" },
      active: isNodeActive(schema.nodes.th, {
        colspan: 1,
        rowspan: 1,
        alignment: "center",
      }),
    },
    {
      name: "setColumnAttr",
      tooltip: dictionary.alignRight,
      attrs: { index, alignment: "right" },
      active: isNodeActive(schema.nodes.th, {
        colspan: 1,
        rowspan: 1,
        alignment: "right",
      }),
    },
    {
      name: "separator",
    },
    {
      name: "addColumnBefore",
      tooltip: dictionary.addColumnBefore,
      active: () => false,
    },
    {
      name: "addColumnAfter",
      tooltip: dictionary.addColumnAfter,
      active: () => false,
    },
    {
      name: "deleteColumn",
      tooltip: dictionary.deleteColumn,
      active: () => false,
    },
  ];
}
