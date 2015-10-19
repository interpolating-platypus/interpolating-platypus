angular.module('Locket.authFactory', [])

.factory('authFactory', function($http, $state){
  var auth = {};

  auth.login = function(username, password){
    return $http({
      method: 'POST',
      url: '/api/users/login',
      data: {username: username, password:password }
    }).then(function(resp){
      if (resp.status === 200) {
        auth.currentUser = resp.data;
        $state.go('chat');
      }
      return resp;
    });

  };

  auth.logout = function(){
    $state.go('login');

    //do we need to issue get request to API for logout? 
    return $http({
      method: 'GET',
      url: '/api/users/logout'
    }).then(function(resp){
      return resp;
    });
  };

  auth.signup = function(username, password){
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: {username: username, password:password }
    }).then(function(resp){
      if (resp.status === 200) {
        $state.go('chat');
      }
      return resp;
    });
  };

  return auth;


});
