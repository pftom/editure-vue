import baseDictionary from "../utils/dictionary";

export default function tableMenuItems(dictionary) {
  return [
    {
      name: "deleteTable",
      tooltip: dictionary.deleteTable,
      active: () => false,
    },
  ];
}
