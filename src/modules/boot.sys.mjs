/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
const Services = globalThis.Services;
const { AppConstants } = ChromeUtils.importESModule("resource://gre/modules/AppConstants.sys.mjs");
const IS_ESM_READY = parseInt(AppConstants.MOZ_APP_VERSION, 10) >= 128;
const { FileUtils } =
    IS_ESM_READY
      ? ChromeUtils.importESModule("resource://gre/modules/FileUtils.sys.mjs")
      : Cu.import("resource://gre/modules/FileUtils.jsm");
const { PrefManager } = ChromeUtils.importESModule(
    'chrome://mobileconfigfirefox/content/PrefManager.sys.mjs'
);

/**
 * Set prefereces on startup
 */
function setPrefs() {
    PrefManager.defaultPref('mcf.mypref.enabled', false);
}

(function main() {
    try {
        setDefaultPrefs();
    } catch(e) {
        console.log(e);
    }
})();
