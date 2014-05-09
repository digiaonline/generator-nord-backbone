define([
    'jquery',
    'underscore',
    '<%= appName %>/core/Component'
], function($, _, Component) {
    'use strict';

    /**
     * @class <%= appName %>.components.<%= className %>
     * @extends <%= appName %>.core.Component
     */
    var <%= className %> = Component.extend({
        
    });

    return <%= className %>;
});