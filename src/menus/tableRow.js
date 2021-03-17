export default function tableColMenuItems(state, index, dictionary) {
  return [
    {
      name: "addRowBefore",
      tooltip: dictionary.addRowBefore,
      attrs: { index: index - 1 },
      active: () => false,
    },
    {
      name: "addRowAfter",
      tooltip: dictionary.addRowAfter,
      attrs: { index },
      active: () => false,
    },
    {
      name: "separator",
    },
    {
      name: "deleteRow",
      tooltip: dictionary.deleteRow,
      active: () => false,
    },
  ];
}
