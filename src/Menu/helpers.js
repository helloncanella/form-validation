export function triggerWhenResizeEnds(callback) {
    var rtime;
    var timeout = false;
    var delta = 200; //ms

    window.addEventListener('resize', function (e) {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeend, delta);
        }
    });

    function resizeend() {
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;
            callback();
        }
    }
}

export function fetchInputsDataFrom(parentNode) {
    let data = {}

    const elements = parentNode.querySelectorAll('input:not(*[type="submit"])')

    elements.forEach(({name, value, type, checked}) => {    
        if(type !=="radio" || type==="radio" && checked) data[name] = value
    })

    return Object.assign({}, data)
}

export function removeStyles(elements) {
    elements = Array.isArray(elements) ? elements : [elements]
    elements.forEach(e => e.removeAttribute('style'))
}


export function markInputBorders(inputNames) {
    inputNames = Array.isArray(inputNames) ? inputNames : [inputNames]

    inputNames.forEach(name => {
        document.querySelector(`input[name=${name}]`).style.border = '1px solid #df4f71'
    })
}

export function verifyIfFieldsAreEmpty(fields) {
    let atLeastOneFieldEmpty = false
    
    for (let name in fields) {
        if (!fields[name]) {
            markInputBorders(name)
            if (!atLeastOneFieldEmpty) atLeastOneFieldEmpty = true
        }
    }

    
    return atLeastOneFieldEmpty
}

export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function verifyIfIsMobile(breakingPoint=450){
    return window.innerWidth <= breakingPoint
}

export function clientRect(node){
    if(typeof node === 'string') node = document.querySelector(node)
    
    let rect, width, height, top, left, bottom, right

    if(node){
        rect = node ? node.getBoundingClientRect() : {}
        
        width = rect.width || 0
        height = rect.height || 0
        top = rect.top || 0
        left = rect.left || 0
        bottom = rect.bottom || 0
        right = rect.right  || 0
    }


    return {width, height, top, left, bottom, right}
}


export function isMouseOn(selector) {
    return !!document.querySelector(selector + ":hover")
}

export function nameOfBrowser(){
    var ua= window.navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [window.navigator.appName, window.navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);

    return M.join(' ');
}

export function isSafari(){
    return /safari/i.test(nameOfBrowser())
}