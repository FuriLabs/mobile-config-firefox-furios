/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// TODO:
// - Implement detection of UTF8 strings vs. chars
export class PrefManager {
  static pref(prefName, value) {
    try {
      var prefBranch = getPrefBranch();

      if (typeof value == "string") {
        if (gIsUTF8) {
          prefBranch.setStringPref(prefName, value);
          return;
        }
        prefBranch.setCharPref(prefName, value);
      } else if (typeof value == "number") {
        prefBranch.setIntPref(prefName, value);
      } else if (typeof value == "boolean") {
        prefBranch.setBoolPref(prefName, value);
      }
    } catch (e) {
      console.error(e);
    }
  }

  static defaultPref(prefName, value) {
    try {
      const prefBranch = Services.prefs.getDefaultBranch(null);
      if (typeof value == "string") {
        const gIsUTF8 = true;
        if (gIsUTF8) {
          prefBranch.setStringPref(prefName, value);
          return;
        }
        prefBranch.setCharPref(prefName, value);
      } else if (typeof value == "number") {
        prefBranch.setIntPref(prefName, value);
      } else if (typeof value == "boolean") {
        prefBranch.setBoolPref(prefName, value);
      }
    } catch (e) {
      console.error(e);
    }
  }

  static getPref(prefName) {
    try {
      var prefBranch = getPrefBranch();

      switch (prefBranch.getPrefType(prefName)) {
        case prefBranch.PREF_STRING:
          if (gIsUTF8) {
            return prefBranch.getStringPref(prefName);
          }
          return prefBranch.getCharPref(prefName);

        case prefBranch.PREF_INT:
          return prefBranch.getIntPref(prefName);

        case prefBranch.PREF_BOOL:
          return prefBranch.getBoolPref(prefName);
        default:
          return null;
      }
    } catch (e) {
      console.error(e);
    }
    return undefined;
  }
};
