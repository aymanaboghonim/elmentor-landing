module.exports = {
  ci: {
    collect: {
      url: ["http://127.0.0.1:8080"],
      numberOfRuns: 1
    },
    assert: {
      assertions: {
        // Keep accessibility as an error, but lower performance to a warning
        // for the demo site to avoid blocking deploys. Adjust as needed.
        'categories:performance': ['warn', {minScore: 0.8}],
        'categories:accessibility': ['error', {minScore: 0.9}]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
