import Form from '../blocks/form/form';

/**
 * Init form
 */
const form = Form.init();

/**
 * Export form methods to the global scope
 */
if (window) {

    window.MyForm = {
        validate: form.validate,
        getData: form.getData,
        setData: form.setData,
        submit: form.submit
    };

}
