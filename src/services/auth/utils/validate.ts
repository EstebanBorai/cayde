/**
 *
 * @param password
 *
 * Validates a password string to meet the following
 * requirements:
 *
 * - At least one digit [0-9]
 * - At least one lowercase character [a-z]
 * - At least one uppercase character [A-Z]
 * - At least one special character [*.!@#$%^&(){}[]:;<>,.?/~_+-=|\]
 * - At least 8 characters in length, but no more than 32.
 */
const isValidPassword = (password: string): boolean =>
  new RegExp(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?\/~_+-=|\]).{8,32}$/,
  ).test(password);

/**
 *
 * @param email
 *
 * Validates a email string to meet the following
 * requirements:
 *
 * - Starts with alphanumeric characters
 * - Have one "at" (@) sign
 * - Have at least one alphanumeric character
 *   right after the "at" (@) sign
 * - Ends with a "dot" (.) sign, followed by a
 *   maximum of 4 alphanumeric characters
 */
const isValidEmail = (email: string): boolean =>
  new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email);

/**
 *
 * @param username
 *
 * Validates a username have from 8 to 16
 * alphanumeric characters inclusive
 */
const isValidUserName = (username: string): boolean =>
  new RegExp(/^[A-Za-z0-9]{8,16}/).test(username);

export default {
  isValidPassword,
  isValidEmail,
  isValidUserName,
};
