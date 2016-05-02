# Developer Guide

This document will layout the OctoLinker architecture, so you have a better understanding of how the extension works.

# Overview

Every single file on GitHub.com is represented by a blob. Whenever the extension detects a blob it will pass it to the associated plugin.

The plugin will now tweak the page source and turn static strings into clickable links. The link must have at least a data attribute `data-resolver`. The `data-resolver` attribute defines which resolver will be called when a user clicks the link. Depending on the defined resolver the link must have additional attributes. For example the `relative-file` resolver requires a `data-target` attribute which is the actual value for this link e.g. `./lib/core.js`.

When a user clicks on a link, the associated resolver will be called with all defined data-attributes. The resolver returns an array of urls where every url is a possible location for this resource. For every url a HTTP HEAD request is made (to determine if the resource is available or not) until one was successful. Finally, a redirect will be invoked. That’s it.

As mentioned, the outline above is an extremely simplified version. In real life you have to deal with a lot of edge cases. If you are interested in some of these edge cases check out the `npm-manifest` plugin and the `javascriptUniversal` resolver.
