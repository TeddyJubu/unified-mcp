# Unified MCP Extension

A VS Code extension for unified MCP (Model Context Protocol) interactions.

## Features

- **Unified MCP: Query** - Test connections to MCP endpoints configured in `~/.mcp/config.json`
- Automatic endpoint selection using helper functions
- HTTP GET request testing with detailed results
- Error handling and user feedback

## Usage

1. Ensure you have MCP endpoints configured in `~/.mcp/config.json`
2. Open VS Code Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`)
3. Run "Unified MCP: Query"
4. The extension will:
   - Read your MCP configuration
   - Let you choose an endpoint using the helper function
   - Perform a test GET request
   - Display the results

## Requirements

- VS Code 1.74.0 or higher
- MCP configuration file at `~/.mcp/config.json`
- Node.js and npm for development

## Extension Settings

This extension contributes the following commands:

* `unified-mcp.query`: Test MCP endpoint connections

## Development

To run this extension in development mode:

1. Open this folder in VS Code
2. Press `F5` to run the extension in a new Extension Development Host window
3. Test the "Unified MCP: Query" command

## Release Notes

### 0.0.1

Initial release with basic MCP query functionality.
