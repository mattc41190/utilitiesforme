import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
    // The root of my library or application
    input: 'utilities_for_me/web_app/client/react/index.js',
    // The output of my library or application
    output: {
        // Relative location
        file: 'utilities_for_me/web_app/static/index-bundle.js',
        // IIFE: (function(){console.log("will run right away")})()
        format: 'iife',
        // Create source maps
        sourcemap: false,
    },
    // The plugins to run your code through
    plugins: [
        // Allows us to import from node modules
        nodeResolve({
            extendsions: ['.js']
        }),
        // Make JSX syntax compilable
        babel({
            presets: ['@babel/preset-react']
        }),
        // Convert ES6 modules to CommonJS format
        commonjs(),
        // Replace strings in bundle 
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ]
}

// UNUSED PLUGINS

// LIVE RELOAD
// Add to plugins for livereload in future:
// import livereload from 'rollup-plugin-livereload'
// livereload({
//     watch: "utilities_for_me/web_app/client/react"
// })

// POSTCSS INTEGRATION
// Failed attempt at using: rollup-plugin-postcss
// import postcss from "rollup-plugin-postcss";
// postcss({
//     config: {
//         path: "./postcss.config.js",
//     },
//     extensions: [".css"],
//     modules: true,
//     extract: true,
// }),

// REPLACE FUNCTIONALITY 
// Used to replace strings as you bundle.
// Currently excluded for: Not needed
