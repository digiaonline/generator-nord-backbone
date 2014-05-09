define([
    'module',
    'jquery',
    'underscore',
    'backbone',
    '<%= appName %>/core/Entity',
    '<%= appName %>/utils/dependencyLoader',
    '<%= appName %>/components/viewManager'
], function (module, $, _, Backbone, Entity, DependencyLoader, ViewManager) {
    'use strict';
    
    /**
     * @class <%= appName %>.core.App
     * @extends <%= appName %>.core.Entity
     */
    var App = Entity.extend({
        /**
         * @type {Object<string, *>}
         */
        config: null,
        
        /**
         * @type {Object<string, <%= appName %>.core.Component>}
         */
        components: null,
        
        /**
         * Constructor.
         */
        constructor: function () {
            this.config = module.config() || {};
            this.components = {
                viewManager: new ViewManager({
                    app: this, 
                    loader: new DependencyLoader({basePath: '<%= appName %>/views'})
                })
            };
        },
        
        /**
         * Initializes the application.
         */
        initialize: function () {
            this.initializeViews();
        },
        
        /**
         * Initializes views within a specific DOM element.
         * @param {string} selector element CSS selector
         * @param {Object<string, *>} args view options
         * @param {Function} cb optional callback function to call when the view is loaded.
         */
        initializeViews: function (selector, args, cb) {
            selector = selector || document;
            args = args || {};
            
            var self = this;
            
            $(selector).find('*[data-view]').each(function () {
                var viewArgs = _.extend({}, args);
                viewArgs.el = this;
                self.getComponent('viewManager').createView($(this).data('view'), viewArgs)
                    .then(cb);
            });
        },
        
        /**
         * Returns a specific application component based on the given identifier.
         * @param {string} id component identifier
         * @returns {<%= appName %>.core.Component}
         */
        getComponent: function (id) {
            return this.components[id];
        }
    });
    
    return App;
});