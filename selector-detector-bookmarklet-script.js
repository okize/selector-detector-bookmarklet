window['selector-detector'].version = 2;
window['selector-detector'].init = function() {

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
    stylesheetRules;

  // returns count of selectors in ruleset
  var getSelectorCount = function (ruleset) {

    var count = 0, selectors;

    for (var i = 0; i < ruleset.length; i++) {
      selectors = ruleset[i].selectorText;
      if (selectors) {
        count += selectors.split(',').length;
      }
    }

    return count;

  };

  // returns an object of parsed stylesheet info
  var getStylesheetObject = function (name, rules) {

    return {
      name: name,
      rules: rules.length,
      selectors: getSelectorCount(rules)
    };

  };

  // outputs nice formatting to the console
  var prettyPrint = function (count) {

    console.clear();

    var str = '';

    str +=
      'Found ' + count.stylesheets.total + ' total stylesheets:\n' +
      ' - ' + count.stylesheets.linked + ' linked stylesheets\n' +
      ' - ' + count.stylesheets.inline + ' inline style blocks\n\n' +
      '-----------------------------------------------------------' +
      '\n\n';

    for (var i = 0, len = count.parsed.length; i < len; i++) {
      str +=
        count.parsed[i].name + '\n' +
        ' - ' + count.parsed[i].rules + ' rules\n' +
        ' - ' + count.parsed[i].selectors + ' selectors\n\n';
    }

    console.log(str);

  };

  for (var i = 0; i < count.stylesheets.total; i++) {

    stylesheet = stylesheets[i],
    stylesheetLink = stylesheet.href,
    stylesheetRules = stylesheet.cssRules;

    // linked stylesheet
    if (stylesheetLink !== null ) {
      count.stylesheets.linked++;
      count.parsed.push( getStylesheetObject(stylesheetLink.split('/').pop(), stylesheetRules ));
    }

    // inline style block
    else {
      count.stylesheets.inline++;
      count.parsed.push( getStylesheetObject('inline-style-block-' + count.stylesheets.inline, stylesheetRules ));
    }

  }

  prettyPrint(count);

};