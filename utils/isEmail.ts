import * as EmailValidator from "email-validator";
export default (email: string): boolean => {
  return EmailValidator.validate(email);
};
