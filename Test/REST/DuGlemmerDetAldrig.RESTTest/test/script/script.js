var DuGlemmerDetAldrig = angular.module('DuGlemmerDetAldrig', ['ngRoute', 'ngResource']);



/*DuGlemmerDetAldrig.controller("GetAllProductsController", function ($scope) {
    $scope.Products = [{id:2,name:"Melody Junsay",description:"Matina",price:6.4,instock:false},{id:3,name:"Jed",description:"Bunso",price:300,instock:true},{id:4,name:"Iron Man",description:"Ikaw na",price:432.2,instock:true}];
});*/

// Setup Route
DuGlemmerDetAldrig.config(function ($routeProvider) {
    $routeProvider
        .when('/',
        {
            controller: 'productsController',
            templateUrl: 'views/product/list.html'
        })
        .otherwise({ redirectTo: '/' });
});

// REST client factory
angular.module('DuGlemmerDetAldrig')
    .factory('RESTFactory', ['$http', function ($http) {

        var urlBase = 'http://localhost:54496/api/Values';
        var RESTFactory = {};

        RESTFactory.getAll = function () {
            return $http.get(urlBase);
        };

        RESTFactory.get = function (id) {
            return $http.get(urlBase + '/' + id);
        };

        RESTFactory.create = function (product) {
            return $http.post(urlBase, product);
        };

        RESTFactory.update = function (product) {
            return $http.put(urlBase + '/' + product.id, product)
        };

        RESTFactory.delete = function (id) {
            return $http.delete(urlBase + '/' + id);
        };
        return RESTFactory;
    }]);

angular.module('DuGlemmerDetAldrig')
    .controller('productsController', ['$scope', 'RESTFactory',
        function ($scope, RESTFactory) {

            $scope.status;
            $scope.products;

            getProducts();

            function getProducts() {
                RESTFactory.getAll()
                    .success(function (products) {
                        $scope.products = products;
                    })
                    .error(function (error) {
                        $scope.status = 'Unable to load products: ' + error.message;
                    });
            }

            $scope.updateProduct = function () {
                var product;
				
				var id = $("#prid").html() * 1;
				
				for (var i = 0; i < $scope.products.length; i++) {
					var thisProd = $scope.products[i];
					if (thisProd.id === id) {
						product = thisProd;
						break;
					}
				}
				
				product.id = $("#prid").html();
                product.name = $("#name").val();
				product.description = $("#description").val();
				product.price = $("#price").val() * 1;
				product.instock = $("#instock").val();
				
                RESTFactory.update(product)
                  .success(function () {
                      $scope.status = 'Products updated.';
					  $scope.cancelUpdate();
                  })
                  .error(function (error) {
                      $scope.status = 'Unable to update product: ' + error.message;
                  });
            };
			
			$scope.selectProductToUpdate = function (id) {
                var product;
                for (var i = 0; i < $scope.products.length; i++) {
                    var currProduct = $scope.products[i];
                    if (currProduct.id === id) {
                        product = currProduct;
                        break;
                    }
                }
				
				$("#prid").html(product.id);
                $("#name").val(product.name);
				$("#description").val(product.description);
				$("#price").val(product.price);
				$("#instock").val(product.instock);
				
				$("#addrec").hide();
				$("#updaterec").show();
				$("#cancelrec").show();
            };
			
			$scope.cancelUpdate = function (id) {
				
				$("#prid").html("");
                $("#name").val("");
				$("#description").val("");
				$("#price").val("");
				$("#instock").val("");
				
				$("#addrec").show();
				$("#updaterec").hide();
				$("#cancelrec").hide();
            };

            $scope.insertProduct = function () {
                var product = {
                    name: $('#newname').val(),
                    description: $('#newdescription').val(),
                    price: $('#newprice').val(),
                    instock: $('#newinstock').val()
                };
                RESTFactory.create(product)
                    .success(function () {
                        $scope.status = 'Added product.';
                        //$scope.customers.push(product);
						getProducts();
                    }).
                    error(function (error) {
                        $scope.status = 'Unable to add product: ' + error.message;
                    });
            };

            $scope.deleteProduct = function (id) {
                RESTFactory.delete(id)
                .success(function () {
                    $scope.status = 'Product successfully removed.';
                    for (var i = 0; i < $scope.products.length; i++) {
                        var product = $scope.products[i];
                        if (product.id === id) {
                            $scope.products.splice(i, 1);
                            break;
                        }
                    }
					alert($scope.status);
                })
                .error(function (error) {
                    $scope.status = 'Unable to delete customer: ' + error.message;
                });
            };
        }]);
