function activateEditorFeatures() {
    editorToolbox.style.display = 'block';
    // Your editor features activation code goes here
}

function deactivateEditorFeatures() {
    editorToolbox.style.display = 'none';
    // Your editor features deactivation code goes here
}

function createEditorToolbox() 
{
  // Create the toolbox container
  const toolbox = document.createElement('div');
  toolbox.id = 'editor-toolbox';
  toolbox.style.position = 'fixed';
  toolbox.style.left = '0';
  toolbox.style.top = '0';
  toolbox.style.backgroundColor = 'grey';
  toolbox.style.padding = '10px';
  toolbox.style.display = 'none';

  // Create buttons and add them to the toolbox
    for (let i = 1; i <= 2; i++) {
    const button = document.createElement('button');

    if (i === 1) {
      button.textContent = 'Get X,Y';
      button.onclick = function() {
        event.stopPropagation();
        NemLang.dot(0, true);
      };
    } else if (i === 2) {
      button.textContent = 'Add P';
      button.onclick = function(event) {
        event.stopPropagation();

        NemLang.dot(function(x, y) {
          NemLang.Cleardot();

          var elementName = prompt('Please enter a name for the paragraph:');
          var paragraphText = prompt('Please enter the text for the paragraph:');
          var paragraph = NemLang.AddP(paragraphText || 'This is a paragraph created by Add P button.', true);

          if (elementName) {
            window[elementName] = paragraph;
            NemLang.SpawnObject(x, y, paragraph);
          }
        }, true);
      };
    } else {
      button.textContent = `Button ${i}`;
    }

    button.style.display = 'block';
    button.style.marginBottom = '10px';
    toolbox.appendChild(button);
  } 

  // Add the toolbox to the body
  document.body.appendChild(toolbox);

  return toolbox;
}

const editorToolbox = createEditorToolbox();


