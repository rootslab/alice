### Alice

[![NPM VERSION](http://img.shields.io/npm/v/alice.svg?style=flat)](https://www.npmjs.org/package/alice)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/alice)
[![CODECLIMATE](http://img.shields.io/codeclimate/github/rootslab/alice.svg?style=flat)](https://codeclimate.com/github/rootslab/alice)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/alice.svg?style=flat)](https://codeclimate.com/github/rootslab/alice)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/alice#mit-license)

![NODE VERSION](https://img.shields.io/node/v/alice.svg)
[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/alice.svg?style=flat)](http://travis-ci.org/rootslab/alice)
[![BUILD STATUS](http://img.shields.io/david/rootslab/alice.svg?style=flat)](https://david-dm.org/rootslab/alice)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/alice.svg?style=flat)](https://david-dm.org/rootslab/alice#info=devDependencies)

[![NPM MONTHLY](http://img.shields.io/npm/dm/alice.svg?style=flat)](http://npm-stat.com/charts.html?package=alice)
![NPM YEARLY](https://img.shields.io/npm/dy/alice.svg)

[![NPM GRAPH](https://nodei.co/npm/alice.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/alice/)


> __Alice__, a simple and performant data structure for bipartite graphs with integer values as vertices.


### Install

```bash
$ npm install alice [-g]
```

> __require__:

```javascript
var Alice  = require( 'alice' );
```
### Run Tests

> __to run all test files, install devDependecies:__

```bash
 $ cd alice/
 # install or update devDependecies
 $ npm install 
 # run tests
 $ npm test
```


### Constructor

```javascript
Alice()
// or
new Alice()
```

###  Properties


```javascript
/*
 * total edges
 */
Alice.edges : Number

/*
 * graph edges
 */
Alice.e : Number

/*
 * graph vertices
 */
Alice.v : Number

```

### Methods

> Arguments between [] are optional.

```javascript
/*
 * Add an edge to the graph. 
 */
Alice#add : function ( Number x, Number y [, Boolean strict [, Object label ] ] ) : Number

/*
 * Cut an edge from the graph.
 */
Alice#cut : function ( Number x, Number y ) : Number

/*
 * Clear edges and vertices.
 */
Alice#fire : function () : Alice

/*
 * Prune edges to test graph acyclicity.
 * It optionally returns every edge as a single array [ x, y ]
 */
Alice#prune : function ( [ Boolean edge_as_array ] ) : Array

/*
 * Perform A Depth-First Search starting from the input vertex.
 * It returns a list of vertices
 */
Alice#depth : function ( Number x ) : Array

/*
 * Perform A Breadth-First Search starting from the input vertex.
 * It returns a list of vertices
 */
Alice#breadth : function ( Number x ) : Array

/*
 * It returns the list of edges
 */
Alice#elist() : function () : Array


```

### MIT License

> Copyright (c) 2015-present &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[![GA](https://ga-beacon.appspot.com/UA-53998692-1/alice/Readme?pixel)](https://github.com/igrigorik/ga-beacon)