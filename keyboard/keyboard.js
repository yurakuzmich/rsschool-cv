const Keyboard = {
    elements: {
        main: null,
        keyContainer: null,
        keys: []
    },

    eventHandlers {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {

    },

    _createKeys() {

    },

    _triggerEvent(handlerNmae) {
        console.log(`Event triggered. Event name: ${handlerName}`);
    },

    _toggleCapsLock() {
        console.log('Caps toggled');
    },

    open(initialValue, oninput, onclose) {

    },

    close() {

    }
}

window.addEventListener('DOMContentLoaded', function() {
    Keyboard.init();
});