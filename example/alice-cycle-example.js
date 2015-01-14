var log = console.log
    , Alice = require( '../' )
    , ed = Alice()
    , path = null
    ;

// same edge
ed.add( 1, 2 );
ed.add( 2, 1 );

// vertex loop
ed.add( 2, 2 );
ed.cut( 2, 2 );

// same edge
ed.cut( 2, 1 );
ed.add( 2, 1 );
ed.cut( 1, 2 );

// add some edges
ed.add( 5, 4 );
ed.add( 4, 3 );
ed.add( 4, 1 );
ed.add( 1, 2 );
// add a cycle
ed.add( 2, 5 );

log();
log( '- 2-partite graph edges:', ed.e );
log();
log( '- 2-partite graph vertices:', ed.v );
log();
log( '- pruning edges to find cycles..' );
path = ed.prune();
log();
log( '- pruning results:', path );
log();
log( '- edge set is %sempty! (%d edges found)', ed.edges ? 'not ' : '', ed.edges );
log();
if ( ed.edges ) log( '- cycle found:', ed.e );
log();