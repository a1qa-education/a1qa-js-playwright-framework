export default class RandomUtils {
  static LETTERS_CAPITAL_MIN = 65;   // 'A'
  static LETTERS_CAPITAL_MAX = 90;   // 'Z'
  static LETTERS_LOWER_MIN = 97;     // 'a'
  static LETTERS_LOWER_MAX = 122;    // 'z'
  static CYRILLIC_MIN = 1040;        // 'А'
  static CYRILLIC_MAX = 1103;        // 'я'
  static DIGIT_MIN = 48;             // '0'
  static DIGIT_MAX = 57;             // '9'
  static SPECIAL_CHARS = '!@#$%&*';
  static DEFAULT_LENGTH = 10;
  static DOMAINS_LIST = ['other', '.org', '.co.uk', '.net', '.gov', '.de', '.fr', '.nl', '.com', '.be', '.jpg'];

  /**
   * Generates a random string built from latin letters only.
   * @param {number} length
   * @returns {string}
   */
  static getRandomAlphabeticString(length = this.DEFAULT_LENGTH) {
    let result = '';
    while (result.length < length) {
      const code = this.getRandomIntInRange(
        this.LETTERS_CAPITAL_MIN,
        this.LETTERS_LOWER_MAX
      );

      if (
        code <= this.LETTERS_CAPITAL_MAX ||
        code >= this.LETTERS_LOWER_MIN
      ) {
        result += String.fromCharCode(code);
      }
    }
    return result;
  }

  /**
   * Generates a password containing a capital letter, a lower case letter,
   * a digit, a special character and a cyrillic character.
   * @param {number} length
   * @returns {string}
   */
  static generatePassword(length) {
    const required = 6;
    if (length < required) {
      throw new Error(`Password must be at least ${required} characters long`);
    }

    let password = '';
    password += this.getRandomCharInRange(this.LETTERS_CAPITAL_MIN, this.LETTERS_CAPITAL_MAX);
    password += this.getRandomCharInRange(this.LETTERS_LOWER_MIN, this.LETTERS_LOWER_MAX);
    password += this.getRandomCharInRange(this.DIGIT_MIN, this.DIGIT_MAX);
    password += this.getRandomCharFromString(this.SPECIAL_CHARS);
    password += this.getRandomCharInRange(this.CYRILLIC_MIN, this.CYRILLIC_MAX);

    const remaining = length - password.length;
    password += this.getRandomAlphabeticString(remaining);

    return this.shuffleString(password);
  }

  /**
   * Returns a random integer between 0 (inclusive) and bound (exclusive).
   * @param {number} bound
   * @returns {number}
   */
  static getRandomInt(bound) {
    return Math.floor(Math.random() * bound);
  }

  /**
   * Returns a random integer within the given inclusive range.
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  static getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Returns a random character with a char code within the given inclusive range.
   * @param {number} min
   * @param {number} max
   * @returns {string}
   */
  static getRandomCharInRange(min, max) {
    return String.fromCharCode(this.getRandomIntInRange(min, max));
  }

  /**
   * Returns a random character taken from the given string.
   * @param {string} str
   * @returns {string}
   */
  static getRandomCharFromString(str) {
    return str.charAt(this.getRandomInt(str.length));
  }

  /**
   * Randomly shuffles the characters of the given string.
   * @param {string} str
   * @returns {string}
   */
  static shuffleString(str) {
    return str
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  /**
   * Returns a random domain postfix supported by the sign up form.
   * @returns {string}
   */
  static getRandomDomain() {
    return this.DOMAINS_LIST[this.getRandomInt(this.DOMAINS_LIST.length)];
  }
}
