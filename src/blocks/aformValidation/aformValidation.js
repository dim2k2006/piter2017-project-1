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
                fullName: self._fullName
            };
        };

        /**
         * Check options
         * @param {Object} options
         * @returns {Object} options
         * @private
         */
        self._checkOptions = (options) => {
            if (options.form instanceof Element === false) {

                console.log('Form must be html element!');

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
                        if (fieldRules.hasOwnProperty(rule)) {

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
