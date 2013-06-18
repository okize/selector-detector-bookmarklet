javascript:(function(){

  var namespace = 'selector-detector',
      scriptUrl = 'https://raw.github.com/okize/selector-detector-bookmarklet/master/build/selector-detector-bookmarklet.min.js';

  if ( window[ namespace ] ) {
    return;
  }
  window[ namespace ] = {};

  var version = 1,
      script  = document.createElement( 'script' );

  script.setAttribute( 'type', 'text/javascript' );
  script.setAttribute( 'charset', 'UTF-8' );
  script.setAttribute( 'src', scriptUrl + '?r=' + Math.random() );
  document.documentElement.appendChild( script );

  script.onload = script.onreadystatechange = function() {
    var rs = script.readyState;
    if ( !rs || rs === 'loaded' || rs === 'complete' ) {
      script.onload = script.onreadystatechange = null;

      // initialise or warn if older version
      if ( version !== window[ namespace ].version ) {
        alert( 'This bookmarklet is out of date!' );
      } else {
        window[ namespace ].init();
      }
    }
  };

}());