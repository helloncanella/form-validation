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

    const elements = parentNode.querySelectorAll('input')

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