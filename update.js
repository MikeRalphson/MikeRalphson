const fs = require('fs');

const ejs = require('ejs');
const frp = require('feed-read-parser');

const feed = process.env["RSS_FEED"];
const limit = process.env["LIMIT"] || 5;

const templ = fs.readFileSync('./README.md.ejs','utf8');

frp(feed, function (err, articles) {
  if (articles && articles.length) {
    if (articles.length > limit) {
      articles = articles.slice(0,limit);
    }
    output = ejs.render(templ, { articles });
    fs.writeFileSync('./README.md',output,'utf8');
  }
  if (err) {
    process.exitCode = 1;
    throw err;
  }
});

