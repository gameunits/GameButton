var DogeClassPrefix = 'xdgbtn-';

var DogeContent = '<div class="' + DogeClassPrefix + 'symbol">🕹️ </div><p><span class="' + DogeClassPrefix + 'currency">Gameunits</span></p>';
var DogeButtons = [].slice.call(document.querySelectorAll('[data-xdgbtn-address]'));

DogeButtons.forEach(function(btn) {
    btn.innerHTML = DogeContent;
    if(hasClass(btn, prefixClass('donate'))){
        getBalance(btn.getAttribute('data-xdgbtn-address'), function(data){
            btn.querySelector('.' + prefixClass('symbol')).dataset.balance = Math.round(data).toFixed(2);
        });
    }
});

include('//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.5/ZeroClipboard.min.js', function(){
    ZeroClipboard.config( {
        swfPath: "//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.5/ZeroClipboard.swf" , 
        hoverClass: 'isHover'
    } );
    var clip = new ZeroClipboard(DogeButtons);
    clip.on( 'ready', function(event) {
        clip.on( 'copy', function(event) {
            event.clipboardData.setData('text/plain', event.target.dataset.address);
        } );
        clip.on( 'aftercopy', function(event) {
            event.target.classList.add('copied')
            setTimeout(function(){
                event.target.classList.remove('copied')
            }, 3100);
        });
    } );
    clip.on( 'error', function(event) {
        ZeroClipboard.destroy();
    } );
});

function hasClass(el, classname) {
    return ((" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(classname) > -1)
}

var closeButton = function() {
    DogeButtons.forEach(function(btn) {
        if (hasClass(btn, prefixClass('opened'))) {
            btn.classList.remove(prefixClass('opened'));
            btn.querySelector('.' + prefixClass('currency')).innerHTML = 'Gameunits';
        }
    });
}

DogeButtons.forEach(function(button){
    button.addEventListener('click', bindClickEvent);
});

function bindClickEvent(event) {
    var btn = event.currentTarget;
    if (hasClass(btn, prefixClass('opened'))) {
        closeButton();
    } else {
        btn.classList.add(prefixClass('opened'));
        btn.querySelector('.' + prefixClass('currency')).innerHTML = btn.getAttribute('data-xdgbtn-address');
    }
}

function prefixClass(className) {
    return DogeClassPrefix + className;
}

function getBalance(addr, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://crossorigin.me/http://cryptoskins.org:3001/ext/getbalance/"+addr ,true);
    xhr.send();
    xhr.onreadystatechange =  function(){
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            callback(xhr.responseText);
        }
    }
}

function include(path, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = path;
    script.type = 'text/javascript';

    script.onreadystatechange = callback;
    script.onload = callback;

    head.appendChild(script)
}