/*promyfill*/
function supports(n){return new Promise(function(t,o){n&&t(n),o(!1)})}function loadPolyfill(n){return new Promise(function(t,o){n||o(!1);var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.defer=!0,e.src=n,e.onload=function(){t(n)},e.onerror=function(){o()},window.document.body.appendChild(e)})}function promyfill(n,t){return new Promise(function(o){supports(n).then(function(){o(n)}).catch(function(){loadPolyfill(t).then(function(){o(n)})})})}


var usersList = document.getElementById('users-list');

var fetchPolyfill = 'https://rawgit.com/github/fetch/master/fetch.js';
promyfill(window.fetch, fetchPolyfill).then(function(fetch){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(response) {
        return response.json();
    })
    .then(function(users) {
        var template = "";
        users.forEach(function(user) {
            template += user.name + "\n";
        });
        usersList.innerHTML = template;
    });
});

//other code that doesn't depend on fetch (won't be blocked)
usersList.innerHTML += ' - JavaScript booted.';
