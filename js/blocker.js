var blacklist = new Array();
var enabled = true;

function setEnabled(value) {
    if(value == 0) {
        enabled = false;
    }else {
        enabled = true;
    }
}

chrome.storage.sync.get('blacklist', function(item) {
    blacklist = item.blacklist.split(',');
});

chrome.storage.sync.get('enabled', function(item) {
    setEnabled(item.enabled);
});

chrome.storage.onChanged.addListener(function(changes, area) {
    setEnabled(changes.enabled.newValue);
});

function welcomeToTheRealWorld(event) {
    if(enabled) {
        var nodes = document.getElementsByClassName('a-u-name');
        for (var i = 0, node; node = nodes[i]; i++) {
            var child = node.childNodes[0];
            if(child.tagName == 'A') {
                var username = child.innerHTML.toLowerCase();
            }else {
                var username = child.textContent.toLowerCase();
            }
            if (blacklist.indexOf(username) >= 0) {
                node.parentElement.parentElement.parentElement.parentElement.style.display = "none";
            };
        };
    }
}

function sayGoodbyeToTheDigiLife(event) {
    if(enabled) {
        var table = document.getElementsByClassName('board-list tiz')[0];
        if(table && table.tagName == 'TABLE') {
            var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
            for(var i = 1, row; row = rows[i]; i++) {
                var username = row.childNodes[3].childNodes[1].innerHTML.toLowerCase();
                if (blacklist.indexOf(username) >= 0) {
                    row.style.display = "none";
                }
            }
        }
    }
}

document.addEventListener("DOMNodeInserted", welcomeToTheRealWorld, false);
document.addEventListener("DOMNodeInserted", sayGoodbyeToTheDigiLife, false);
