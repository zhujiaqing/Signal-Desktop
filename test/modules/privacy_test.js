const Path = require('path');

const { assert } = require('chai');

const Privacy = require('../../js/modules/privacy');


const APP_ROOT_PATH = Path.join(__dirname, '..', '..', '..');

describe('Privacy', () => {
  describe('redactPhoneNumbers', () => {
    it('should redact all phone numbers', () => {
      const text = 'This is a log line with a phone number +12223334455\n' +
        'and another one +13334445566';

      const actual = Privacy.redactPhoneNumbers(text);
      const expected = 'This is a log line with a phone number +[REDACTED]455\n' +
        'and another one +[REDACTED]566';
      assert.equal(actual, expected);
    });
  });

  describe('redactGroupIds', () => {
    it('should redact all group IDs', () => {
      const text = 'This is a log line with two group IDs: group(123456789)\n' +
        'and group(abcdefghij)';

      const actual = Privacy.redactGroupIds(text);
      const expected = 'This is a log line with two group IDs: group([REDACTED]789)\n' +
        'and group([REDACTED]hij)';
      assert.equal(actual, expected);
    });
  });

  describe('redactAll', () => {
    it('should redact all sensitive information', () => {
      const text = 'This is a log line with sensitive information:\n' +
        `path1 ${APP_ROOT_PATH}/main.js\n` +
        'phone1 +12223334455 ipsum\n' +
        'group1 group(123456789) doloret\n' +
        `path2 file:///${APP_ROOT_PATH}/js/background.js.` +
        'phone2 +13334445566 lorem\n' +
        'group2 group(abcdefghij) doloret\n';

      const actual = Privacy.redactAll(text);
      const expected = 'This is a log line with sensitive information:\n' +
        'path1 [REDACTED]/main.js\n' +
        'phone1 +[REDACTED]455 ipsum\n' +
        'group1 group([REDACTED]789) doloret\n' +
        'path2 file:///[REDACTED]/js/background.js.' +
        'phone2 +[REDACTED]566 lorem\n' +
        'group2 group([REDACTED]hij) doloret\n';
      assert.equal(actual, expected);
    });
  });
});
