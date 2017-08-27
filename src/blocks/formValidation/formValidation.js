/**
 * Creates a new FormValidation class
 */
class FormValidation {
    /**
     * Constructor
     * @param {Object} options
     * @returns {Object}
     */
    constructor(options) {
        this._checkOptions = this._checkOptions.bind(this);
        this._fullName = this._fullName.bind(this);
        this._email = this._email.bind(this);
        this._phone = this._phone.bind(this);
        this._validate = this._validate.bind(this);

        this.options = this._checkOptions(options);
        this.methods = {
            fullName: this._fullName,
            email: this._email,
            phone: this._phone
        };

        return this.options ? {validate: this._validate} : {};
    }

    /**
     * Check options
     * @param {Object} options
     * @returns {Object} options
     * @private
     */
    _checkOptions(options) {
        if (options.form instanceof Element === false) {

            /*eslint-disable no-console*/
            console.log('Form must be html element!');
            /*eslint-enable no-console*/

            return false;

        }

        options.rules = options.rules ? options.rules : {};
        options.settings.domains = options.settings.domains ? options.settings.domains : [];
        options.settings.phoneSumLimit = options.settings.phoneSumLimit ? options.settings.phoneSumLimit : 0;

        return options;
    }

    /**
     * Check full name
     * @param {String} value
     * @returns {Boolean}
     * @private
     */
    _fullName(value) {
        return /^([\S]+)\s([\S]+)\s([\S]+)$/.test(value);
    }

    /**
     * Check email
     * @param {String} value
     * @returns {Boolean}
     * @private
     */
    _email(value) {
        const domains = this.options.settings.domains;
        const idx = value.lastIndexOf('@');
        const domain = idx > -1 ? value.slice(idx + 1) : '';

        if (domains.indexOf(domain) === -1) {

            return false;

        }

        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }

    /**
     * Check phone
     * @param {String} value
     * @returns {Boolean}
     * @private
     */
    _phone(value) {
        const sumLimit = this.options.settings.phoneSumLimit;
        const digits = value.replace(/[^/\d]/g, '');
        const sum = digits.split('').reduce((sum, number) => sum + parseInt(number), 0);

        if (sum > sumLimit) {

            return false;

        }

        return /^\+7\(([0-9]{3})\)([0-9]{3})[-]([0-9]{2})[-]([0-9]{2})$/.test(value);
    }

    /**
     * Validate fields
     * @returns {Object} validationResult
     * @private
     */
    _validate() {
        const validationResult = {
            isValid: false,
            errorFields: []
        };

        const form = this.options.form;
        const rules = this.options.rules;
        const methods = this.methods;

        for (const fieldName in rules) {
            if (rules.hasOwnProperty(fieldName)) {

                const field = form.querySelector(`[name=${fieldName}]`);
                const value = field.value;
                const fieldRules = rules[fieldName];

                for (const rule in fieldRules) {
                    if (fieldRules.hasOwnProperty(rule) && fieldRules[rule]) {

                        if (methods[rule]) {

                            const result = methods[rule](value);

                            if (!result) {

                                validationResult.errorFields.push(fieldName);

                            }

                        }

                    }
                }

            }
        }

        validationResult.isValid = validationResult.errorFields.length === 0;

        return validationResult;
    }
}

export default FormValidation;
