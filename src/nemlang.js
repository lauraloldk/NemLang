(function () {
    "use strict";

    var NemLang = {};

    // A utility function to add two numbers
    NemLang.plus = function (a, b) {
        return a + b;
    };

    // A function to add a paragraph to the site with text and math
    NemLang.AddP = function (text, skipAppend) {
        var p = document.createElement("p");
        p.innerHTML = text;
        if (!skipAppend) {
            document.body.appendChild(p);
        }
        return p;
    };
    
     NemLang.AddH = function(text, skipAppend, variant) {
        variant = variant || 1;
        var h = document.createElement("h" + variant);
        h.innerHTML = text;
        if (!skipAppend) {
            document.body.appendChild(h);
        }
        return h;
    };
	
	NemLang.AddButton = function(text, skipAppend) {
    var button = document.createElement("button");
    button.textContent = text;

    if (!skipAppend) {
        document.body.appendChild(button);
    }

    return button;
    };
	
	NemLang.click = function(object, doFunction) {
    object.addEventListener("click", function() {
        if (typeof doFunction === "function") {
            doFunction();
        }
    });
    };


    NemLang.dot = function (callback, showInput) {
        function createDotAndExecuteCallback(event) {
            var x = event.clientX;
            var y = event.clientY;

            // Create a black dot at the clicked position
            var dot = document.createElement("div");
            dot.style.position = "absolute";
            dot.style.left = x + "px";
            dot.style.top = y + "px";
            dot.style.width = "5px";
            dot.style.height = "5px";
            dot.style.backgroundColor = "black";
            document.body.appendChild(dot);

            // Show input box with coordinates if showInput is true
            if (showInput) {
                var textBox = document.createElement("input");
                textBox.type = "text";
                textBox.value = `x: ${x}, y: ${y}`;
                textBox.style.position = "absolute";
                textBox.style.left = x + 10 + "px";
                textBox.style.top = y + 10 + "px";
                document.body.appendChild(textBox);
            }

            // Remove the click event listener after one click
            document.removeEventListener("click", createDotAndExecuteCallback);

            // Execute the callback function with the coordinates
            if (typeof callback === "function") {
                callback(x, y);
            }
        }

        // Add the click event listener
        document.addEventListener("click", createDotAndExecuteCallback);
    };

    NemLang.SpawnObject = function (x, y, element) {
        element.style.position = "absolute";
        element.style.left = x + "px";
        element.style.top = y + "px";
        document.body.appendChild(element);
    };
	
	NemLang.ChangeObject = function(object, propertySetter) {
    if (object instanceof HTMLElement) {
        if (typeof propertySetter === 'function') {
            propertySetter(object);
        }
    } else {
        console.error('Invalid object provided. It must be an instance of HTMLElement.');
    }
};

    NemLang.text = function(newText) {
    return function(element) {
        if (element.tagName === 'BUTTON') {
            element.textContent = newText;
        } else {
            element.innerHTML = newText;
        }
    };
};

    NemLang.color = function(newColor, backgroundColor) {
    return function(element) {
        if (backgroundColor) {
            element.style.backgroundColor = newColor;
        } else {
            element.style.color = newColor;
        }
    };
};



    // Export NemLang to global scope
    if (typeof module !== "undefined" && module.exports) {
        module.exports = NemLang;
    } else {
        window.NemLang = NemLang;
    }
})();
