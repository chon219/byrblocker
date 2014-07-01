chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.storage.sync.get('enabled', function(item) {
        var enabled = item.enabled;
        if(enabled == 1) {
            chrome.storage.sync.set({'enabled': 0}, function() {
                chrome.browserAction.setIcon({path: "icons/sb-icon-disabled.png"});
            });
        }else {
            chrome.storage.sync.set({'enabled': 1}, function() {
                chrome.browserAction.setIcon({path: "icons/sb-icon-enabled.png"});
            });
        }
    });
});
