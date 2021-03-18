import { isNodeActive } from "../queries";

export default function tableColMenuItems(state, index, dictionary) {
  const { schema } = state;

  return [
    {
      name: "setColumnAttr",
      icon: "el-icon-d-arrow-left",
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
      icon: "el-icon-sort",
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
      icon: "el-icon-d-arrow-right",
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
      icon: "el-icon-back",
      tooltip: dictionary.addColumnBefore,
      active: () => false,
    },
    {
      name: "addColumnAfter",
      icon: "el-icon-right",
      tooltip: dictionary.addColumnAfter,
      active: () => false,
    },
    {
      name: "separator",
    },
    {
      name: "deleteColumn",
      icon: "el-icon-delete",
      tooltip: dictionary.deleteColumn,
      active: () => false,
    },
  ];
}
