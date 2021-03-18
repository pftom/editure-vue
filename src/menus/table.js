export default function tableMenuItems(dictionary) {
  return [
    {
      name: "deleteTable",
      icon: "el-icon-delete",
      tooltip: dictionary.deleteTable,
      active: () => false,
    },
  ];
}
