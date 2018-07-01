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

// export default Highlight;
module.exports = {
  HighlightTemplate,
  HighlightBackground
};
