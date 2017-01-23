Redux pattern implemented in RxJS
=====

This is a sample project / tutorial that demonstrates how to implement the Redux pattern (i.e. for usage with React) in TypeScript using only [RxJS v5](https://github.com/ReactiveX/rxjs) inspired by the blog post by [Michael Zalecki](http://michalzalecki.com/use-rxjs-with-react/).

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
1. Run a webserver from the `dist` folder for testing

Notes
----

* Webpack is used as a module bundler, but the pattern will also work using other module bundlers or typescript module outputs.
