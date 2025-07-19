# Unified MCP

**Unified MCP** is a comprehensive toolkit for managing and interacting with [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers. It provides multiple interfaces including a command-line interface, VS Code extension, and Raycast integration.

## ✨ Features

- **🛠️ CLI Management**: Easy setup and configuration of MCP servers
- **🔧 VS Code Integration**: Test and interact with MCP endpoints directly from your editor  
- **⚡ Raycast Support**: Quick access to MCP queries from your launcher
- **🤖 Smart Selection**: Automatically pick the most recent MCP endpoint
- **📁 Unified Config**: Centralized configuration management in `~/.mcp/config.json`

## 🚀 Installation

Install the tool globally using npm:

```bash
npm install -g unified-mcp
```

This makes the `unified-mcp` command available system-wide.

## 📖 Usage

### Command Line Interface

The CLI provides two main commands for managing your MCP configuration:

#### Setup Command
Initialize your MCP configuration for the first time:

```bash
# Basic setup with default API ID
unified-mcp setup

# Setup with custom API ID  
unified-mcp setup --api your-custom-api-id
```

**What it does:**
- Creates the `~/.mcp` directory if it doesn't exist
- Copies the default configuration file to `~/.mcp/config.json`
- Sets up your environment for MCP server management

#### Update Command
Update your existing MCP configuration:

```bash
# Update with current settings
unified-mcp update

# Update with new API ID
unified-mcp update --api new-api-id
```

**What it does:**
- Updates your `~/.mcp/config.json` with the latest configuration
- Preserves your setup while applying new defaults
- Automatically runs setup if no configuration exists

#### Options
- `--api <api-id>`: Override the default API ID (default: `d1023c0f-8ff8-46c8-b237-4d2425734e22`)

### VS Code Extension

1. **Install the Extension**: Copy the `vscode-extension` folder to your VS Code extensions directory or install from source
2. **Open Command Palette**: Use `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)  
3. **Run Command**: Type "Unified MCP: Query" and select it
4. **Test Connection**: The extension will read your configuration and test MCP endpoints

### Raycast Integration

For Mac users with [Raycast](https://raycast.com/) installed:

1. **Copy Script**: Copy `raycast/unified-mcp.sh` to your Raycast scripts directory
2. **Run Query**: Use Raycast to search for "Unified MCP Query"
3. **Enter Query**: Type your query and press Enter
4. **View Results**: See the results directly in Raycast

## ⚙️ Configuration

The configuration file is stored at `~/.mcp/config.json` and defines available MCP servers:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/path/to/directory"]
    },
    "brave-search": {
      "command": "npx", 
      "args": ["@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-api-key"
      }
    },
    "toolbox": {
      "command": "npx",
      "args": [
        "-y",
        "@smithery/cli@latest", 
        "run",
        "@smithery/toolbox",
        "--key", "your-key",
        "--profile", "your-profile"
      ]
    }
  }
}
```

### Configuration Options

Each MCP server entry supports:
- **`command`**: The executable command (usually `npx`)
- **`args`**: Array of command-line arguments
- **`env`**: Environment variables (optional)

## 🛠️ Development

### Project Structure

```
unified-mcp/
├── bin/
│   └── unified-mcp           # CLI executable
├── src/
│   └── helpers.js           # Helper functions
├── vscode-extension/        # VS Code extension
├── raycast/
│   └── unified-mcp.sh       # Raycast script
├── config.json              # Default configuration
├── package.json
└── README.md
```

### Helper Functions

The project includes utility functions in `src/helpers.js`:

```javascript
const { pickMostRecentMcp } = require('unified-mcp/src/helpers');

// Select the most recently updated MCP from a list
const mostRecent = pickMostRecentMcp([
  { name: 'mcp1', last_updated: '2024-01-01T10:00:00.000Z' },
  { name: 'mcp2', last_updated: '2024-01-02T10:00:00.000Z' }
]);
```

### Running Tests

```bash
npm test
```

### Building from Source

```bash
git clone https://github.com/TeddyJubu/unified-mcp.git
cd unified-mcp
npm install
npm link  # Makes unified-mcp command available globally
```

## 🔗 Integration Examples

### Basic CLI Usage

```bash
# First time setup
unified-mcp setup

# Check your config
cat ~/.mcp/config.json

# Update when needed
unified-mcp update
```

### Programmatic Usage

```javascript
const { pickMostRecentMcp } = require('unified-mcp/src/helpers');

// Use in your applications
const selectedMcp = pickMostRecentMcp(availableMcps);
console.log(`Selected: ${selectedMcp.name}`);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test them
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature-name`  
6. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Repository**: [https://github.com/TeddyJubu/unified-mcp](https://github.com/TeddyJubu/unified-mcp)
- **Issues**: [https://github.com/TeddyJubu/unified-mcp/issues](https://github.com/TeddyJubu/unified-mcp/issues)
- **MCP Documentation**: [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)

## ❓ Troubleshooting

### Common Issues

**Command not found after installation**
```bash
# Try reinstalling globally
npm uninstall -g unified-mcp
npm install -g unified-mcp

# Or check your PATH includes npm global bins
npm config get prefix
```

**Config file not found**
```bash
# Run setup to create the config
unified-mcp setup

# Check if directory exists
ls -la ~/.mcp/
```

**Permission errors**
```bash  
# On macOS/Linux, you might need to fix npm permissions
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
```

**VS Code extension not working**
1. Ensure your config file exists: `~/.mcp/config.json`
2. Check the VS Code Developer Tools for error messages
3. Verify Node.js is installed and accessible

---

Made with ❤️ for the Model Context Protocol community
