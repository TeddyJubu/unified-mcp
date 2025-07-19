/**
 * Picks the most recently updated MCP from a list
 * 
 * This function compares the `last_updated` property of MCP objects
 * and returns the one with the most recent timestamp.
 * 
 * @param {Array} list - Array of MCP objects, each containing a last_updated ISO string
 * @returns {Object|null} The MCP object with the most recent last_updated timestamp, or null if list is empty
 * 
 * @example
 * const mcps = [
 *   { name: 'mcp1', last_updated: '2024-01-01T10:00:00.000Z' },
 *   { name: 'mcp2', last_updated: '2024-01-02T10:00:00.000Z' },
 *   { name: 'mcp3', last_updated: '2024-01-01T15:00:00.000Z' }
 * ];
 * const mostRecent = pickMostRecentMcp(mcps);
 * // Returns: { name: 'mcp2', last_updated: '2024-01-02T10:00:00.000Z' }
 */
function pickMostRecentMcp(list) {
  // Return null if list is empty or not an array
  if (!Array.isArray(list) || list.length === 0) {
    return null;
  }
  
  // Find the MCP with the most recent last_updated timestamp
  return list.reduce((mostRecent, current) => {
    // Handle cases where last_updated might be missing
    if (!current.last_updated) {
      return mostRecent;
    }
    
    if (!mostRecent.last_updated) {
      return current;
    }
    
    // Compare ISO strings - newer dates are greater than older ones
    return new Date(current.last_updated) > new Date(mostRecent.last_updated) 
      ? current 
      : mostRecent;
  });
}

module.exports = {
  pickMostRecentMcp
};
