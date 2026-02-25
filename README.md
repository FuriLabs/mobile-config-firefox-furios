# mobile-config-firefox

Mobile and privacy friendly configuration for current standard and extended
support releases of Firefox.

This does not replace a proper implementation in
[Firefox upstream](https://bugzilla.mozilla.org/show_bug.cgi?id=1579348)
*(interesting stuff happens in issues linked in "References")*.

## Matrix / IRC channel

* Matrix: `#mobile-config-firefox:postmarketos.org`
* IRC: `#mobile-config-firefox` at OFTC

## What this config does

* Adapt UI elements and "about:" pages to small screen sizes (when opened on
  small screen)
* Moves the UI chrome (address- and tab-bar) to the bottom
* Enable mobile gestures
* Show one tab to show the page title and add a tab counter
* Use the native file-picker through xdg-portals
* Privacy tweaks:
  * Disable search suggestions
  * Disable Firefox studies
  * Disable Telemetry
  * Set DuckDuckGo as default search engine, remove other search engines except
    for Wikipedia (only works in Firefox ESR, limitation of
    [policies.json](https://github.com/mozilla/policy-templates/blob/cab6a5076c1d8e5a1574637709c19b54bdbd669e/README.md#searchengines--remove))
  * Install [uBlock origin](https://github.com/gorhill/uBlock) by default
    ([why?](https://gitlab.postmarketos.org/postmarketOS/mobile-config-firefox/-/commit/160a1056c2cf35572157762f66174ea7c0b1db06))
* Uncluttering:
  * Disable built-in advertisements (e.g. hardcoded links for certain social
    media sites on the start page)
  * Disable "User Messaging" about new features etc.
  * Hide protections menu (the shield icon) in urlbar by default
  * Hide https in urlbar by default

There's a
[screenshot thread](https://fosstodon.org/web/@ollieparanoid/107394745970284867)
of the `3.0.0_rc1` release.

## Additional resources

* [How to use the Firefox Browser Toolbox](https://developer.mozilla.org/en-US/docs/Tools/Browser_Toolbox)
* [firefox-csshacks](https://github.com/MrOtherGuy/firefox-csshacks/)
* [fx-css-variables.txt](https://gist.github.com/MrOtherGuy/a673848c95823225f7b198199f87a396)
* [FirefoxCSS subreddit](https://www.reddit.com/r/FirefoxCSS/)
* [whattrainisitnow.com](https://whattrainisitnow.com/): FF and FF ESR releases
  currently supported upstream, we try to support these with this config
