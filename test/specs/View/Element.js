define(['real/View/Element', 'jquery', 'nbd/View'], function(Element, $, View) {
  'use strict';

  describe('View/Element', function() {
    var $parent, instance;

    beforeEach(function() {
      $parent = $('<div id="element-test"/>');
      instance = new Element($parent);
      instance.template = function(data) {
        return $("<span>Hello " + data.item + "</span>");
      };
    });

    it('is a View constructor', function() {
      expect(Element).toEqual(jasmine.any(Function));
      expect(Element.inherits(View)).toBe(true);
    });

    describe('.init()', function() {
      it('sets its parent element', function() {
        expect(instance.$parent[0]).toBe($parent[0]);
      });
    });

    describe('.render()', function() {
      it('renders a template into the parent element', function() {
        instance.render({ item: "world"});
        expect($parent.text()).toEqual('Hello world');
      });

      it('renders using templateData() by default', function() {
        spyOn(instance, 'templateData').and.returnValue({ item: 'foo' });
        instance.render();
        expect(instance.templateData).toHaveBeenCalled();
        expect($parent.text()).toEqual('Hello foo');
      });

      it('re-renders even without a parent element', function() {
        instance.render({ item: "world"});
        instance.$parent = null;
        instance.render({ item: "dolly"});

        expect(instance.$parent).toBeNull();
        expect($parent.text()).toEqual('Hello dolly');
      });
    });

    describe('.rendered()', function() {
      it('is called when render() completes', function() {
        instance.rendered = jasmine.createSpy('rendered');
        instance.render({ item: "world" });

        expect(instance.rendered).toHaveBeenCalledWith(instance.$view);
      });
    });
  });

  return Element;
});
