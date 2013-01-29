/*globals OpenSeadragon */

(function($){

/**
 * For use by classes which want to support custom, non-browser events.
 * TODO: This is an aweful name!  This thing represents an "event source",
 *       not an "event handler".  PLEASE change the to EventSource. Also please 
 *       change 'addHandler', 'removeHandler' and 'raiseEvent' to 'bind', 
 *       'unbind', and 'trigger' respectively.  Finally add a method 'one' which
 *       automatically unbinds a listener after the first triggered event that 
 *       matches.
 * @class
 */
$.EventHandler = function() {
    this.events = {};
};

$.EventHandler.prototype = {

    /**
     * Add an event handler for a given event.
     * @function
     * @param {String} eventName - Name of event to register.
     * @param {Function} handler - Function to call when event is triggered.
     */
    addHandler: function( eventName, handler ) {
        var events = this.events[ eventName ];
        if( !events ){
            this.events[ eventName ] = events = [];
        }
        if( handler && $.isFunction( handler ) ){
            events[ events.length ] = handler;
        }
    },

    /**
     * Remove a specific event handler for a given event.
     * @function
     * @param {String} eventName - Name of event for which the handler is to be removed.
     * @param {Function} handler - Function to be removed.
     */
    removeHandler: function( eventName, handler ) {
        //Start Thatcher - unneccessary indirection.  Also, because events were
        //               - not actually being removed, we need to add the code
        //               - to do the removal ourselves. TODO
        var events = this.events[ eventName ];
        if ( !events ){ 
            return; 
        }
        //End Thatcher
    },

    /**
     * Retrive the list of all handlers registered for a given event.
     * @function
     * @param {String} eventName - Name of event to get handlers for.
     */
    getHandler: function( eventName ) {
        var events = this.events[ eventName ]; 
        if ( !events || !events.length ){ 
            return null; 
        }
        events = events.length === 1 ? 
            [ events[ 0 ] ] : 
            Array.apply( null, events );
        return function( source, args ) {
            var i, 
                length = events.length;
            for ( i = 0; i < length; i++ ) {
                if( events[ i ] ){
                    events[ i ]( source, args );
                }
            }
        };
    },

    /**
     * Trigger an event, optionally passing additional information.
     * @function
     * @param {String} eventName - Name of event to register.
     * @param {Function} handler - Function to call when event is triggered.
     */
    raiseEvent: function( eventName, eventArgs ) {
        var handler = this.getHandler( eventName );

        if ( handler ) {
            if ( !eventArgs ) {
                eventArgs = {};
            }

            handler( this, eventArgs );
        }
    }
};

}( OpenSeadragon ));
