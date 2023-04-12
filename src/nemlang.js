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

    NemLang.color = function (text, color) {
        return '<span style="color: ' + color + ';">' + text + "</span>";
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

    // Export NemLang to global scope
    if (typeof module !== "undefined" && module.exports) {
        module.exports = NemLang;
    } else {
        window.NemLang = NemLang;
    }
})();
