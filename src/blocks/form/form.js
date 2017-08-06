const MyForm = {
    form: document.querySelector('#myForm'),
    submitBtn: document.querySelector('#submitButton'),
    resultContainer: document.querySelector('#resultContainer'),
    formValidation: '',
    rules: {
        fio: {
            fullName: true
        },
        email: {
            email: true
        },
        phone: {
            phone: true
        }
    },
    settings: {
        domains: ['ya.ru', 'yandex.ru', 'yandex.ua', 'yandex.by', 'yandex.kz', 'yandex.com'],
        phoneSumLimit: 30
    },
    fieldsFilter: ['fio', 'email', 'phone'],

    /**
     * Add events listeners
     */
    setupListeners: function() {
        this.submitBtn.addEventListener('click', this.submit.bind(this));
    },

    /**
     * Validate form
     */
    validate: function() {
        return this.formValidation.validate();
    },

    /**
     * Retrieve data from inputs
     * @returns {Object} data
     */
    getData: function() {
        const inputs = this.form.querySelectorAll('input');
        const data = {};

        inputs.forEach((input, index) => {
            const name = input.name || `input-${index}`;
            const value = input.value || '';

            data[name] = value;
        });

        return data;
    },

    /**
     * Set data for inputs
     * @param {Object} data
     */
    setData: function(data) {
        for (let inputName in data) {

            if (this.fieldsFilter.indexOf(inputName) !== -1) {

                const input = this.form.querySelector(`[name=${inputName}]`);

                if (input) {

                    const value = data[inputName];

                    input.value = value;

                }

            }
        }
    },

    /**
     * Submit form
     * @param {Object} event
     */
    submit: function(event) {
        event.preventDefault();

        const errorInputs = this.form.querySelectorAll('.error');

        if (errorInputs) {

            errorInputs.forEach(input => input.classList.remove('error'));

        }

        const form = this.validate();

        if (form.isValid) {

            const options = this.getFormSettings();

            this.request(options);

        } else {

            form.errorFields.forEach(fieldName => {
                const field = this.form.querySelector(`[name=${fieldName}]`);

                if (field) {

                    field.classList.add('error');

                }
            });

        }
    },

    /**
     * Send request to server
     * @param {Object} options
     */
    request: function(options) {
        if (!options.url) {

            /*eslint-disable no-console*/
            console.log('Form action attribute is not specified!');
            /*eslint-enable no-console*/

            return false;

        }

        const req = fetch(
            options.url,
            options.settings
        );

        req
            .then(blob => blob.json())
            .then(data => {
                const method = data.status ? data.status : '';

                if (!method) {

                    /*eslint-disable no-console*/
                    console.log('Can not identify response status!');
                    /*eslint-enable no-console*/

                }

                if (this[method]) {

                    this[method](data);

                }
            })
            .catch(error => {
                /*eslint-disable no-console*/
                console.log(error);
                /*eslint-enable no-console*/
            });
    },

    /**
     * Handle response
     * @param data
     */
    success: function(data) {
        data.text = 'Success';

        this.resultContainer.classList.add('success');
        this.resultContainer.textContent = data.text;
    },

    error: function() {
        // error
    },

    progress: function() {
        // progress
    },

    /**
     * Get form settings
     * @returns {Object}
     */
    getFormSettings: function() {
        return {
            url: this.form.action,
            settings: {
                method: this.form.method ? this.form.method : 'get'
            }
        };
    },

    /**
     * Init validation for form
     */
    initValidation: function() {
        this.formValidation = new FormValidation({
            form: this.form,
            rules: this.rules,
            settings: this.settings
        });
    },

    /**
     * Init form object
     */
    init: function() {
        this.initValidation();
        this.setupListeners();
    }
};

MyForm.init();
