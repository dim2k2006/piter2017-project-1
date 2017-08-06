(() => {
    /**
     * Creates a new FormValidation class.
     * @param {Object} options
     */
    const aFormValidation = function(options) {
        const self = this;

        /**
         * Get validation options
         * @private
         */
        self._getOptions = () => {
            self.options = self._checkOptions(options);
            self.methods = {
                fullName: self._fullName,
                email: self._email
            };
            self.domains = ['ya.ru', 'yandex.ru', 'yandex.ua', 'yandex.by', 'yandex.kz', 'yandex.com'];
        };

        /**
         * Check options
         * @param {Object} options
         * @returns {Object} options
         * @private
         */
        self._checkOptions = (options) => {
            if (options.form instanceof Element === false) {

                /*eslint-disable no-console*/
                console.log('Form must be html element!');
                /*eslint-enable no-console*/

                return false;

            }

            options.rules = options.rules ? options.rules : {};

            return options;
        };

        /**
         * Check full name
         * @param {String} value
         * @returns {Boolean}
         * @private
         */
        self._fullName = (value) => {
            return /^([\S]+)\s([\S]+)\s([\S]+)/.test(value);
        };

        /**
         * Check email
         * @param {String} value
         * @returns {Boolean}
         * @private
         */
        self._email = (value) => {
            const domains = self.domains;
            const idx = value.lastIndexOf('@');
            const domain = idx > -1 ? value.slice(idx + 1) : '';

            if (domains.indexOf(domain) === -1) {

                return false;

            }

            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        };

        /**
         * Validate fields
         */
        self.validate = () => {
            const validationResult = {
                isValid: false,
                errorFields: []
            };

            const form = self.options.form;
            const rules = self.options.rules;
            const methods = self.methods;

            for (const fieldName in rules) {
                if (rules.hasOwnProperty(fieldName)) {

                    const field = form.querySelector(`[name=${fieldName}]`);
                    const value = field.value;
                    const fieldRules = rules[fieldName];

                    for (const rule in fieldRules) {
                        if (fieldRules.hasOwnProperty(rule) && fieldRules[rule]) {

                            const prop = fieldRules[rule];

                            if (methods[rule] && prop) {

                                const result = methods[rule](value, prop);

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
        };

        /**
         * Init validation
         * @returns {Boolean}
         * @private
         */
        self._init = () => {
            self._getOptions();

            return self.options ? true : false;
        };

        if (!self._init()) {

            return {};

        }

        return {
            validate: self.validate
        };
    };

    /**
     * Export validation class to global scope
     */
    if (!window.FormValidation) {

        window.FormValidation = aFormValidation;

    } else {

        /*eslint-disable no-console*/
        console.log(`Property 'FormValidation' is already in window!`);
        /*eslint-enable no-console*/

    }
})();
