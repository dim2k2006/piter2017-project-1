const MyForm = {
    form: document.querySelector('#myForm'),
    submitBtn: document.querySelector('#submitButton'),
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
        if (!this.formValidation) {

            this.formValidation = new FormValidation({
                form: this.form,
                rules: this.rules
            });

        }

        const result = this.formValidation.validate();

        console.log(result);
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

        this.validate();
        // console.log(this);
    },

    /**
     * Init form object
     */
    init: function() {
        // this.validate();
        this.setupListeners();
    }
};

MyForm.init();
