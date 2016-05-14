describe('NavBarCtrl', function() {
    beforeEach(module("reimsApp.NavBar"));

    var $controller;

    beforeEach(inject(function(_$controller_){
	// The injector unwraps the underscores (_) from around the parameter names when matching
	$controller = _$controller_;
    }));

    describe("collapse", function() {
	var $scope, controller;

	beforeEach(function() {
	    $scope = {};
	    controller = $controller("NavBarCtrl", { $scope: $scope });
	});
	
	it("defaults to collapsed", function() {
	    expect(controller.isCollapsed).toBe(true);
	});

	it("toggles properly", function() {
	    expect(controller.isCollapsed).toBe(true);	    
	    controller.toggleCollapse();
	    expect(controller.isCollapsed).toBe(false);
	    controller.toggleCollapse();	
	    expect(controller.isCollapsed).toBe(true);    
	});

	it("collapses when forced", function() {
	    expect(controller.isCollapsed).toBe(true);
	    controller.collapse();
	    expect(controller.isCollapsed).toBe(true);
	    controller.toggleCollapse();
	    expect(controller.isCollapsed).toBe(false);
	    controller.collapse();
	    expect(controller.isCollapsed).toBe(true);
	});
    });
});
