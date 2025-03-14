import dict from "./dict.js";

document.addEventListener("DOMContentLoaded", (event) => {

    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    function setCookie(name, value, days, options = {}) {
        let cookieStr = name + "=" + encodeURIComponent(value) + "; path=/";

        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            cookieStr += "; expires=" + date.toUTCString();
        }

        if (options.sameSite) {
            cookieStr += "; SameSite=" + options.sameSite;
        }
        if (options.secure) {
            cookieStr += "; Secure";
        }

        document.cookie = cookieStr;
    }

    var languageSelected = getCookie("lang") || "en";

    var TRANSLATOR = new EOTranslator(dict, languageSelected);
    console.log(TRANSLATOR);

    var languageSelect = document.querySelector('select[name="language-selector"]');
    if (languageSelect) {
        languageSelect.value = languageSelected;
    }

    TRANSLATOR.translateDOM();

    if (languageSelect) {
        languageSelect.addEventListener("change", function () {
            var newLang = this.value;
            setCookie("lang", newLang, 7, { sameSite: "None", secure: true });
            TRANSLATOR.language = newLang;
            TRANSLATOR.translateDOM();
        });
    }

});