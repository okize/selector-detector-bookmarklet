(function(window, document) {

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

    if (ruleset !== null) {

      for (var i = 0; i < ruleset.length; i++) {
        selectors = ruleset[i].selectorText;
        if (selectors) {
          count += selectors.split(',').length;
        }
      }

    }

    return count;

  };

  // returns an object of parsed stylesheet info
  var getStylesheetObject = function (href, rules) {

    return {
      href: href,
      name: href.split('/').pop(),
      rules: rules.length,
      selectors: getSelectorCount(rules)
    };

  };

  // outputs nice formatting to the console
  var prettyPrint = function (count) {

    var str = '';

    str +=
      'Found ' + count.stylesheets.total + ' total stylesheets:\n' +
      '\t' + count.stylesheets.linked + ' linked stylesheets\n' +
      '\t' + count.stylesheets.inline + ' inline style blocks\n\n' +
      '-----------------------------------------------------------' +
      '\n\n';

    for (var i = 0, len = count.parsed.length; i < len; i++) {
      str +=
        count.parsed[i].href + '\n' +
        '\t' + count.parsed[i].rules + ' rules\n' +
        '\t' + count.parsed[i].selectors + ' selectors\n\n';
    }

    console.log(str);

  };

  for (var i = 0; i < count.stylesheets.total; i++) {

    stylesheet = stylesheets[i],
    stylesheetLink = stylesheet.href,
    stylesheetRules = stylesheet.cssRules;

    if (stylesheetRules !== null ) {

      // linked stylesheet
      if (stylesheetLink !== null ) {
        count.stylesheets.linked++;
        count.parsed.push( getStylesheetObject(stylesheetLink, stylesheetRules ));
      }

      // inline style block
      else {
        count.stylesheets.inline++;
        count.parsed.push( getStylesheetObject('inline-style-block-' + count.stylesheets.inline, stylesheetRules ));
      }

    } else {

      // cross-domain
      console.log('Stylesheets on cross domains can not be parsed:\n' + stylesheet.href);

    }

  }

  prettyPrint(count);

}).call(this, window, document, undefined);