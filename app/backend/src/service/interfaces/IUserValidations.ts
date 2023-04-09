export default interface IUserValidations {
  validateEmail(email: string): void;
  validatePassword(password: string): void;
}
