const MyForm = {
    submitBtn: document.querySelector('#submitButton'),

    setupListeners: function() {
        this.submitBtn.addEventListener('click', this.submit);
    },

    validate: function() {
        //
    },

    submit: function(event) {
        event.preventDefault();

        // console.log('submit');
    },

    init: function() {
        this.setupListeners();
    }
};

MyForm.init();
