/*
NOTE:
* if the user reloads the tab, or switches tabs, while the popup is open,
  then the popup won't be able to English the page any more (because the
  content script was injected into the original tab).

* by default [`tabs.executeScript()`](https://developer.mozilla.org/en-US/Add-
  ons/WebExtensions/API/tabs/executeScript) injects the script only when the
  web page and its resources have finished loading. This means that clicks in
  the popup will have no effect until the page has finished loading.

* it's not possible to inject content scripts into certain pages, including
  privileged browser pages like "about:debugging" and the [addons.mozilla.org]
  (https://addons.mozilla.org/) website. If the user clicks the Let's English
  icon when such a page is loaded into the active tab, the popup displays an
  error message.
*/

(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  //TODO: Get the proper english for the selected text
  /**
   * Display the selected to in an alert popup
   */
    function getSelectionText(command) {        
        //console.log("I AM NOT IN A BACKGROUND SCRIPT");
        if (command === "get_english") { 
            var text = "";
            if (window.getSelection) {
                text = window.getSelection().toString();
            } else if (document.selection && document.selection.type != "Control") {
                text = document.selection.createRange().text;
            }

            if (text) {
                alert(text);
            }
        }
    }

    /**
    * Listen for messages from the background script.
    * Call "getSelectionText()".
    */
    browser.runtime.onMessage.addListener((message) => {
        getSelectionText(message.command);
    });

})();
