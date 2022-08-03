const test = (plop) => {
  console.log('hey')
  plop.setDefaultInclude({ generators: true });

  plop.setGenerator('basics', {
    description: 'this is a skeleton plopfile',
    prompts: [],
    actions: [
      {
        type: 'add',
        path: `SUCCESS.md`,
        templateFile: `README.md`,
      }
    ]
  });

  plop.setGenerator('basics2', {
    description: 'this is a skeleton plopfile',
    prompts: [],
    actions: [
      {
        type: 'add',
        path: `SUCCESS.md`,
        templateFile: `README.md`,
      }
    ]
  });
}

export default test;
// module.exports = test;
