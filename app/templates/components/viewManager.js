define([
    'jquery',
    'underscore',
    'backbone',
    '<%= appName %>/core/component'
], function($, _, Backbone, Component) {
    'use strict';

    /**
     * @class <%= appName %>.components.ViewManager
     * @extends <%= appName %>.core.Component
     */
    var ViewManager = Component.extend({
        /**
         * @type {<%= appName %>.components.DependencyLoader}
         */
        loader: null,

        /**
         * @type {Object<string, <%= appName %>.core.View>}
         */
        views: {},

        /**
         * Creates a new view.
         * @param {string} className the view to create
         * @param {Object} args view options
         */
        createView: function(className, viewArgs) {
            var self = this,
                view = this.views[className],
                dfd = $.Deferred();

            if (view) {
                view.undelegateEvents();
            }

            this.loader
                .load(className)
                .then(function(Constructor) {
                    viewArgs.manager = self;
                    view = new Constructor(viewArgs);
                    self.views[className] = view;
                    dfd.resolve(view);
                });

            return dfd.promise();
        }
    });

    return ViewManager;
});