import DomainException from '../../../../common/ddd/domain-exception';

export default class UserNotFoundError extends DomainException {
  constructor() {
    super('UserNotFoundError', "The requested user doesn't exists");
  }
}
