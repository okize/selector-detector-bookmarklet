(function(window, document) {

  var stylesheets = document.styleSheets;
  var count = {
      stylesheets: {
        total: stylesheets.length,
        inline: 0,
        linked: 0
      },
      parsed: []
    };
  var stylesheet;
  var stylesheetLink;
  var stylesheetRules;

  // returns count of selectors in ruleset
  var getSelectorCount = function (ruleset) {

    var count = 0;
    var selectors;
    var selectors_;
    var rs;

    if (ruleset !== null) {

      for (var i = 0; i < ruleset.length; i++) {

        rs = ruleset[i];

        // normal css style rules
        if (rs.type === 1) {
          selectors = rs.selectorText;
          if (selectors) {
            count += selectors.split(',').length;
          }
        }

        // media query rules
        else if (rs.type === 4) {

          for (var j = 0; j < rs.cssRules.length; j++) {
            selectors_ = rs.cssRules[j].selectorText;
            if (selectors_) {
              count += selectors_.split(',').length;
            }
          }
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

      // cross-domain requests won't work
      if (stylesheetLink.indexOf(location.origin) !== 0) {
        count.stylesheets.linked++;
        console.log('Stylesheet could not be parsed because it is on a different domain:\n' + stylesheet.href + '\n');
      }

    }

  }

  prettyPrint(count);

}).call(this, window, document, undefined);