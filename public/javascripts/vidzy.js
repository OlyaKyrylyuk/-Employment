var app = angular.module("Vidzy", ["ngResource", "ngRoute"]);

app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "partials/first.html",
      })
      .when("/home1", {
        templateUrl: "partials/home1.html",
        controller: "Home1Ctrl",
      })
      .when("/home2", {
        templateUrl: "partials/home2.html",
        controller: "Home2Ctrl",
      })
      .when("/home3", {
        templateUrl: "partials/home3.html",
        controller: "Home3Ctrl",
      })
      .when("/employer/:id", {
        templateUrl: "partials/employer-form.html",
        controller: "EditEmployerCtrl",
      })
      .when("/worker/:id", {
        templateUrl: "partials/worker-form.html",
        controller: "EditWorkerCtrl",
      })
      .when("/documentt/:id", {
        templateUrl: "partials/documentt-form.html",
        controller: "EditDocumenttCtrl",
      })
      .when("/add-employer", {
        templateUrl: "partials/employer-form.html",
        controller: "AddEmployerCtrl",
      })
      .when("/add-worker", {
        templateUrl: "partials/worker-form.html",
        controller: "AddWorkerCtrl",
      })
      .when("/add-documentt", {
        templateUrl: "partials/documentt-form.html",
        controller: "AddDocumenttCtrl",
      })
      .when("/worker/delete/:id", {
        templateUrl: "partials/worker-delete.html",
        controller: "DeleteWorkerCtrl",
      })
      .when("/employer/delete/:id", {
        templateUrl: "partials/employer-delete.html",
        controller: "DeleteEmployerCtrl",
      })
      .when("/documentt/delete/:id", {
        templateUrl: "partials/documentt-delete.html",
        controller: "DeleteDocumenttCtrl",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);

app.controller("Home1Ctrl", [
  "$scope",
  "$resource",
  function ($scope, $resource) {
    var Employers = $resource("/api/employers");
    Employers.query(function (employers) {
      $scope.employers = employers;
    });
  },
]);
app.controller("Home2Ctrl", [
  "$scope",
  "$resource",
  function ($scope, $resource) {
    var Workers = $resource("/api/workers");
    Workers.query(function (workers) {
      $scope.workers = workers;
    });
  },
]);
app.controller("Home3Ctrl", [
  "$scope",
  "$resource",
  function ($scope, $resource) {
    var Documents = $resource("/api/documents");
    Documents.query(function (documents) {
      $scope.documents = documents;
    });

    $scope.search = function () {
      var Workers = $resource("/api/workers");
      Workers.query(function (workers, plN) {
        //var plN = document.getElementsByName("playerName").value;
        var plN = $scope.playerName;
        console.log(plN);
        $scope.workers = workers;
        $scope.plN = plN;
        console.log($scope.plN);
      });
    };
  },
]);
app.controller("AddEmployerCtrl", [
  "$scope",
  "$resource",
  "$location",
  function ($scope, $resource, $location) {
    $scope.saveempl = function () {
      var Employers = $resource("/api/employers");
      Employers.save($scope.employer, function () {
        $location.path("/");
      });
    };
  },
]);

app.controller("DeleteEmployerCtrl", [
  "$scope",
  "$resource",
  "$location",
  "$routeParams",
  function ($scope, $resource, $location, $routeParams) {
    var Employers = $resource("/api/employers/:id");
    Employers.get({ id: $routeParams.id }, function (employer) {
      $scope.employer = employer;
    });

    $scope.delete = function () {
      Employers.delete({ id: $routeParams.id }, function (employer) {
        $location.path("/");
      });
    };
  },
]);
app.controller("AddWorkerCtrl", [
  "$scope",
  "$resource",
  "$location",
  function ($scope, $resource, $location) {
    $scope.savework = function () {
      var Workers = $resource("/api/workers");
      Workers.save($scope.worker, function () {
        $location.path("/");
      });
    };
  },
]);
app.controller("AddDocumenttCtrl", [
  "$scope",
  "$resource",
  "$location",
  function ($scope, $resource, $location) {
    var Employers = $resource("/api/employers");
    Employers.query(function (employers) {
      $scope.employers = employers;
    });
    $scope.savedoc = function () {
      var Documents = $resource("/api/documents");
      Documents.save($scope.documentt, function () {
        $location.path("/");
      });
    };
  },
]);
app.controller("EditDocumenttCtrl", [
  "$scope",
  "$resource",
  "$location",
  "$routeParams",
  function ($scope, $resource, $location, $routeParams) {
    var Employers = $resource("/api/employers");
    Employers.query(function (employers) {
      console.log(employers);
      $scope.employers = employers;
    });
    var Workers = $resource("/api/workers");
    Workers.query(function (workers) {
      console.log(workers);

      $scope.workers = workers;
    });

    var Documents = $resource(
      "/api/documents/:id",
      { id: "@_id" },
      { update: { method: "PUT" } }
    );
    Documents.get({ id: $routeParams.id }, function (documentt) {
      $scope.documentt = documentt;
    });

    $scope.savedoc = function () {
      Documents.update($scope.documentt, function () {
        $location.path("/");
      });
    };
  },
]);
app.controller("DeleteWorkerCtrl", [
  "$scope",
  "$resource",
  "$location",
  "$routeParams",
  function ($scope, $resource, $location, $routeParams) {
    var Workers = $resource("/api/workers/:id");
    Workers.get({ id: $routeParams.id }, function (worker) {
      $scope.worker = worker;
    });
    $scope.delete = function () {
      Workers.delete({ id: $routeParams.id }, function (worker) {
        $location.path("/");
      });
    };
  },
]);
app.controller("DeleteDocumenttCtrl", [
  "$scope",
  "$resource",
  "$location",
  "$routeParams",
  function ($scope, $resource, $location, $routeParams) {
    var Documents = $resource("/api/documents/:id");
    Documents.get({ id: $routeParams.id }, function (documentt) {
      $scope.documentt = documentt;
    });
    $scope.delete = function () {
      Documents.delete({ id: $routeParams.id }, function (documentt) {
        $location.path("/");
      });
    };
  },
]);

app.controller("EditEmployerCtrl", [
  "$scope",
  "$resource",
  "$location",
  "$routeParams",
  function ($scope, $resource, $location, $routeParams) {
    var Employers = $resource(
      "/api/employers/:id",
      { id: "@_id" },
      { update: { method: "PUT" } }
    );
    Employers.get({ id: $routeParams.id }, function (employer) {
      $scope.employer = employer;
    });

    $scope.saveempl = function () {
      Employers.update($scope.employer, function () {
        $location.path("/");
      });
    };
  },
]);

app.controller("EditWorkerCtrl", [
  "$scope",
  "$resource",
  "$location",
  "$routeParams",
  function ($scope, $resource, $location, $routeParams) {
    var Workers = $resource(
      "/api/workers/:id",
      { id: "@_id" },
      { update: { method: "PUT" } }
    );
    Workers.get({ id: $routeParams.id }, function (worker) {
      $scope.worker = worker;
    });

    $scope.savework = function () {
      Employers.update($scope.employer, function () {
        $location.path("/");
      });
    };
  },
]);
