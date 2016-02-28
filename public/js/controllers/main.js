angular.module('todoController', [])
	.controller('mainController', function($scope, $http, Todos) {
	$scope.formData = {};

	//GET when landing on a page, get all todos and show them
	Todos.get().success(function(data){
		$scope.todos = data;
	});

	//CREATE when submitting the add form, send the text to node API
	$scope.createTodo = function() {
		if(!$.isEmptyObject($scope.formData)){
			Todos.create($scope.formData).success(function(data){
				$scope.formData = {};
				$scope.todos = data;
			});
		}
	};

	//DELETE
	$scope.deleteTodo = function(id){
		Todos.delete(id).success(function(data){
			$scope.todos = data;
		});
	};

	//when landing on a page, get all todos and show them
	/*$http.get('api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data);

		})
		.error(function(data){
			console.log("Error: " + data);
		});

	//when submitting the add form, send the text to node API
	$scope.createTodo = function(){
		$http.post('api/todos', $scope.formData)
			.success(function(data){
				$scope.formData = {}; //clear the form so user is ready to enter another
				$scope.todos = data;
				console.log(data);
			}).
			error(function(data){
				console.log("Error: " + data);
			});
	};

	//delete a todo after checking it
	$scope.deleteTodo = function(id){
		$http.delete('api/todos/' + id)
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			error(function(data){
				console.log("Error: " + data);
			});
	};*/
});