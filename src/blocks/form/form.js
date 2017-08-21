import FormValidation from '../formValidation/formValidation';

/**
 * Creates a new Form class
 */
class Form {
    /**
     * Constructor
     */
    constructor() {
        this._setupListeners = this._setupListeners.bind(this);
        this._validate = this._validate.bind(this);
        this._getData = this._getData.bind(this);
        this._setData = this._setData.bind(this);
        this._submit = this._submit.bind(this);
        this._request = this._request.bind(this);
        this._success = this._success.bind(this);
        this._error = this._error.bind(this);
        this._progress = this._progress.bind(this);
        this._toggleLoading = this._toggleLoading.bind(this);
        this._resetResult = this._resetResult.bind(this);
        this._resetForm = this._resetForm.bind(this);
        this._getFormSettings = this._getFormSettings.bind(this);

        this.form = document.querySelector('#myForm');
        this.submitBtn = document.querySelector('#submitButton');
        this.resultContainer = document.querySelector('#resultContainer');
        this.rules = {
            fio: {
                fullName: true
            },
            email: {
                email: true
            },
            phone: {
                phone: true
            }
        };
        this.settings = {
            domains: ['ya.ru', 'yandex.ru', 'yandex.ua', 'yandex.by', 'yandex.kz', 'yandex.com'],
            phoneSumLimit: 30
        };
        this.fieldsFilter = ['fio', 'email', 'phone'];

        this._setupListeners();
        this.formValidation = new FormValidation({
            form: this.form,
            rules: this.rules,
            settings: this.settings
        });

        return {
            validate: this._validate,
            getData: this._getData,
            setData: this._setData,
            submit: this._submit
        };
    }

    /**
     * Add events listeners
     */
    _setupListeners() {
        this.submitBtn.addEventListener('click', (event) => {
            event.preventDefault();

            this._submit();
        });
    }

    /**
     * Validate form
     */
    _validate() {
        return this.formValidation.validate();
    }

    /**
     * Retrieve data from inputs
     * @returns {Object} data
     */
    _getData() {
        const inputs = this.form.querySelectorAll('input');
        const data = {};

        inputs.forEach((input, index) => {
            const name = input.name || `input-${index}`;
            const value = input.value || '';

            data[name] = value;
        });

        return data;
    }

    /**
     * Set data for inputs
     * @param {Object} data
     */
    _setData(data) {
        for (let inputName in data) {

            if (this.fieldsFilter.indexOf(inputName) !== -1) {

                const input = this.form.querySelector(`[name=${inputName}]`);

                if (input) {

                    const value = data[inputName];

                    input.value = value;

                }

            }
        }
    }

    /**
     * Submit form
     */
    _submit() {
        const errorInputs = this.form.querySelectorAll('.error');

        if (errorInputs) {

            errorInputs.forEach(input => input.classList.remove('error'));

        }

        const form = this._validate();

        if (form.isValid) {

            const options = this._getFormSettings();

            this._resetResult();

            this._toggleLoading();

            this._request(options);

        } else {

            form.errorFields.forEach(fieldName => {
                const field = this.form.querySelector(`[name=${fieldName}]`);

                if (field) {

                    field.classList.add('error');

                }
            });

        }
    }

    /**
     * Send request to server
     * @param {Object} options
     */
    _request(options) {
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
                const method = data.status ? `_${data.status}` : '';

                if (!method) {

                    /*eslint-disable no-console*/
                    console.log('Can not identify response status!');
                    /*eslint-enable no-console*/

                }

                if (this[method]) {

                    this[method](data);

                } else {

                    /*eslint-disable no-console*/
                    console.log('Can not find response method!');
                    /*eslint-enable no-console*/

                }
            })
            .catch(error => {
                /*eslint-disable no-console*/
                console.log(error);
                /*eslint-enable no-console*/
            });
    }

    /**
     * Handle success response
     * @param data
     */
    _success(data) {
        data.text = 'Success';

        this._resetResult();
        this.resultContainer.classList.add('success');
        this.resultContainer.textContent = data.text;
        this._toggleLoading();
    }

    /**
     * Handle error response
     * @param data
     */
    _error(data) {
        this._resetResult();
        this.resultContainer.classList.add('error');
        this.resultContainer.textContent = data.reason;
        this._toggleLoading();
    }

    /**
     * Handle progress response
     * @param data
     */
    _progress(data) {
        data.timeout = data.timeout ? data.timeout : 3000;

        this.resultContainer.classList.add('progress');

        setTimeout(() => {
            const options = this._getFormSettings();

            this._request(options);
        }, data.timeout);
    }

    /**
     * Toggle loading state for form element
     */
    _toggleLoading() {
        this.form.classList.toggle('loading');
    }

    /**
     * Reset result container state
     */
    _resetResult() {
        this.resultContainer.classList.remove('success', 'error', 'progress');
        this.resultContainer.textContent = '';
    }

    /**
     * Reset form fields
     */
    _resetForm() {
        this.form.reset();
    }

    /**
     * Get form settings
     * @returns {Object}
     */
    _getFormSettings() {
        return {
            url: this.form.action,
            settings: {
                method: this.form.method ? this.form.method : 'get'
            }
        };
    }
}

/**
 * Init Form
 * @returns {Form}
 */
const init = () => {
    return new Form();
};

export default {init};
