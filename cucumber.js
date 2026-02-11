export default {
  paths: ['tests/features/**/*.feature'],
  import: [
    'tests/support/**/*.js',
    'tests/steps/**/*.js'
  ],
  format: [
    'summary', 
    'progress-bar', 
    ['html', 'reports/cucumber-report.html']
  ],
  parallel: 1
}