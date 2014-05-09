define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    /**
     * @constructor
     * @class <%= appName %>.core.Entity
     * @param {Object} options arguments
     */
    var Entity = function (options) {
        this.cid = _.uniqueId('component');
        options = options || {};
        _.extend(this, options);
        this.initialize.apply(this, arguments);
    };

    // Extend the component prototype with an empty initialize method.
    _.extend(Entity.prototype, {
        initialize: function () {}
    });

    // Copy the Backbone extend method (same for all sub-classes).
    Entity.extend = Backbone.Model.extend;

    return Entity;
});