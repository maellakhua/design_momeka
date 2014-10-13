
angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Url', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var serviceUrl = 'http://83.212.109.180/omeka';

  return {
    all: function() {
      return serviceUrl;
    },
    setUrl: function(url) {
      // Simple index lookup
      serviceUrl=url;
    }
  };
});
