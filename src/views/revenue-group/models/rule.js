import { uuid } from "vue-uuid";

export default class Rule {
  constructor({
    id = uuid.v4(),
    field = null,
    operator = null,
    parameters = {},
    revenue = null // number
  }) {
    const paramId = uuid.v4();
    parameters[`parameter_${paramId}`] = "";
    this.id = id;
    this.field = field;
    this.operator = operator;
    this.parameters = parameters;
    this.revenue = revenue;
  }
}
