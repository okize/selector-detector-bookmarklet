(function() {

  var stylesheets = document.styleSheets,
      stylesheetsTotal = stylesheets.length,
      stylesheet,
      stylesheetLink,
      stylesheetName,
      stylesheetRules,
      totalInlineStylesheets = 0,
      totalRulesInStylesheet = 0,
      totalSelectorsInStylesheet = 0;

  for (var i = 0; i < stylesheetsTotal; i++) {

    stylesheet = stylesheets[i],
    stylesheetLink = stylesheet.href;

    console.log(stylesheetLink);

    if (stylesheetLink !== null ) {

      stylesheetName = stylesheetLink.split('/').pop(),
      stylesheetNameParsed = stylesheetName.replace(/[-]/g, ' ').replace(/.css/, ''),
      stylesheetRules = stylesheet.cssRules;

      if (stylesheetRules !== null ) {

        // check that rules exists (will break on empty stylesheet)
        totalRulesInStylesheet = stylesheetRules.length;

        for (var j = 0; j < totalRulesInStylesheet; j++) {

          if (stylesheetRules[j].selectorText) {
            totalSelectorsInStylesheet += stylesheetRules[j].selectorText.split(',').length;
          }

        }

        console.log( '[' + stylesheetNameParsed + '] has ' + totalRulesInStylesheet + ' rules and ' + totalSelectorsInStylesheet + ' selectors.');

      }

    } else {

      console.log('foo');

    }

  }

  console.log('Found ' + (stylesheetsTotal - totalInlineStylesheets) + ' linked stylesheets');
  console.log('Found ' + totalInlineStylesheets + ' inline style blocks');

}).call(this);