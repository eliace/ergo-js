var expect = chai.expect;

describe('Object', function(){

  describe('Initialization', function() {

		it('should use options', function() {

      var obj = new Ergo.core.Object({
        a: 'Alice',
        b: 'Bob'
      });



      expect(obj.options.a).to.be.eq('Alice');
      expect(obj.options.b).to.be.eq('Bob');

      expect( obj.opt('a') ).to.be.eq('Alice');

      obj.opt('a', 'Charlie');
      expect(obj.options.a).to.be.eq('Charlie');
      expect( obj.opt('a') ).to.be.eq('Charlie');

      obj.opt({b: 'Dave'});
      expect(obj.options.b).to.be.eq('Dave');
      expect( obj.opt('b') ).to.be.eq('Dave');

    });


    it('should use property getters and setters', function() {

      var obj = new Ergo.core.Object({
        a: 'Alice',
        set: {
          a: function(v) { this._a = v; }
        },
        get: {
          a: function() { return this._a; }
        }
      });

      expect(obj.options.a).to.be.eq('Alice');
      expect(obj._a).to.be.eq('Alice');
      expect(obj.prop('a')).to.be.eq('Alice');

    });




    it('should override setters and getters separatly', function() {

      Ergo.defineClass('Ergo.core.TestClass', 'Ergo.core.Object', {
        get a() {
          return this._a;
        }
      });

      Ergo.defineClass('Ergo.core.TestClass2', 'Ergo.core.TestClass', {
        set a(v) {
          this._a = v;
        }
      });


      var obj = new Ergo.core.TestClass2({
        a: 'Alice'
      });

      expect(obj.options.a).to.be.eq('Alice');
      expect(obj._a).to.be.eq('Alice');
      expect(obj.a).to.be.eq('Alice');

    });






    // it('should use overrides', function() {
    //
    //   var obj = new Ergo.core.Object({
    //     override: {
    //       myMethod: function() {
    //         return 'test';
    //       }
    //     }
    //   });
    //
    //   expect( obj.myMethod ).not.null;
    //   expect( obj.myMethod() ).to.be.eq('test');
    //
    // })



    it('should use includes', function() {

      $ergo.alias('includes:test', {
        defaults: {
          op: '+'
        },
        set a(v) { this._a = v; },
        get a() { return this._a; }
      });


      var obj = new Ergo.core.Object({
        include: 'test'
      });

      obj.a = 5;

      expect( obj._a ).to.be.eq(5);
      expect( obj.a ).to.be.eq(5);
      expect( obj.opt('op') ).to.be.eq('+');

    });





    it('should smart merge', function() {

      var ruleTypes = {
        'stringArray': function(a, b) {
          a = a || [];
          if(b) {
            a = Array.isArray(a) ? a : a.split(' ');
            b = Array.isArray(b) ? b : b.split(' ');
            return a.concat(b);
          }
          return a;
        }
      }

      var rules = {
        cls: 'list',
        events: ['object', { '*': 'list' }],
        as: 'list'
      }


      var customizer = function(a, b, i) {
        console.log(a, b, i);
        var rule = rules[i];
//        return rule ? ruleTypes[rule].call(this, a, b) : b;
        // если для опции есть правило
        if(rule) {
          a = Array.isArray(a) ? a : [a];
          b = Array.isArray(b) ? b : [b];
          return a.concat(b);
        }

        return b;
      };



      var optionsBuild = function(o, rules) {




      }



      var o = $ergo.mergeOptions({
        a: 'Alice',
        b: function() { return 5; },
        c: 3,
        cls: 'aaa',
        as: 'red blue'
      }, [{
        a: 'Bob',
        b: function() { return -1; },
        c: 10,
        cls: 'bbb',
        '!as': 'green',
        events: {
          'click': function() {}
        }
      }, {
        '~cls': 'aaa',
        events: {
          'click': function() {}
        }
      }],
      rules);

//      console.log('options', o);

      expect( o.a ).to.be.eq('Bob');
      expect( o.b() ).to.be.eq(-1);
      expect( o.c ).to.be.eq(10);
      expect( o.cls ).to.be.deep.eq(['bbb']);
      expect( o.as ).to.be.deep.eq(['green']);
      expect( o.events.click.length ).to.be.eq(2);





    })




  })
});
