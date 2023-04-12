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
	
	NemLang.Editor = function(editorbool) {
    if (editorbool) {
        activateEditorFeatures();
    } else {
        deactivateEditorFeatures();
    }
    };

    NemLang.dot = function(callback, showInput) {
    function createDotAndExecuteCallback(event) {
        var x = event.clientX;
        var y = event.clientY;

        // Create a black dot at the clicked position
        var dot = document.createElement("div");
        dot.className = "nemlang-dot";
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
            textBox.className = "nemlang-dot-input";
            textBox.value = `x: ${x}, y: ${y}`;
            textBox.style.position = "absolute";
            textBox.style.left = (x + 10) + "px";
            textBox.style.top = (y + 10) + "px";
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
	
	NemLang.Set = function(object, propertySetter) {
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
        if (element instanceof HTMLElement) {
            element.innerText = newText;
        } else {
            console.error('Invalid element provided. It must be an instance of HTMLElement.');
        }
    };
    };


    NemLang.color = function (element, color) {
    if (element && color) {
        element.style.color = color;
    } else if (element && color === undefined) {
        return element.style.color;
    } else if (color) {
        return function (el) {
            el.style.color = color;
        };
    } else {
        console.error('Invalid arguments provided. Please provide an HTMLElement and a color string.');
    }
};


	
	NemLang.Get = function(object, propertyGetter) {
    return propertyGetter(object);
    };

    NemLang.WaitForClick = function() {
    return new Promise((resolve) => {
        function onClick(event) {
            document.removeEventListener("click", onClick);
            resolve();
        }

        document.addEventListener("click", onClick);
    });
    };

    NemLang.Cleardot = function() {
    var dots = document.querySelectorAll(".nemlang-dot");
    var inputs = document.querySelectorAll(".nemlang-dot-input");

    for (var i = 0; i < dots.length; i++) {
        dots[i].remove();
    }

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].remove();
    }
    };
	
    NemLang.Move = function (object, activatedbool) {
    if (!(object instanceof HTMLElement)) {
        console.error('Invalid object provided. It must be an instance of HTMLElement.');
        return;
    }

    const moveButtons = document.createElement('div');
    moveButtons.className = 'move-buttons';
    moveButtons.style.position = 'absolute';
    moveButtons.style.display = 'flex';
    moveButtons.style.flexDirection = 'column';
    moveButtons.style.alignItems = 'center';

    const directions = ['Up', 'Down', 'Left', 'Right'];
    const moveElement = (direction) => {
        switch (direction) {
            case 'Up':
                object.style.top = (parseInt(object.style.top) || 0) - 10 + 'px';
                break;
            case 'Down':
                object.style.top = (parseInt(object.style.top) || 0) + 10 + 'px';
                break;
            case 'Left':
                object.style.left = (parseInt(object.style.left) || 0) - 10 + 'px';
                break;
            case 'Right':
                object.style.left = (parseInt(object.style.left) || 0) + 10 + 'px';
                break;
            default:
                console.error('Invalid direction provided.');
        }
    };

    directions.forEach((direction) => {
        const button = document.createElement('button');
        button.textContent = direction;
        button.onclick = () => moveElement(direction);

        if (direction === 'Up' || direction === 'Down') {
            moveButtons.appendChild(button);
        } else {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.justifyContent = direction === 'Left' ? 'flex-start' : 'flex-end';
            wrapper.style.width = '100%';

            if (direction === 'Left') {
                button.style.marginRight = '3px';
                wrapper.appendChild(button);
                moveButtons.insertBefore(wrapper, moveButtons.children[1]);
            } else {
                button.style.marginLeft = '3px';
                moveButtons.children[1].appendChild(button);
            }
        }
    });

    object.style.position = 'absolute';
    const parent = object.parentNode;
    const objectRect = object.getBoundingClientRect();
    moveButtons.style.top = (objectRect.top + window.scrollY - 20) + 'px';
    moveButtons.style.left = (objectRect.left + window.scrollX - 20) + 'px';

    if (activatedbool) {
        parent.insertBefore(moveButtons, object);
    } else {
        const existingMoveButtons = parent.querySelector('.move-buttons');
        if (existingMoveButtons) {
            existingMoveButtons.remove();
        }
    }
};
	

    // Export NemLang to global scope
    if (typeof module !== "undefined" && module.exports) {
        module.exports = NemLang;
    } else {
        window.NemLang = NemLang;
    }
})();
