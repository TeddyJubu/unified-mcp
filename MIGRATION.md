# Migration Notes

The original server list was stored in a file named `mcpconfig.json` in the MCP-Servers repository.

For this new **unified-mcp** repository we renamed the file to `config.json` to make the purpose clearer and less tied to historical naming.

Nothing else changed – the contents are identical. If you had scripts or workflows referencing `mcpconfig.json`, just update them to point to `config.json` instead.

