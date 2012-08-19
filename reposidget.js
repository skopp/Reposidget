; /* https://github.com/myst729/Reposidget */

function reposidget(obj) {
    var repoinfo = obj.data;
    var repohook = document.getElementById('repo-' + repoinfo.full_name.replace('/', '_'));
    var repojson = document.getElementById('json-' + repoinfo.full_name.replace('/', '_'));
    var container = document.createElement('div');
    var repoContent;
    var seconds = (new Date() - new Date(repoinfo.pushed_at)) / 1000;
    var prettyTime;
    if(repoinfo.description && repoinfo.homepage) {
        repoContent = '<p>' + repoinfo.description + '</p><p class="homepage"><strong><a href="' + repoinfo.homepage + '">' + repoinfo.homepage + '</a></strong></p>';
    } else if(repoinfo.description) {
        repoContent = '<p>' + repoinfo.description + '</p>';
    } else if(repoinfo.homepage) {
        repoContent = '<p class="homepage"><strong><a href="' + repoinfo.homepage + '">' + repoinfo.homepage + '</a></strong></p>';
    } else {
        repoContent = '<p class="none">No description or homepage.</p>';
    }
    if(seconds < 60) {
        prettyTime = 'just now';
    } else if(seconds < 120) {
        prettyTime = '1 minute ago';
    } else if(seconds < 3600) {
        prettyTime = Math.floor(seconds / 60) + ' minutes ago';
    } else if(seconds < 7200) {
        prettyTime = '1 hour ago';
    } else if(seconds < 86400) {
        prettyTime = Math.floor(seconds / 3600) + ' hours ago';
    } else if(seconds < 172800) {
        prettyTime = 'yesterday';
    } else if(seconds < 604800) {
        prettyTime = Math.floor(seconds / 86400) + ' days ago';
    } else if(seconds < 1209600) {
        prettyTime = '1 week ago';
    } else if(seconds < 2592000) {
        prettyTime = Math.floor(seconds / 604800) + ' weeks ago';
    } else {
        prettyTime = 'on ' + repoinfo.pushed_at.substring(0, 10);
    }
    container.className = 'reposidget';
    container.innerHTML = '<div class="reposidget-header"><h2><a href="https://github.com/' + repoinfo.owner.login + '">' + repoinfo.owner.login + '</a>&nbsp;/&nbsp;<strong><a href="' + repoinfo.html_url + '">' + repoinfo.name + '</a></strong></h2><span class="social"><span class="star">' + repoinfo.watchers_count + '</span><span class="fork">' + repoinfo.forks_count + '</span></span></div><div class="reposidget-content">' + repoContent + '</div><div class="reposidget-footer"><span class="update">Last updated ' + prettyTime + '.</span><span class="social"><span class="star">' + repoinfo.watchers_count + '</span><span class="fork">' + repoinfo.forks_count + '</span></span><a href="' + repoinfo.html_url + '/zipball/' + repoinfo.master_branch + '">Download as zip</a></div>';
    repohook.parentNode.insertBefore(container, repohook);
    repohook.style.display = 'none';
    document.body.removeChild(repojson);
}

if(!document.getElementsByClassName) {
    document.getElementsByClassName = function(cName) {
        var result = [];
        var nodes = document.getElementsByTagName('*');
        for(var i = 0, len = nodes.length; i < len; i++) {
            if((' ' + nodes[i].className.toLowerCase() + ' ').indexOf(' ' + cName.toLowerCase() + ' ') > -1) {
                result.push(nodes[i]);
            }
        }
        return result;
    };
}

(function() {
    var repository = document.getElementsByClassName('reposidget');
    var address;
    var jsonp;
    for(var i = 0, len = repository.length; i < len; i++) {
        address = repository[i].href.slice(repository[i].href.indexOf('github.com/') + 11);
        jsonp = document.createElement('script');
        jsonp.type = 'text/javascript';
        jsonp.src = 'https://api.github.com/repos/' + address + '?callback=reposidget';
        jsonp.id = 'json-' + address.replace('/', '_');
        repository[i].id = 'repo-' + address.replace('/', '_');
        document.body.appendChild(jsonp);
    }
})();