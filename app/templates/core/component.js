define([
    'underscore',
    'backbone',
    '<%= appName %>/core/entity'
], function (_, Backbone, Entity) {
    'use strict';

    /**
     * @class <%= appName %>.core.Component
     * @extend <%= appName %>.core.Entity
     */
    var Component = Entity.extend({
        /**
         * @type {<%= appName %>.core.App}
         */
        app: null,
        
        /**
         * @inheritDoc
         */
        initialize: function () {
            if (!this.app) {
                throw new Error('Component.app must be set.');    
            }
        },
        
        /**
         * Returns a specific application component based on the given identifier.
         * @param {string} id component identifier
         * @returns {<%= appName %>.core.Component}
         */
        getComponent: function (id) {
            return this.app.getComponent(id);
        }
    });

    return Component;
});