Redux pattern implemented in RxJS
=====

This is a sample project / tutorial that demonstrates how to implement the Redux pattern (i.e. for usage with React) in TypeScript using only [RxJS v5](https://github.com/ReactiveX/rxjs) inspired by the blog post by [Michael Zalecki](http://michalzalecki.com/use-rxjs-with-react/). The code is very simple and can be used in production (you only need to include the `rxjs-redux.ts` file which has less than 20 lines of code).

Advantages
-----

* __Typed actions by default__: No need for [FSA](https://github.com/acdlite/flux-standard-action) or magic string constants; all actions are implemented using the `.next()` and `.error()` methods on typed `Rx.Subject`s.
* No need for endless `switch` statements
* Almost __[no boilerplate code](https://github.com/Dynalon/redux-pattern-with-rx/blob/master/src/rxjs-redux.ts)__, no dependencies other than RxJS using only the `map`, `merge`, `scan` and `publishReplay` operators.

How to build
----

1. Clone this repo
1. `npm install`
1. `npm run build`
1. `npm run serve` to start a http-server in `dist/` for testing

Production use
----

You can use this code in production, all you need is to copy the file [rxjs-redux.ts](https://github.com/Dynalon/redux-pattern-with-rx/blob/master/src/rxjs-redux.ts) into your project (or use the compiled .js alternative if you use plain JavaScript).

Notes
----

* Webpack is used as a module bundler, but the pattern will also work using other module bundlers or typescript module outputs.
