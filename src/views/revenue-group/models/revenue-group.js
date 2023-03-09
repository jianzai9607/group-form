import { uuid } from "vue-uuid";
import Rule from "./rule";

export default class RevenueGroup {
  static revenueGroupId = 1;

  constructor({
    id = uuid.v4(),
    groupName = "",
    groupDesc = "",
    isSpecialGroup = true,
    rules = [new Rule({})]
  }) {
    this.id = id;
    this.groupName = groupName;
    this.groupDesc = groupDesc;
    this.isSpecialGroup = isSpecialGroup;
    this.rules = rules; // List<Rule>
  }
}
