import DomainException from '../../../../common/ddd/domain-exception';

export default class PasswordDoesntMatch extends DomainException {
  constructor() {
    super('PasswordDoesntMatch', "Password confirmation doesn't matches");
  }
}
