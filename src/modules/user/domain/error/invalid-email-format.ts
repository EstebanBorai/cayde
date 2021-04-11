import DomainException from '../../../../common/ddd/domain-exception';

export default class InvalidEmailFormat extends DomainException {
  constructor(email: string) {
    super(
      'InvalidEmailFormat',
      `The email "${email}", is not a valid email address`,
    );
  }
}
