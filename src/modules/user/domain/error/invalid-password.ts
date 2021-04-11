import DomainException from '../../../../common/ddd/domain-exception';

const PASSWORD_CONSTRAINTS = [
  'At least one upper case character',
  'At least one lower case character',
  'At least one digit',
  'At least one special character or space',
  'Minimum eight characters',
];

export default class InvalidPassword extends DomainException {
  constructor() {
    super('InvalidPassword', `The password provided does't accomplish policy requirements.\n${PASSWORD_CONSTRAINTS.concat('\n')}`);
  }
}
