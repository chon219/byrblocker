var blacklist = new Array();

var createBlacklistRow = function(username) {
    var row = document.createElement('tr');
    var td = document.createElement('td');
    td.innerHTML = username;
    row.appendChild(td);

    var td = document.createElement('td');
    var button = document.createElement('button')
    button.innerHTML = "删除";
    button.className = "pure-button";
    button.onclick = function() {
        delUser(username);
    }
    td.appendChild(button)
    row.appendChild(td);
    return row;
}

var refreshList = function() {
    var table = document.getElementById('blacklist');
    table.innerHTML = "";
    console.log(blacklist);
    blacklist.forEach(function(username) {
        if(username != "") {
            var row = createBlacklistRow(username);
            table.appendChild(row);
        }
    });
}

var message = function(content) {
    document.getElementById('message').innerHTML = content;
}

var addUser = function(username) {
    if(blacklist.indexOf(username)>=0) {
        message("该ID已存在");
    }else {
        blacklist.push(username);
        chrome.storage.sync.set({'blacklist': blacklist.toString()}, function() {
            message("已添加");
            refreshList();
        })
    }
};

var delUser = function(username) {
    var index = blacklist.indexOf(username);
    if(index>=0) {
        blacklist.splice(index, 1);
        chrome.storage.sync.set({'blacklist': blacklist.toString()}, function() {
            message("已更新");
            refreshList();
        })
    }else {
        message("该ID不存在");
    }
};

document.getElementById('add').onclick = function() {
    var username = document.getElementById('username').value.trim();
    document.getElementById('username').value = "";
    if(username == "") {
        message("ID不能为空");
    }else {
        addUser(username.toLowerCase());
    }
}

chrome.storage.sync.get('blacklist', function(item) {
    blacklist = item.blacklist.split(',');
    refreshList();
});
