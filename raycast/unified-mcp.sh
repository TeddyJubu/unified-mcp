#!/usr/bin/env bash

# Raycast Script Command Template
#
# Dependency: This script requires Node.js and npx to be installed
# Install Node.js: https://nodejs.org/
#
# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Unified MCP Query
# @raycast.mode compact
# @raycast.packageName unified-mcp
# @raycast.description Query unified MCP servers using npx unified-mcp
# @raycast.author teddyburtonburger
# @raycast.authorURL https://github.com/teddyburtonburger
# @raycast.needsConfirmation false
# @raycast.icon 🔧
# @raycast.argument1 { "type": "text", "placeholder": "Query", "optional": false }

npx unified-mcp query "$@" | tee
