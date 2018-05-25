const includeOnceAssert = function (chai, utils) {

  const Assertion = chai.Assertion;

  Assertion.addMethod('includeOnce', function (content) {
    const obj = this._obj;
    const contains = obj.indexOf(content) >= 0;
    const containsOnlyOne = obj.indexOf(content) === obj.lastIndexOf(content);

    let msg = 'expected #{this} to contain "' + content + '"';
    if (!containsOnlyOne) {
      msg = 'expected #{this} to contain only one occurrence of "' + content + '"';
    }

    this.assert(contains && containsOnlyOne, msg);
  });

};

chai.use(includeOnceAssert);
