require('../lilbox.js');

describe("lilBox", function() {
  it ("is loaded", function () {
    expect(lilBox).toBeDefined();
  });

  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });

  it("and has a positive case", function() {
    expect(true).toBe(true);
  });

  it("and can have a negative case", function() {
    expect(false).not.toBe(true);
  });

  it("can examine objects", function () {
    var foo = {
      a: 12,
      b: 34
    };
    var bar = {
      a: 12,
      b: 34
    };
    expect(foo).toEqual(bar);
  });
});
