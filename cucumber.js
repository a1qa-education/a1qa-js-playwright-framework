export default {
  paths: ['tests/features/**/*.feature'],
  import: [
    'tests/support/**/*.js',
    'tests/steps/**/*.js'
  ], tags: "not @skip", 

  formatOptions: {
    resultsDir: "allure-results"
  },
  format: [
    'progress', 
    ['html', 'reports/cucumber-report.html'],
    'allure-cucumberjs/reporter:./allure-results/dummy.txt'
  ],
  parallel: 1
}