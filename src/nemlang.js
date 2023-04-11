(function() {
    'use strict';

    var NemLang = {};

    // A utility function to add two numbers
    NemLang.plus = function(a, b) {
        return a + b;
    };

    // A function to add a paragraph to the site with text and math
    NemLang.AddP = function(htmlContent) {
    var p = document.createElement('p');
    p.innerHTML = htmlContent;
    document.body.appendChild(p);
    };

	
	NemLang.color = function(text, color) {
    return '<span style="color: ' + color + ';">' + text + '</span>';
    };


    // Export NemLang to global scope
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NemLang;
    } else {
        window.NemLang = NemLang;
    }
})();
