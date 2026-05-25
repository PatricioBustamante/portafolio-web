#!/bin/bash
set -e

COMPONENTS="js/components/site-header.js js/components/site-footer.js js/projects-data.js js/components/project-card.js"

cat $COMPONENTS js/main.js > js/bundle.js
echo "bundle.js OK"

cat $COMPONENTS js/project-detail.js js/main.js > js/bundle-project.js
echo "bundle-project.js OK"
