describe('template', function() {

  var ModalService = null;
  var rootScope = null;
  var $httpBackend = null;

  angular.module('tests', ['angularModalService'])
    .controller('SomeController', function ($scope) {
    });

  beforeEach(function() {
    module('tests');
    inject(function(_ModalService_, $rootScope, $injector) {
      ModalService = _ModalService_;
      rootScope = $rootScope;
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', 'some/template.html').respond("<div>template</div>");
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
 
  it('should http get the specified template', function() {

    $httpBackend.expectGET('some/template.html');

    ModalService.showModal({
      controller: "SomeController",
      templateUrl: "some/template.html"
    }).then(function(modal) {
      expect(modal).not.toBe(null);
    });

    $httpBackend.flush();
  
  });

});