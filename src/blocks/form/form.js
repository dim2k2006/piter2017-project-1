const MyForm = {
    submitBtn: document.querySelector('#submitButton'),
    validationRules: {
        fio: {
            wordsLength: 3
        },
        email: {
            email: true,
            domain: ['ya.ru', 'yandex.ru', 'yandex.ua', 'yandex.by', 'yandex.kz', 'yandex.com']
        },
        phone: {
            startWith: '+7',
            pattern: '+7(999)999-99-99',
            digitSum: 30
        }
    },

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
        //
    },

    /**
     * Retrieve data from inputs
     */
    getData: function() {

    },

    /**
     * Set data for inputs
     * @param {Object} data
     */
    setData: function(data) {

    },

    /**
     * Submit form
     * @param {Object} event
     */
    submit: function(event) {
        event.preventDefault();

        console.log(this);
    },

    /**
     * Init form object
     */
    init: function() {
        this.setupListeners();
    }
};

MyForm.init();
