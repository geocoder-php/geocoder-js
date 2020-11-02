#!/bin/bash

rm -rf vendor webfonts &&
mkdir vendor webfonts &&
cp node_modules/bootswatch/dist/flatly/bootstrap.min.css vendor/flatly-bootstrap.min.css &&
cp node_modules/components-font-awesome/css/all.min.css vendor/font-awesome.min.css &&
cp node_modules/components-font-awesome/webfonts/* webfonts &&
cp node_modules/@highlightjs/cdn-assets/styles/dracula.min.css vendor/highlight-dracula.min.css &&
cp node_modules/jquery/dist/jquery.min.js vendor/jquery.min.js &&
cp node_modules/bootstrap/dist/js/bootstrap.min.js vendor/bootstrap.min.js &&
cp node_modules/@highlightjs/cdn-assets/highlight.min.js vendor/highlight.min.js &&
rm -rf node_modules &&
rm -f package-lock.json yarn.lock
