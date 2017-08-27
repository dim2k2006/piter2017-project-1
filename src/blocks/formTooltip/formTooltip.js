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
        const tooltips = Array.from(document.querySelectorAll('.formTooltip__content'));

        tippy(tooltips, {
            arrow: true,
            trigger: 'click',
            size: 'small'
        });
    }
}

export default FormTooltip;
