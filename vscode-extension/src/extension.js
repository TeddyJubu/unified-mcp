const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const os = require('os');
const axios = require('axios');

// Import helper functions from the parent project
const helpers = require('../../src/helpers');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Unified MCP extension is now active');

    // Register the "Unified MCP: Query" command
    let disposable = vscode.commands.registerCommand('unified-mcp.query', async function () {
        try {
            // Read MCP configuration from ~/.mcp/config.json
            const configPath = path.join(os.homedir(), '.mcp', 'config.json');
            
            if (!fs.existsSync(configPath)) {
                vscode.window.showErrorMessage('MCP config file not found at ~/.mcp/config.json');
                return;
            }

            const configData = fs.readFileSync(configPath, 'utf8');
            const config = JSON.parse(configData);

            // Use helper to choose endpoint
            const endpoint = await helpers.chooseEndpoint(config);
            
            if (!endpoint) {
                vscode.window.showWarningMessage('No endpoint selected');
                return;
            }

            // Perform a test GET request
            const testUrl = `${endpoint.url}/health`; // Assuming a health endpoint
            
            vscode.window.showInformationMessage(`Testing connection to ${endpoint.name}...`);
            
            const response = await axios.get(testUrl, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json',
                    // Add any auth headers from endpoint config if needed
                    ...(endpoint.headers || {})
                }
            });

            // Show result with vscode.window.showInformationMessage
            const result = {
                status: response.status,
                statusText: response.statusText,
                data: response.data,
                endpoint: endpoint.name
            };

            vscode.window.showInformationMessage(
                `✅ MCP Query Success: ${endpoint.name} (${response.status} ${response.statusText})`
            );

            // Also show detailed result in output channel
            const outputChannel = vscode.window.createOutputChannel('Unified MCP');
            outputChannel.appendLine('=== MCP Query Result ===');
            outputChannel.appendLine(`Endpoint: ${endpoint.name}`);
            outputChannel.appendLine(`URL: ${testUrl}`);
            outputChannel.appendLine(`Status: ${response.status} ${response.statusText}`);
            outputChannel.appendLine(`Response: ${JSON.stringify(response.data, null, 2)}`);
            outputChannel.appendLine('========================');
            outputChannel.show();

        } catch (error) {
            console.error('MCP Query failed:', error);
            
            let errorMessage = 'MCP Query failed: ';
            if (error.code === 'ENOENT') {
                errorMessage += 'Config file not found';
            } else if (error.code === 'ECONNREFUSED') {
                errorMessage += 'Connection refused - check if MCP server is running';
            } else if (error.response) {
                errorMessage += `HTTP ${error.response.status} ${error.response.statusText}`;
            } else if (error.request) {
                errorMessage += 'No response received from server';
            } else {
                errorMessage += error.message;
            }
            
            vscode.window.showErrorMessage(errorMessage);
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
