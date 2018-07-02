const HighlightTemplate = () => {
  var btns = document.getElementsByClassName('template-selected');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
      var current = document.getElementsByClassName('active');
      current[0].className = current[0].className.replace(' active', '');
      this.className += ' active';
    });
  }
};

const HighlightBackground = () => {
  var btns = document.getElementsByClassName('background-selected');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
      var current = document.getElementsByClassName('activeB');
      current[0].className = current[0].className.replace(' activeB', '');
      this.className += ' activeB';
    });
  }
};

const HighlightButton = () => {
  var btns = document.getElementsByClassName('btn-canvas');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
      var current = document.getElementsByClassName('active-btn');
      current[0].className = current[0].className.replace(' active-btn', '');
      this.className += ' active-btn';
    });
  }
};

const HighlightCategory = () => {
  var btns = document.getElementsByClassName('selection-category');
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {
      var current = document.getElementsByClassName('active-cat');
      current[0].className = current[0].className.replace(' active-cat', '');
      this.className += ' active-cat';
    });
  }
};

// export default Highlight;
module.exports = {
  HighlightTemplate,
  HighlightBackground,
  HighlightButton,
  HighlightCategory
};
