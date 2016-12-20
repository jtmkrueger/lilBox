(function(factory) {
  'use strict';

  // Setup for different environments, incase this goes public. First is Node.js or CommonJS.
  if(typeof exports !== 'undefined') { // jshint ignore:line
    factory(exports); // jshint ignore:line
  } else {
    self.lilBox = factory({}); // jshint ignore:line

    if(typeof define === 'function' && define.amd) { // jshint ignore:line
      define('lilBox', [], function() { // jshint ignore:line
        return self.lilBox; // jshint ignore:line
      });
    }
  }

}(function(lilBox) {'use strict';

  function inherit(parent, obj) {
    var result = {}, key;
    for (key in parent) {
      result[key] = parent[key];
    }
    if (obj) {
      for (key in obj) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  var options = {
    classPrefix: 'lilbox-',
    shadow: 'rgba(0,0,0,0.7)',
    boxBackgroundColor: 'white',
    maxWidth: '100%',
    color: 'black',
    okText: 'Ok',
    opacity: 1.0,
  };


  function config(userOptions) {
    options = inherit(options, userOptions);
  }

  function init () {
    // create a super simple stylesheet, just for the basic functionality
    var sheet = (function() {
      var style = document.createElement('style');
      style.appendChild(document.createTextNode('')); // WebKit hack :(
      style.id = 'lilBox-styles';
      document.head.appendChild(style);
      return style.sheet;
    })();

    sheet.insertRule('#lilBox-background {z-index: 998; position: fixed; top: 0; bottom: 0; left: 0; right: 0; ' +
                     options.shadow + 'background: rgba(0,0,0,0.7); transition: opacity 500ms;}', 0);
    sheet.insertRule('#lilBox {z-index: 999; padding: 20px; position: fixed; max-width: ' + options.maxWidth + '; opacity: ' +
                     options.opacity + '}', 1);
    sheet.insertRule('#lilBox-content {clear: both;}', 2);
    sheet.insertRule('#lilBox-close {float: right; cursor: pointer;}', 3);
    sheet.insertRule('#lilBox-yes-button {float: left; cursor: pointer;}', 4);
    sheet.insertRule('#lilBox-no-button {float: right; cursor: pointer;}', 5);
    sheet.insertRule('#lilBox-ok-button {margin-left: auto; margin-right: auto; cursor: pointer;}', 6);

    var background = document.createElement('div');
    background.id = 'lilBox-background';

    document.body.appendChild(background);
  }

function cleanupBox () {
  document.getElementById('lilBox-styles').remove();
  document.getElementById('lilBox').remove();
  document.getElementById('lilBox-background').remove();
}

  function baseTemplate (html, close) {
    var template = document.createElement('div');
    var contentBox = document.createElement('div');
    var content = document.createTextNode(html);

    if (close) {
      var closeBox = document.createElement('div');
      var closeButton = document.createTextNode('X');
      closeBox.id = 'lilBox-close';
      closeBox.appendChild(closeButton);
      template.appendChild(closeBox);
    }

    template.id = 'lilBox';
    contentBox.id = 'lilBox-content';
    contentBox.appendChild(content);
    template.appendChild(contentBox);

    return template;
  }

  function basicTemplate (html) {
    var template = baseTemplate(html, true);
    template.style.top = '20px';
    template.style.left = '50%';
    template.style.backgroundColor = options.backgroundColor;

    return template;
  }

  function confirmTemplate (html) {
    var template = baseTemplate(html, false);
    template.style.backgroundColor = options.backgroundColor;

    var yesButton = document.createElement('div');
    var yesText = document.createTextNode('Yes');
    yesButton.id = 'lilBox-yes-button';
    yesButton.appendChild(yesText);
    template.appendChild(yesButton);

    var noButton = document.createElement('div');
    var noText = document.createTextNode('No');
    noButton.id = 'lilBox-no-button';
    noButton.appendChild(noText);
    template.appendChild(noButton);

    return template;
  }

  function okTemplate (html) {
    var template = baseTemplate(html, false);
    template.style.backgroundColor = options.backgroundColor;

    var okButton = document.createElement('div');
    var okText = document.createTextNode(options.okText);
    okButton.id = 'lilBox-ok-button';
    okButton.appendChild(okText);
    template.appendChild(okButton);

    return template;
  }

  function centerLilBox (template) {
    template.style.left = (document.body.offsetWidth / 2) - (template.offsetWidth / 2) + 'px';
    template.style.top = (document.body.offsetHeight / 2) - (template.offsetHeight / 2) + 'px';
  }

  lilBox.basic = function (html, userOptions) {
    if (userOptions !== null) {
      config(userOptions);
    }

    init();

    document.body.appendChild(basicTemplate(html));

    var closeBox = document.getElementById('lilBox-close');
    closeBox.addEventListener('click', function () {
      cleanupBox();
    });

  };

  lilBox.confirm = function (html, confirmed, userOptions) {
    if (userOptions !== null) {
      config(userOptions);
    }
    init();

    var template = confirmTemplate(html);
    document.body.appendChild(template);

    centerLilBox (template);

    var yesButton = document.getElementById('lilBox-yes-button');
    yesButton.addEventListener('click', function () {
      cleanupBox();
      confirmed();
    });

    var noButton = document.getElementById('lilBox-no-button');
    noButton.addEventListener('click', function () {
      cleanupBox();
    });

    window.addEventListener('resize', function () {centerLilBox(template);});
  };

  lilBox.ok = function (html, okayed, userOptions) {
    if (userOptions !== null) {
      config(userOptions);
    }
    init();

    var template = okTemplate(html);
    document.body.appendChild(template);

    centerLilBox (template);

    var okButton = document.getElementById('lilBox-ok-button');
    okButton.addEventListener('click', function () {
      cleanupBox();
      okayed();
    });

    window.addEventListener('resize', function () {centerLilBox(template);});
  };

  return lilBox;
}));
