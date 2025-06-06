/* Copyright 2025 Danny Colin
 * SPDX-License-Identifier: MPL-2.0 */

const {classes: Cc, interfaces: Ci, utils: Cu} = Components;

class PreferencesObserver {
    constructor() {
    }
    observe(subject, topic, data) {
        const preferences = [
            "mcf.addressbarontop",
        ];

        switch (topic) {
            case "nsPref:changed":
                if (preferences.includes(data)) {
                    console.log("Match!");
                }
                console.log(`${topic}: ${data}`);
                break;
        }
        window.addEventListener("unload", () => {
            Services.prefs.removeObserver("", aboutMobilePrefObserver);
        }, { once: true });
    }
    // TODO:
    // - handle other form elements (e.g. input)
    // - Fix default values for some preferences
    handleClick(event) {
        const target = event.target;
        switch (target.dataset.preferenceType) {
            case "bool":
                Services.prefs.setBoolPref(
                    target.dataset.preference, target.pressed);
                break;
            case "number":
                Services.prefs.setIntPref(
                    target.dataset.preference, target.pressed);
                break;
            case "string":
                Services.prefs.setStringPref(
                    target.dataset.preference, target.pressed);
                break;
        }
    }
}

/* Entrypoint */
window.onload = (event) => {
    const preferencesObserver = new PreferencesObserver();
    Services.prefs.addObserver("", preferencesObserver.observe);
    document.addEventListener("click", preferencesObserver.handleClick);
};
