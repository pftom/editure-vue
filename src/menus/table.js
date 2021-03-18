export default function tableMenuItems(dictionary) {
  return [
    {
      name: "deleteTable",
      tooltip: dictionary.deleteTable,
      active: () => false,
    },
  ];
}
