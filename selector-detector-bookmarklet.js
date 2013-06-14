javascript:(function(){

  var MyNamespace = 'selector-detector';

  if ( window[ MyNamespace ] ) {
    return;
  }
  window[ MyNamespace ] = {};

  var version = 1,
      script  = document.createElement( 'script' );

  script.setAttribute( 'type', 'text/javascript' );
  script.setAttribute( 'charset', 'UTF-8' );
  script.setAttribute( 'src', 'selector-detector-bookmarklet-script.js?r=' + Math.random() );
  // script.setAttribute( 'src', 'https://github.com/okize/selector-detector-bookmarklet/selector-detector-bookmarklet-script.js?r=' + Math.random() );
  document.documentElement.appendChild( script );

  script.onload = script.onreadystatechange = function() {
    var rs = script.readyState;
    if ( !rs || rs === 'loaded' || rs === 'complete' ) {
      script.onload = script.onreadystatechange = null;

      // initialise or warn if older version
      if ( version !== window[ MyNamespace ].version ) {
        alert( 'This bookmarklet is out of date!' );
      } else {
        window[ MyNamespace ].init();
      }
    }
  };

}());