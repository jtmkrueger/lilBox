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

} (function(lilBox) {'use strict';
  // this is what attachTo will set on init
  var container;

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

  lilBox.options = {
    classPrefix: 'lilbox-', // not doing anything yet
    shadow: 'rgba(0,0,0,0.7)',
    boxBackgroundColor: 'white',
    maxWidth: '100%',
    color: 'black',
    okText: 'Ok',
    yesText: 'Yes',
    noText: 'No',
    opacity: 1.0,
    transitionSpeed: '500ms',
    attachTo: 'body',
  };

  function config(userOptions) {
    lilBox.options = inherit(lilBox.options, userOptions);
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

    sheet.insertRule('#lilBox-background {z-index: 998; position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: ' +
                     lilBox.options.shadow + '; transition: opacity ' + lilBox.options.transitionSpeed + ';}', 0);
    sheet.insertRule('#lilBox {z-index: 999; padding: 20px; position: fixed; max-width: ' + lilBox.options.maxWidth + '; opacity: ' +
                     lilBox.options.opacity + '; color: ' + lilBox.options.color + '; background-color: ' + lilBox.options.boxBackgroundColor + ';}', 1);
    sheet.insertRule('#lilBox-content {clear: both;}', 2);
    sheet.insertRule('#lilBox-close {float: right; cursor: pointer;}', 3);
    sheet.insertRule('#lilBox-yes-button {float: left; cursor: pointer;}', 4);
    sheet.insertRule('#lilBox-no-button {float: right; cursor: pointer;}', 5);
    sheet.insertRule('#lilBox-ok-button {margin-left: auto; margin-right: auto; cursor: pointer;}', 6);

    var background = document.createElement('div');
    background.id = 'lilBox-background';

    if (lilBox.options.attachTo == 'body') {
      container = document.body;
    } else {
      var parts = lilBox.options.attachTo.match(/(.+?(?=#|\.))|([^#|.]+$)|(#|.)/g);

      if (parts[0].match(/\w*/)) {
        container = document.getElementsByTagName(parts[0]);
      } else {
        if (parts[0] === '.') {
          container = document.getElementsByClassName(parts[1])[0];
        } else if (parts[0] === '#') {
          container = document.getElementById(parts[1]);
        }
      }

      if (parts[1] === '.') {
        container = container.getElementsByClassName(parts[2]);
      } else if (parts[1] === '#') {
        container = container.getElementById(parts[2]);
      }
    }

    container.appendChild(background);
  }

function cleanupBox () {
  document.getElementById('lilBox-styles').remove();
  document.getElementById('lilBox').remove();
  document.getElementById('lilBox-background').remove();
}

  function baseTemplate (html, close) {
    var content,
    template = document.createElement('div'),
    contentBox = document.createElement('div');

    // determine if we're getting a template or a string
    if (typeof html === 'object') {
      content = html[0].innerHTML;
    } else {
      content = html;
    }

    if (close) {
      var closeBox = document.createElement('div');
      var closeButton = document.createTextNode('X');
      closeBox.id = 'lilBox-close';
      closeBox.appendChild(closeButton);
      template.appendChild(closeBox);
    }

    template.id = 'lilBox';
    contentBox.id = 'lilBox-content';
    contentBox.innerHTML = content;
    template.appendChild(contentBox);

    return template;
  }

  function basicTemplate (html) {
    var template = baseTemplate(html, true);
    template.style.top = '20px';
    template.style.left = '50%';
    template.style.backgroundColor = lilBox.options.backgroundColor;

    return template;
  }

  function confirmTemplate (html) {
    var template = baseTemplate(html, false);
    template.style.backgroundColor = lilBox.options.backgroundColor;

    var yesButton = document.createElement('div');
    var yesText = document.createTextNode(lilBox.options.yesText);
    yesButton.id = 'lilBox-yes-button';
    yesButton.appendChild(yesText);
    template.appendChild(yesButton);

    var noButton = document.createElement('div');
    var noText = document.createTextNode(lilBox.options.noText);
    noButton.id = 'lilBox-no-button';
    noButton.appendChild(noText);
    template.appendChild(noButton);

    return template;
  }

  function okTemplate (html) {
    var template = baseTemplate(html, false);
    template.style.backgroundColor = lilBox.options.backgroundColor;

    var okButton = document.createElement('div');
    var okText = document.createTextNode(lilBox.options.okText);
    okButton.id = 'lilBox-ok-button';
    okButton.appendChild(okText);
    template.appendChild(okButton);

    return template;
  }

  function centerLilBox (template) {
    template.style.left = (container.offsetWidth / 2) - (template.offsetWidth / 2) + 'px';
    template.style.top = (container.offsetHeight / 2) - (template.offsetHeight / 2) + 'px';
  }

  lilBox.setDefaults = function (userOptions) {
    config(userOptions);

    return lilBox.options;
  };

  lilBox.basic = function (html, userOptions) {
    if (userOptions !== null) {
      config(userOptions);
    }

    init();

    container.appendChild(basicTemplate(html));

    document.getElementById('lilBox-close').addEventListener('click', function () {
      cleanupBox();
    });

    document.getElementById('lilBox-background').addEventListener('click', function () {
      cleanupBox();
    });

  };

  lilBox.confirm = function (html, confirmed, userOptions) {
    if (userOptions !== null) {
      config(userOptions);
    }
    init();

    var template = confirmTemplate(html);
    container.appendChild(template);

    centerLilBox (template);

    var yesButton = document.getElementById('lilBox-yes-button');
    yesButton.addEventListener('click', function () {
      cleanupBox();

      if (typeof confirmed === 'function') {
        confirmed();
      }
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
    container.appendChild(template);

    centerLilBox (template);

    var okButton = document.getElementById('lilBox-ok-button');
    okButton.addEventListener('click', function () {
      cleanupBox();

      if (typeof okayed === 'function') {
        okayed();
      }
    });

    window.addEventListener('resize', function () {centerLilBox(template);});
  };

  return lilBox;
}));
