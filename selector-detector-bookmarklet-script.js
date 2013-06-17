(function() {

  var
    stylesheets = document.styleSheets,
    count = {
      stylesheets: {
        total: stylesheets.length,
        inline: 0,
        linked: 0
      },
      parsed: []
    },
    stylesheet,
    stylesheetLink,
    stylesheetName,
    stylesheetRules,
    ssObj;

  // returns count of selectors in ruleset
  var getSelectorCount = function(selectors) {

    if (selectors) {
      return selectors.split(',').length;
    }

    return 0;

  };

  for (var i = 0; i < count.stylesheets.total; i++) {

    ssObj = {
      name: '',
      rules: 0,
      selectors: 0
    };

    stylesheet = stylesheets[i],
    stylesheetLink = stylesheet.href;

    // is linked stylesheets
    if (stylesheetLink !== null ) {

      count.stylesheets.linked++;

      stylesheetRules = stylesheet.cssRules;

      ssObj.name = stylesheetLink.split('/').pop();
      ssObj.rules = stylesheetRules.length;

      for (var j = 0; j < ssObj.rules; j++) {
        ssObj.selectors += getSelectorCount(stylesheetRules[j].selectorText);
      }

      count.parsed.push(ssObj);

    }

    // is inline style block
    else {

      count.stylesheets.inline++;

      stylesheetRules = stylesheet.cssRules;

      ssObj.name = 'inline-style-block-' + count.stylesheets.inline;
      ssObj.rules = stylesheetRules.length;

      for (var k = 0; k < ssObj.rules; k++) {
        ssObj.selectors += getSelectorCount(stylesheetRules[k].selectorText);
      }

      count.parsed.push(ssObj);

    }

  }

  console.dir(count);
  // console.log( '[' + stylesheetNameParsed + '] has ' + totalRulesInStylesheet + ' rules and ' + totalSelectorsInStylesheet + ' selectors.');

}).call(this);