/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { PrefManager } from 'chrome://mobileconfigfirefox/content/PrefManager.sys.mjs'
import { AppConstants } from 'resource://gre/modules/AppConstants.sys.mjs'

export class UserAgentManager {
  constructor() {
    const APP_VERSION = `${AppConstants.MOZ_APP_VERSION.split(".")[0]}.0`;
    const UA_FIREFOX_DESKTOP =
          `Mozilla/5.0 (X11; Linux x86_64; Mobile; rv:${APP_VERSION}) Gecko/20100101 Firefox/${APP_VERSION}`;
    const UA_FIREFOX_ANDROID =
          `Mozilla/5.0 (Android 15; Mobile; rv:${APP_VERSION}) Gecko/${APP_VERSION} Firefox/${APP_VERSION}`;

    // Set default user agent
    PrefManager.defaultPref('general.useragent.override', UA_FIREFOX_DESKTOP);

    const userAgentRules = {
        // Youtube
        // FIX: YouTube fullscreen acting weird
        "^https?://dannycolin.com($|/)": UA_FIREFOX_ANDROID,
        "^https?://duckduckgo.com($|/)": UA_FIREFOX_ANDROID,
    };

    const requestObserver = {
        observe: function(subject, topic, data) {
            if (topic == "http-on-modify-request") {
                const httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
                const uri = httpChannel.URI.spec;

                for (const [urlPattern, userAgentRule] of Object.entries(userAgentRules)) {
                    if (new RegExp(urlPattern).test(uri)) {
                        httpChannel.setRequestHeader("User-Agent", userAgentRule, false);
                        break;
                    }
                }
            }
        }
    };

    const observerService = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
    observerService.addObserver(requestObserver, "http-on-modify-request", false);
  }
}
