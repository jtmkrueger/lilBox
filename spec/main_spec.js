var lilBox = require('../lilbox.js');

describe("lilBox", function() {
  it ("is loaded", function () {
    expect(lilBox).toBeDefined();
  });

  it("has a confirm function", function () {
    spyOn(lilBox, 'confirm');
    lilBox.confirm('hello world', function () {return true;});
    expect(lilBox.confirm).toHaveBeenCalled();
  });

  it("has a ok function", function () {
    spyOn(lilBox, 'ok');
    lilBox.ok('hello world', function () {return true;});
    expect(lilBox.ok).toHaveBeenCalled();
  });

  it("has a basic function", function () {
    spyOn(lilBox, 'basic');
    lilBox.basic('hello world');
    expect(lilBox.basic).toHaveBeenCalled();
  });

  it("allows changing the defaults", function () {
    var originalColor = lilBox.options.color;
    
    lilBox.setDefaults({color: 'blue'});
    expect(lilBox.options.color).toEqual('blue');
  });
});
