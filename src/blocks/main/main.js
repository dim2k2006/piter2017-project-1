(() => {
    if (!window.app) {
        window.app = {};
    }

    if (!('modules' in window.app)) {
        window.app.modules = {};
    }

    if ('main' in app.modules) {
        return;
    }

    /**
     * Creates a new Main class.
     * @class
     */
    const Main = function() {
        const self = this;

        /**
         * Get options for module
         */
        self.getOptions = () => {
            self.html = document.querySelector('html');
            self.body = document.querySelector('body');
            self.modules = app.modules;
        };

        /**
         * Init all modules in app.modules
         */
        self.initModules = () => {
            for (let module in self.modules) {

                if (self.modules.hasOwnProperty(module)) {

                    if (typeof self.modules[module].init !== 'undefined' && module !== 'main') {

                        self.modules[module].init();

                    }

                }

            }
        };

        /**
         * Init module
         */
        self.init = () => {
            self.getOptions();
            self.initModules();
        };
    };

    window.app.modules.main = new Main();
})();
