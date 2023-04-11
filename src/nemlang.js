(function() {
    'use strict';

    var NemLang = {};

    // A utility function to add two numbers
    NemLang.plus = function(a, b) {
        return a + b;
    };

    // A function to add a paragraph to the site with text and math
    NemLang.AddP = function(content) {
        var paragraph = document.createElement('p');
        paragraph.innerHTML = content;
        document.body.appendChild(paragraph);
    };

    // Export NemLang to global scope
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NemLang;
    } else {
        window.NemLang = NemLang;
    }
})();
