# Copyright 2023 Oliver Smith
# SPDX-License-Identifier: MPL-2.0

DESTDIR :=
FIREFOX_DIR := /usr/lib/firefox
FIREFOX_CONFIG_DIR := /etc/firefox

install:
	src/prepare_install.sh "$(FIREFOX_DIR)" "$(DESTDIR)"
	install -Dm644 src/policies.json \
		"$(DESTDIR)/$(FIREFOX_CONFIG_DIR)/policies/policies.json"
	install -Dm644 src/mobile-config-prefs.js \
		"$(DESTDIR)/$(FIREFOX_DIR)/defaults/pref/mobile-config-prefs.js"
	install -Dm644 src/mobile-config-autoconfig.js \
		"$(DESTDIR)/$(FIREFOX_DIR)/mobile-config-autoconfig.js"
	install -Dm644 src/modules/chrome.manifest \
		"$(DESTDIR)/etc/mobile-config-firefox/chrome.manifest"
	install -Dm644 src/modules/boot.sys.mjs \
		"$(DESTDIR)/etc/mobile-config-firefox/boot.sys.mjs"
	# PrefManager
	install -Dm644 src/modules/PrefManager.sys.mjs \
		"$(DESTDIR)/etc/mobile-config-firefox/PrefManager.sys.mjs"
	# UserAgentManager
	install -Dm644 src/modules/UserAgentManager.sys.mjs \
		"$(DESTDIR)/etc/mobile-config-firefox/UserAgentManager.sys.mjs"
	# StyleSheetManager
	install -Dm644 src/modules/StyleSheetManager.sys.mjs \
		"$(DESTDIR)/etc/mobile-config-firefox/StyleSheetManager.sys.mjs"
	install -Dm644 src/themes/main.css \
		"$(DESTDIR)/etc/mobile-config-firefox/themes/main.css"
	install -Dm644 src/themes/content/addons.css \
		"$(DESTDIR)/etc/mobile-config-firefox/themes/content/addons.css"
	# AboutMobile
	install -Dm644 src/modules/AboutMobile.sys.mjs \
		"$(DESTDIR)/etc/mobile-config-firefox/AboutMobile.sys.mjs"
	install -Dm644 src/modules/aboutmobile/index.html \
		"$(DESTDIR)/etc/mobile-config-firefox/aboutmobile/index.html"
	# Miscs
	install -Dm644 org.postmarketos.mobile_config_firefox.metainfo.xml \
		"$(DESTDIR)/usr/share/metainfo/org.postmarketos.mobile_config_firefox.metainfo.xml"

uninstall:
	src/prepare_uninstall.sh "$(FIREFOX_DIR)" "$(DESTDIR)"
	rm -fv "$(DESTDIR)/$(FIREFOX_CONFIG_DIR)/policies/policies.json"
	rm -fv "$(DESTDIR)/$(FIREFOX_DIR)/defaults/pref/mobile-config-prefs.js"
	rm -fv "$(DESTDIR)/$(FIREFOX_DIR)/mobile-config-autoconfig.js"
	rm -rfv "$(DESTDIR)/etc/mobile-config-firefox"
	rm -fv "$(DESTDIR)/usr/share/metainfo/org.postmarketos.mobile_config_firefox.metainfo.xml"


.PHONY: all clean install uninstall
