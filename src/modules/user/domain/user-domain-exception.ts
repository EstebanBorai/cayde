import DomainException from '../../../common/ddd/domain-exception';

export namespace UserDomainError {
  export class InvalidEmailFormat extends DomainException {
    constructor(email: string) {
      super('InvalidEmailFormat', `The email "${email}", is not a valid email address`);
    }
  }

  export class InvalidPassword extends DomainException {
    constructor() {
      super('InvalidPassword', "The password provided does't accomplish policy requirements");
    }
  }
}
