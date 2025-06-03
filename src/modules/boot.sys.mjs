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
const { UserAgentManager } = ChromeUtils.importESModule(
    'chrome://mobileconfigfirefox/content/UserAgentManager.sys.mjs'
);
const { StyleSheetManager } = ChromeUtils.importESModule(
    'chrome://mobileconfigfirefox/content/StyleSheetManager.sys.mjs'
);
//const { AboutUserChrome } = ChromeUtils.importESModule(
//    'chrome://mobileconfigfirefox/content/AboutMobile.sys.mjs'
//);
const { AboutMobile } = ChromeUtils.importESModule(
    'chrome://mobileconfigfirefox/content/AboutMobile.sys.mjs'
);
const { FileExtendedUtils } = ChromeUtils.importESModule(
    'chrome://mobileconfigfirefox/content/utils/FileExtendedUtils.sys.mjs'
);

/**
 * Set prefereces on startup
 *
 * See docs/ for preferences description and reason we're modifying them.
 */
function set_default_preferences() {
    PrefManager.defaultPref('apz.allow_zooming', true);
    PrefManager.defaultPref('apz.allow_double_tap_zooming', true);
    PrefManager.defaultPref('browser.download.animateNotifications', false);
    PrefManager.defaultPref('browser.newtabpage.enabled', false);
    PrefManager.defaultPref('browser.search.suggest.enabled', false);
    PrefManager.defaultPref('browser.tabs.inTitlebar', 1);
    PrefManager.defaultPref('browser.urlbar.clickSelectsAll', true);
    PrefManager.defaultPref('browser.urlbar.suggest.engines', false);
    PrefManager.defaultPref('browser.urlbar.suggest.topsites', false);
    PrefManager.defaultPref('browser.urlbar.trimHttps', true);
    PrefManager.defaultPref('dom.maxtouchpoints.testing.value', 1);
    PrefManager.defaultPref('dom.w3c.touch_events.enabled', true);
    PrefManager.defaultPref('dom.w3c_touch_events.legacy_apis.enabled', true);
    PrefManager.defaultPref('media.webrtc.camera.allow-pipewire', true);
    PrefManager.defaultPref('toolkit.cosmeticAnimations.enabled', false);
    PrefManager.defaultPref('toolkit.legacyUserProfileCustomizations.stylesheets', true);
    PrefManager.defaultPref('widget.use-xdg-desktop-portal.file-picker', 1);
}

function register_about_mobile() {
    // TODO:
    // - Move ComponentRegistrar and factory to the AboutMobile class
    // - Refactor AboutMobile.sys.mjs to be a generic about:page creator.

    const Cm = Components.manager.QueryInterface(Ci.nsIComponentRegistrar);
    const { ComponentUtils } = ChromeUtils.importESModule(
        "resource://gre/modules/ComponentUtils.sys.mjs"
    );
    const factory = ComponentUtils.generateSingletonFactory(function () {
        return new AboutMobile({
            chromeUrl: "chrome://mobileconfigfirefox/content/aboutmobile/index.html",
            aboutHost: "mobile",
            classID: "{6cb98913-a163-482c-9622-4faedc0e923f}",
            description: "About Mobile Page",
            uriFlags:
              Ci.nsIAboutModule.ALLOW_SCRIPT |
              Ci.nsIAboutModule.URI_SAFE_FOR_UNTRUSTED_CONTENT |
              Ci.nsIAboutModule.IS_SECURE_CHROME_UI,
        });
    });

    Cm.registerFactory(
        Components.ID("{6cb98913-a163-482c-9622-4faedc0e923f}"),
        "about:mobile",
        "@mozilla.org/network/protocol/about;1?what=mobile",
        factory
    );
}
/**
 * Bootstrapping
 */
(function main() {
    try {
        set_default_preferences();
        const userAgent = new UserAgentManager();
        // TODO:
        // - Find out if we can target the chrome and content context
        //   individually instead of globally injecting all the styling in each
        //   window.
        //   See: https://searchfox.org/mozilla-central/source/dom/interfaces/base/nsIDOMWindowUtils.idl#1891-1915
        const stylesheet = new StyleSheetManager();
        register_about_mobile();

    } catch(e) {
        console.log(e);
    }
})();
