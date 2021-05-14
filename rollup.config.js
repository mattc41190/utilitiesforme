import livereload from "rollup-plugin-livereload"
import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import replace from "@rollup/plugin-replace"

import { nodeResolve } from "@rollup/plugin-node-resolve"

export default {
    input: "utilities_for_me/web_app/client/react/index.js",
    output: {
        file: "utilities_for_me/web_app/static/index-bundle.js",
        format: "iife",
        sourcemap: true, 
    },
    plugins: [
        nodeResolve({
            extendsions: [".js"]
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'development' )
        }),
        babel({
            presets: ["@babel/preset-react"], 
        }),
        commonjs(),
    ]
}

// Add to plugins for livereload in future:
// livereload({
//     watch: "utilities_for_me/web_app/client/react"
// })