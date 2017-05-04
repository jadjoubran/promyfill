/*promyfill*/
!function(){function n(n){return new Promise(function(o,t){n&&o(n),t(n)})}function o(n){return new Promise(function(o,t){n||t();var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.defer=!0,e.src=n,e.onload=function(){o(n)},e.onerror=function(){t()},window.document.body.appendChild(e)})}window.promyfill=function(t,e){return new Promise(function(i){n(t).then(function(){i(t)}).catch(function(){o(e).then(function(){i(t)})})})}}();


var usersList = document.getElementById('users-list');
usersList.innerHTML += ' - JavaScript booted.';

var fetchPolyfill = 'https://rawgit.com/github/fetch/master/fetch.js';
promyfill('fetch' in window, fetchPolyfill).then(function(){
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

//other code that doesn't depend on fetch
