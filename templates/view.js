define([
    'jquery',
    '<%= appName %>/core/View'
], function($, View) {
    'use strict';

    /**
     * @class <%= appName %>.views.<%= className %>
     * @extends <%= appName %>.core.View
     */
    var <%= className %> = View.extend({
        /**
         * @inheritDoc
         */
        events: {
        }
    });

    return <%= className %>;
});