const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const APP_DIR = path.resolve(__dirname, './client');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');

module.exports = {
  plugins :
          [
            new MonacoWebpackPlugin({
              // available options are documented at
              // https://github.com/microsoft/monaco-editor/blob/main/webpack-plugin/README.md#options
              languages : [],
            }),
          ],
  module : {
    // Added the missing module object
    rules :
          [
            // ...your other rules

            // Rule for CSS in your app (with CSS Modules)
            {
              test : /\.css$/,
              include : APP_DIR,
              use :
                  [
                    {loader : 'style-loader'},
                    {
                      loader : 'css-loader',
                      options : {
                        modules : true,
                        namedExport : true,
                      },
                    },
                  ],
            },

            // Rule for CSS in Monaco Editor
            {
              test : /\.css$/,
              include : MONACO_DIR,
              use : [ 'style-loader', 'css-loader' ],
            },
          ],
  },
};
