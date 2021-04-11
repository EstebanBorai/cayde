import DomainException from '../../../../common/ddd/domain-exception';

export default class EmailTakenError extends DomainException {
  constructor(email: string) {
    super('EmailTakenError', `The email "${email}", is already taken`);
  }
}
