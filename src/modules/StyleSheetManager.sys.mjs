/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export class StyleSheetManager {
    constructor() {
        try {
            let uri = Services.io.newURI("chrome://mobileconfigfirefox/content/themes/main.css");
            const sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(
                Ci.nsIStyleSheetService
            );
            sss.loadAndRegisterSheet(uri, Ci.nsIStyleSheetService.USER_SHEET);
        } catch (e) {
            console.error("Error adding dynamic stylesheet:", e);
        }
    }
}
