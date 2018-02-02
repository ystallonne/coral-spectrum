var helpers = helpers || {};

/**
  Helpers used to test a cloned component.

  @param {Element|String} element - The HTMLElement or markup used to initialize the component.
  @param {Object} [options] - Object that contains configuration values to test.
  @param {Boolean} [options.deepClone=true] - deepClone the component. True, if not provided.
*/
helpers.cloneComponent = function(element, options) {
  // sets the default if component should be deep cloned
  options = options || {};
  options.deepClone = options.deepClone || true;

  describe('testComponentClone', function() {

    var el;
    var elClone;

    beforeEach(function() {
      
      if (typeof element === 'string') {
        el = helpers.build(element);
      }
      else if (element instanceof HTMLElement) {
        el = helpers.target.appendChild(element);
      }
      
      // Do the clone
      elClone = helpers.target.appendChild(el.cloneNode(options.deepClone));
    });

    afterEach(function() {
      el = elClone = null;
    });

    describe('cloned classname', function() {
      // Expect component css classes to match
      var elClassNameArray;
      var elCloneClassNameArray;

      beforeEach(function() {
        elClassNameArray = el.className.split(' ');
        elCloneClassNameArray = elClone.className.split(' ');
      });

      it('should have the same members', function() {
        expect(elCloneClassNameArray).to.have.members(elClassNameArray, 'clone className members does not match');
      });

      it('should have the same length', function() {
        expect(elCloneClassNameArray.length).to.equal(elClassNameArray.length, 'clone className count does not match');
      });
    });
    
    describe('cloned children', function() {
      var elChildren;
      var elCloneChildren;

      beforeEach(function() {
        elChildren = el.querySelectorAll('*');
        elCloneChildren = elClone.querySelectorAll('*');
      });

      it('should have the same length', function() {
        expect(elCloneChildren.length).to.equal(elChildren.length, 'cloned children count does not match');
      });

      it('should have the same tagname', function() {
        for (var i = 0; i < elCloneChildren.length; i++) {
          expect(elCloneChildren[i].tagName).to.equal(elChildren[i].tagName, 'cloned child tagName does not match');
        }
      });

      it('should have matching classnames', function() {
        for (var i = 0; i < elCloneChildren.length; i++) {
          var elChildrenClassName;
          var elCloneChildrenClassName;
          
          if (typeof elChildren[i].className === 'string') {
            elChildrenClassName = elChildren[i].className.trim().split(' ');
            elCloneChildrenClassName = elCloneChildren[i].className.trim().split(' ');
  
            expect(elCloneChildrenClassName).to.have.members(elChildrenClassName,
              'clone child className vs new child className');
            expect(elCloneChildrenClassName.length).to.equal(elChildrenClassName.length,
              'clone child className length vs new child className length');
          }
          // Support <svg>
          else if (typeof elCloneChildren === 'object') {
            elChildrenClassName = elChildren[i].className;
            elCloneChildrenClassName = elCloneChildren[i].className;
  
            expect(elCloneChildrenClassName).to.deep.equal(elChildrenClassName,
              'clone child className vs new child className');
          }
        }
      });
    });
  });
};