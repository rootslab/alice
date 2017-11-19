/*
 * Alice, a simple and performant data structure for
 * bipartite graphs with integer values as vertices.
 *
 * Copyright(c) 2015 Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.Alice = ( function () {
    var Peela  = require( 'peela' )
        , Train  = require( 'train' )
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

    aproto.elist = function () {
        var me = this
            , gv = me.v
            , ge = me.e
            , e = null
            , edge = null
            , edges = []
            ;
        for ( e in ge ) {
            edge = e.split( '-' );
            edge[ 0 ] = + edge[ 0 ]
            edge[ 1 ] = + edge[ 1 ]
            edges.push( edge )
        }
        return edges;
    };

    aproto.add = function ( x, y, strict, label ) {
        var me = this
            , gv = me.v
            , ge = me.e
            , v0 = + x
            , v1 = + y
            , elist0 = null
            , elist1 = null
            ;

        elist0 = gv[ v0 ] || ( gv[ v0 ] = [] );
        elist1 = gv[ v1 ] || ( gv[ v1 ] = [] );
        // strict add, return if the vertex already exists (slow operation)
        if ( strict && ~ elist0.indexOf( v1 ) ) {
            // console.log( ' -> v0 (%d) exists in adj list for %d:', v1, v0, elist0 )
            return 0;
        }
        /*
         * NOTE: when v0 === v1, vertex loop.
         * You can skip adding it twice, but actually, the vertex
         * degree is the sum of incident edges, with loops counted
         * twice.
         */
        elist0.push( v1 );
        elist1.push( v0 );
        // order vertex values
        if ( v0 > v1 ) {
            v0 ^= v1;
            v1 ^= v0;
            v0 ^= v1;
        }
        ge[ v0 + '-' + v1 ] = label;
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
            , x = null
            , y = + null
            , elist0 = null
            , elist1 = null
            , q = []
            , b = -1
            , h = 0
            , e = null
            , stop = null
            , v = null
            , qlen = 0
            ;
        while ( ! stop ) {
            stop = true;
            for ( v in gv ) {
                // cast object to number, for indexOf
                x = + v;
                elist0 = gv[ x ];
                if ( elist0.length !== 1 ) continue;
                y = elist0.pop();
                elist1 = gv[ y ];
                elist1.splice( elist1.indexOf( x ), 1 );
                
                if ( edge_as_array ) qlen = q.push( [ x, y, null ] );
                else qlen = q.push( x, y, null );
                
                // order values before searching edge
                if ( x > y ) {
                    x ^= y;
                    y ^= x;
                    x ^= y;
                }

                e = x + '-' + y;

                if ( edge_as_array ) q[ qlen - 1 ][ 2 ] = ge[ e ];
                else q[ qlen - 1 ] = ge[ e ];
                
                delete ge[ e ];
                --me.edges;
                stop = false;
            }
        }
        return q;
    };

    aproto.depth = function ( v ) {
        var me = this
            , gv = me.v
            , ge = me.e
            , stack = Peela()
            , list = []
            , visited = []
            , vlist = null
            , i = 0
            , und = undefined 
            ;
        if ( v === und ) return null;
        stack.push( v )
        while ( stack.size() ) {
            v = stack.pop();
            if ( visited[ v ] ) continue;
            visited[ v ] = 1;
            list.push( v );
            vlist = gv[ v ];
            // add all vertices adj to v
            stack.concat( vlist );
            // log( '- v: %d (%d, %d)', v, v,  ( ~ lastv ) ? lastv : NaN )
            // do someting
            // ..
        }
        stack = visited = null;
        return list;
    };

    aproto.breadth = function ( v ) {
        var me = this
            , gv = me.v
            , queue = Train()
            , list = []
            , visited = []
            , u = null
            , z = null
            , l = 0
            , alist = []
            ;
        visited[ v ] = 1;
        queue.fpush( v );
        while ( queue.size() ) {
            // dequeue a v
            u = queue.shift()
            list.push( u );
            alist = gv[ u ];
            // do something
            // console.log( 'v: %d', u );
            for ( l = 0; l < alist.length; ++l ) {
                z = alist[ l ];
                if ( visited[ z ] ) continue;
                // enqueue
                queue.fpush( z );
                visited[ z ] = 1;
            }
        }
        queue = visited = null;
        return list;
    };

    return Alice;

} )();

exports.Alice.version = require( '../package' ).version;
