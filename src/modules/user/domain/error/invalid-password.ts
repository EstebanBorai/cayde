import DomainException from '../../../../common/ddd/domain-exception';

export default class InvalidPassword extends DomainException {
  constructor() {
    super('InvalidPassword', "The password provided does't accomplish policy requirements");
  }
}
