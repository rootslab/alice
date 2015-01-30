/*
 * Alice, a simple and performant data structure for
 * bipartite graphs with integer values as vertices.
 *
 * Copyright(c) 2015 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.version = require( '../package' ).version;
exports.Alice = ( function () {
    var abs = Math.abs
        , Alice = function () {
            var me = this
                , is = me instanceof Alice
                ;
            if ( ! is ) return new Alice();
            me.e = {};
            me.v = {};
            me.edges = 0;
        }
        , aproto = Alice.prototype
        ;

    aproto.fire = function () {
        var me = this
            ;
        me.e = {};
        me.v = {};
        me.edges = 0;
        return me;
    };

    aproto.add = function ( x, y, strict, weight ) {
        var me = this
            , gv = me.v
            , ge = me.e
            , v0 = + x
            , v1 = + y
            , elist0 = null
            , elist1 = null
            , w = weight >>> 0 ? abs( + weight ) : -1
            ;
        // order vertex values
        if ( v0 > v1 ) {
            v0 ^= v1;
            v1 ^= v0;
            v0 ^= v1;
        }
        elist0 = gv[ v0 ] || ( gv[ v0 ] = [] );
        // strict add, return if the vertex already exists (slow operation)
        if ( strict && ~ elist0.indexOf( v1 ) ) return 0;
        elist1 = gv[ v1 ] || ( gv[ v1 ] = [] );
        /*
         * NOTE: when v0 === v1, vertex loop.
         * You can skip adding it twice, but actually, the vertex
         * degree is the sum of incident edges, with loops counted
         * twice.
         */
        ge[ v0 + '-' + v1 ] = w;
        elist0.push( v1 );
        elist1.push( v0 );
        return ++me.edges;
    };

    aproto.cut = function ( x, y ) {
        var me = this
            , gv = me.v
            , ge = me.e
            , v0 = + x
            , v1 = + y
            , edge = null
            , elist0 = null
            , elist1 = null
            ;
        // order values before search for edge
        if ( v0 > v1 ) {
            v0 ^= v1;
            v1 ^= v0;
            v0 ^= v1;
        }
        edge = v0 + '-' + v1;
        // return if edge doesn't exist
        if ( ! ge[ edge ] ) return 0;
        delete ge[ edge ];
        elist0 = gv[ v0 ];
        elist1 = gv[ v1 ];
        elist0.splice( elist0.indexOf( v1 ), 1 );
        elist1.splice( elist1.indexOf( v0 ), 1 );
        return --me.edges;
    };

    aproto.prune = function ( edge_as_array ) {
        var me = this
            , gv = me.v
            , ge = me.e
            , v0 = null
            , v1 = + null
            , elist0 = null
            , elist1 = null
            , q = []
            , e = null
            , stop = null
            , v = null
            ;

        while ( ! stop ) {
            stop = true;
            for ( v in gv ) {
                // cast object to number, for indexOf
                v0 = + v;
                elist0 = gv[ v0 ];
                if ( elist0.length !== 1 ) continue;
                v1 = elist0.pop();
                elist1 = gv[ v1 ];
                elist1.splice( elist1.indexOf( v0 ), 1 );
                if ( edge_as_array ) q.push( [ v0, v1 ] );
                else q.push( v0, v1 );
                // order values to find edge
                if ( v0 > v1 ) {
                    v0 ^= v1;
                    v1 ^= v0;
                    v0 ^= v1;
                }
                e = v0 + '-' + v1;
                delete ge[ e ];
                --me.edges;
                stop = false;
            }
        }
        return q;
    };

    return Alice;

} )();