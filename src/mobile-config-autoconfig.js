// Copyright 2025 Arnaud Ferraris, Danny Colin, Oliver Smith
// SPDX-License-Identifier: MPL-2.0
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const { classes: Cc, interfaces: Ci, utils: Cu } = Components;
const Services = globalThis.Services;
const { AppConstants } =
    ChromeUtils.importESModule("resource://gre/modules/AppConstants.sys.mjs");
const IS_ESM_READY = parseInt(AppConstants.MOZ_APP_VERSION, 10) >= 128;
const { FileUtils } =
    IS_ESM_READY
      ? ChromeUtils.importESModule("resource://gre/modules/FileUtils.sys.mjs")
      : Cu.import("resource://gre/modules/FileUtils.jsm");

function is_css_file_from_old_mcf(css_file) {
        var istream = Cc["@mozilla.org/network/file-input-stream;1"].
                      createInstance(Components.interfaces.nsIFileInputStream);
        istream.init(css_file, 0x01, 0444, 0);
        istream.QueryInterface(Components.interfaces.nsILineInputStream);

        var has_more;
        var is_from_mcf = false;
        do {
            var line = {};
            has_more = istream.readLine(line);
            if (line.value.includes("WARNING: DO NOT EDIT THE COPY OF THIS FILE LOCATED IN YOUR USER PROFILE!")) {
                is_from_mcf = true;
                break;
            }
        } while (has_more);
        istream.close();

        return is_from_mcf;
}

function delete_old_mcf_files() {
    /* mobile-config-firefox prior to 5.0.0 wrote userChrome.css and
     * userContent.css files into ~/.mozilla/firefox/<profile>/chrome/. This is
     * not necessary anymore and still having these old files with previous
     * customizations from MCF causes problems. Remove them. */
    var chrome_dir = Services.dirsvc.get("ProfD", Ci.nsIFile);
    chrome_dir.append("chrome");
    var names = ["userChrome", "userContent"];

    for (var i in names) {
        var name = names[i];
        var css_file = chrome_dir.clone();
        css_file.append(name + ".css");

        if (css_file.exists() && is_css_file_from_old_mcf(css_file))
            css_file.remove(false);
    }
}

try {
    delete_old_mcf_files();

    // Firefox is caching some files to make the startup time faster. We need to
    // clear the startup cache for the changes in boot.sys.mjs to take effect.
    //
    // TODO:
    // - Find a solution to only trigger a cache clearing when the source files
    //   have changed.
    Services.appinfo.invalidateCachesOnRestart();

    // We're converting our path to a nsIFile so it can be consumed by
    // autoRegister below.
    const chromeManifest =
        new FileUtils.File("/usr/lib/mobile-config-firefox/chrome.manifest");

    if(chromeManifest.exists()){
        Components.manager.QueryInterface(Ci.nsIComponentRegistrar)
            .autoRegister(chromeManifest);
        ChromeUtils.importESModule(
            'chrome://mobileconfigfirefox/content/boot.sys.mjs'
        );
    }
} catch(e) {
    // console.* isn't defined in autoconfig. We can use
    // Components.utils.reportError() for error messages or
    // Service.console.logStringMessage() for regular log messages.
    Cu.reportError(`Mobile Config Firefox: ${e}`);
};
