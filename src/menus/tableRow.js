export default function tableColMenuItems(state, index, dictionary) {
  return [
    {
      name: "addRowBefore",
      icon: "el-icon-top",
      tooltip: dictionary.addRowBefore,
      attrs: { index: index - 1 },
      active: () => false,
    },
    {
      name: "addRowAfter",
      icon: "el-icon-bottom",
      tooltip: dictionary.addRowAfter,
      attrs: { index },
      active: () => false,
    },
    {
      name: "separator",
    },
    {
      name: "deleteRow",
      icon: "el-icon-delete",
      tooltip: dictionary.deleteRow,
      active: () => false,
    },
  ];
}
