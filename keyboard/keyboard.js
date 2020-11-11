const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        lang: 'en'
    },

    init() {


        //Create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');
        //Setup main elements
        this.elements.main.classList.add('keyboard', 'keyboard_hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this._createKeys(this.properties.lang));

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
        //Add elements to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        //Automaticall use keyboard for elements with .use-keyboard-input
        document.querySelectorAll('.use-keyboard-input').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys(lang) {
        const fragment = document.createDocumentFragment();
        let keyLayout = [];
        if (lang === 'en') {
            keyLayout = [
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
                "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
                "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
                "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
                "space", "lang"
            ];
        } else if (lang === 'ru') {
            keyLayout = [
                "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
                "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
                "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
                "done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", ".", "?",
                "space", "lang"
            ];
        }

        //Create HTML for icons
        const createIconHTML = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`;
        }

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            let insertLineBreak;
            if (lang === 'en') {
                insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
            } else if (lang === 'ru') {
                insertLineBreak = ["backspace", "ъ", "enter", "?"].indexOf(key) !== -1;
            }
            //Keys attributes and classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");
            switch (key) {
                case "backspace":
                    keyElement.classList.add('keyboard__key_wide');
                    keyElement.innerHTML = createIconHTML("backspace");
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });
                    break;
                case "caps":
                    keyElement.classList.add('keyboard__key_wide', 'keyboard__key_activatable');
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key_active", this.properties.capsLock);
                    });
                    break;
                case "enter":
                    keyElement.classList.add('keyboard__key_wide');
                    keyElement.innerHTML = createIconHTML("keyboard_return");
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvent("oninput");
                    });
                    break;
                case "lang":
                    keyElement.classList.add('keyboard__key_wide');
                    keyElement.innerHTML = createIconHTML("language");
                    keyElement.addEventListener('click', () => {
                        this._changeLang();
                    });
                    break;
                case "space":
                    keyElement.classList.add('keyboard__key_extra-wide');
                    keyElement.innerHTML = createIconHTML("space_bar");
                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvent("oninput");
                    });
                    break;
                case "done":
                    keyElement.classList.add('keyboard__key_wide', 'keyboard__key_dark');
                    keyElement.innerHTML = createIconHTML("check_circle");
                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });
                    break;
                default:
                    keyElement.textContent = key.toLocaleLowerCase();
                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capsLock ? key.toLocaleUpperCase() : key.toLocaleLowerCase();
                        this._triggerEvent("oninput");
                    });
                    break;
            }

            fragment.appendChild(keyElement);
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });
        return fragment;
    },

    _changeLang() {
        this.properties.lang === 'en' ? this.properties.lang = 'ru' : this.properties.lang = 'en';
        this.elements.keysContainer.remove();
        this.elements.keysContainer = document.createElement('div');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this._createKeys(this.properties.lang));
        this.elements.main.appendChild(this.elements.keysContainer);
        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }

    },

    _toggleCapsLock() {
        console.log('Caps toggled');
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard_hidden");
    },

    close() {
        this.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard_hidden");
    }
}

window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
});