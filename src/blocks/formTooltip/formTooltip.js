import tippy from 'tippy.js';

/**
 * Creates a new FormTooltip class
 */
class FormTooltip {
    /**
     * Constructor
     */
    constructor() {
        this.init = this.init.bind(this);

        this.init();
    }

    /**
     * Init tooltips
     */
    init() {
        const tooltips = document.querySelectorAll('.formTooltip__content');

        tooltips.forEach(tooltip => {
            tippy(tooltip, {
                arrow: true,
                trigger: 'click',
                size: 'small'
            });
        });
    }
}

export default FormTooltip;
