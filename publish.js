var ghpages = require("gh-pages");

ghpages.publish("build", function (error) {
  console.error(error);
});
