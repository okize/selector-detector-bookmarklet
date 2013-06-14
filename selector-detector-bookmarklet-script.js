(function() {

  var stylesheets = document.styleSheets,
      ss,
      ssLink,
      stylesheetName,
      stylesheetRules,
      totalRulesInStylesheet,
      totalSelectorsInStylesheet;

  for (var i = 0; i < stylesheets.length; i++) {

    stylesheet = stylesheets[i],
    stylesheetLink = stylesheet.href;

    if (stylesheetLink !== null ) {

      stylesheetName = stylesheetLink.split('/').pop(),
      stylesheetNameParsed = stylesheetName.replace(/[-]/g, ' ').replace(/.css/, ''),
      stylesheetRules = stylesheet.cssRules;

      // check that rules exists (will break on empty stylesheet)
      totalRulesInStylesheet = stylesheetRules.length,
      totalSelectorsInStylesheet = 0;

      for (var j = 0; j < totalRulesInStylesheet; j++) {

        if (stylesheetRules[j].selectorText) {
          totalSelectorsInStylesheet += stylesheetRules[j].selectorText.split(',').length;
        }

      }

      console.log( '[' + stylesheetNameParsed + '] has ' + totalRulesInStylesheet + ' rules and ' + totalSelectorsInStylesheet + ' selectors.');

    }

  }

}).call(this);