const { resolve } = require('path')
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const cp = require('child_process');
const webpackConfig = require('../webpack/webpack.dev.config.js');

const cmds = {
  'wind32': 'start',
  'linux': 'xdg-open',
  'darwin': 'open'
};

let onceMark = true;

const compiler = webpack(webpackConfig);

compiler.apply(new ProgressPlugin({
  format: '  build [:bar] :percent (:elapsed seconds)',
  clear: false,
  width: 60
}));

compiler.plugin('done', () => {
  if (onceMark) {
    cp.exec(`${cmds[process.platform]} http://localhost:4396`)
  }
  onceMark = false;
});

const server = new WebpackDevServer(compiler, {
  stats: {
    colors: true
  },
  hot: true,
  contentBase: resolve(__dirname, 'dist'),
  publicPath: '/',
  inline: true,
  historyApiFallback: true
});

server.listen(4396, "127.0.0.1", function() {
  console.log("\n Starting server on http://localhost:4396 \n");
});
