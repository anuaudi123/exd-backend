var glob = require('glob');
var path = require('path');

const basePath = path.join(process.cwd(), './tests/resolvers/projects');

describe('Resolvers', () => {
  // Find all our resolver files
  const files = glob.sync(`${basePath}/*.js`);
  files.forEach(file => {
    file_name = file.split("/")
    describe(file_name[file_name.length -1], () => {
      const resolvers = require(file);
        Object.entries(resolvers).forEach(([name, fn]) => {
        test(name, async () => Promise.resolve(fn()));
      });
    });
  });
});
