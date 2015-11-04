    "use strict";

    console.log("\n\n\n\n\t\tSee discussion at:\n\t\t\thttp://stackoverflow.com/q/33518341/274677\n\n");
    var assert = function(condition, message) {
        if (!condition)
            throw new Error(message||'assertion error');
    };
    
    var Counter1 = function() {
        var count = 0;
        return {get: function() {return count;},
                inc: function() {count++;}};
    };
    
    var c2a = Counter1();
    c2a.inc();
    assert(c2a.get()===1);
    var c2b = Counter1();
    assert(c2b.get()===0);
    assert(c2a.get()===1); // previous counter is a separate object
    
    
    
    var Counter2 = function Counter2_() {
        var count = 0;
        Counter2_.prototype.get = function() {return count;};
        Counter2_.prototype.inc = function() {count++;};
        assert(Counter2_.prototype.constructor === Counter2_);
        var rv = {};
        rv.__proto__ = Counter2_.prototype;
        return rv;
    };
    
    var c = Counter2();
    
    c.inc();
    assert(c.get()===1);
    assert(Object.getPrototypeOf(c)===Counter2.prototype);
    
    var cb = Counter2();
    assert(Object.getPrototypeOf(cb)===Counter2.prototype);
    assert(cb.get()===0);
    try {
        assert(c .get()===1, 'expecting c to be 1 but was:'+c.get());
    } catch (e) {
        console.log(e);
    }
    
    var Counter3 = function Counter3_() {
        var count = 0;
        var rv = {};
        rv.__proto__ = Counter3_.prototype;
        return rv;
    };
    
    Counter3.prototype.get = function() {return this.count;}; 
    Counter3.prototype.inc = function() {return this.count++;};

    var c3a = Counter3();
    c3a.inc();
    try {
        assert(c3a.get()===1, 'expecting counter to be 1 yet it was:'+c3a.get());
    } catch (e) {
        console.log(e);
    }




