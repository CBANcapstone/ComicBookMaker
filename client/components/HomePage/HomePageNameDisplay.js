import Snap from 'snapsvg-cjs';

const typeName = function() {
  var l = Snap('#logo');
  var p = l.select('path');

  l.append(p);

  p.attr({
    fill: '#2980b9',
    stroke: '#0066CC'
  });

  setTimeout(function() {
    var logoTitle = 'Comic Book Maker';
    var logoRandom = '';
    var logoTitleContainer = l.text(0, '38%', '');
    var possible = '-+*/|}{[]~\\":;?/.><=+-_)(*&^%$#@!)}';
    logoTitleContainer.attr({
      fontSize: '15em',
      fontFamily: '"Rock Salt"',
      fontWeight: '1000'
    });

    for (var i = 0; i < logoTitle.length + 1; i++) {
      logoRandom = logoTitle.substr(0, i);
      for (var j = i; j < logoTitle.length; j++) {
        logoRandom += possible.charAt(
          Math.floor(Math.random() * possible.length)
        );
      }
      generateRandomTitle(i, logoRandom);
      logoRandom = '';
    }

    function generateRandomTitle(i, logoRandom) {
      setTimeout(function() {
        logoTitleContainer.attr({ text: logoRandom });
      }, i * 70);
    }
  }, 500);
};

export default typeName;
