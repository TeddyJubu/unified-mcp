const assert = require('assert');
const { test, describe, it } = require('node:test');
const { pickMostRecentMcp } = require('../src/helpers.js');

describe('pickMostRecentMcp', () => {
  it('should return null for an empty array', () => {
    assert.strictEqual(pickMostRecentMcp([]), null);
  });
  
  it('should return null if the list is not an array', () => {
    assert.strictEqual(pickMostRecentMcp(null), null);
    assert.strictEqual(pickMostRecentMcp(undefined), null);
  });

  it('should return the most recent MCP', () => {
    const mcps = [
      { name: 'mcp1', last_updated: '2024-01-01T10:00:00.000Z' },
      { name: 'mcp2', last_updated: '2024-01-02T10:00:00.000Z' },
      { name: 'mcp3', last_updated: '2024-01-01T15:00:00.000Z' }
    ];
    assert.deepStrictEqual(pickMostRecentMcp(mcps), { name: 'mcp2', last_updated: '2024-01-02T10:00:00.000Z' });
  });

  it('should handle missing last_updated field gracefully', () => {
    const mcps = [
      { name: 'mcp1' },
      { name: 'mcp2', last_updated: '2024-01-02T10:00:00.000Z' }
    ];
    assert.deepStrictEqual(pickMostRecentMcp(mcps), { name: 'mcp2', last_updated: '2024-01-02T10:00:00.000Z' });
  });

  it('should return single item when array has only one element', () => {
    const mcps = [{ name: 'single', last_updated: '2024-01-01T10:00:00.000Z' }];
    assert.deepStrictEqual(pickMostRecentMcp(mcps), { name: 'single', last_updated: '2024-01-01T10:00:00.000Z' });
  });

  it('should handle all items missing last_updated field', () => {
    const mcps = [
      { name: 'mcp1' },
      { name: 'mcp2' },
      { name: 'mcp3' }
    ];
    // Should return first item when all are missing timestamps
    assert.deepStrictEqual(pickMostRecentMcp(mcps), { name: 'mcp1' });
  });

  it('should handle invalid date strings', () => {
    const mcps = [
      { name: 'mcp1', last_updated: 'invalid-date' },
      { name: 'mcp2', last_updated: '2024-01-02T10:00:00.000Z' }
    ];
    // Invalid dates in comparison return false, so first item is kept
    assert.deepStrictEqual(pickMostRecentMcp(mcps), { name: 'mcp1', last_updated: 'invalid-date' });
  });

  it('should handle invalid date strings in second position', () => {
    const mcps = [
      { name: 'mcp1', last_updated: '2024-01-02T10:00:00.000Z' },
      { name: 'mcp2', last_updated: 'invalid-date' }
    ];
    // Valid date stays as the first item since invalid comparison returns false
    assert.deepStrictEqual(pickMostRecentMcp(mcps), { name: 'mcp1', last_updated: '2024-01-02T10:00:00.000Z' });
  });

  it('should handle identical timestamps', () => {
    const mcps = [
      { name: 'mcp1', last_updated: '2024-01-01T10:00:00.000Z' },
      { name: 'mcp2', last_updated: '2024-01-01T10:00:00.000Z' }
    ];
    // Should return the first one when timestamps are identical
    assert.deepStrictEqual(pickMostRecentMcp(mcps), { name: 'mcp1', last_updated: '2024-01-01T10:00:00.000Z' });
  });

  it('should handle different date formats correctly', () => {
    const mcps = [
      { name: 'mcp1', last_updated: '2024-01-01T10:00:00Z' }, // Without milliseconds
      { name: 'mcp2', last_updated: '2024-01-01T10:00:01.000Z' }, // 1 second later
      { name: 'mcp3', last_updated: '2024-01-01T09:59:59.999Z' } // Slightly earlier
    ];
    assert.deepStrictEqual(pickMostRecentMcp(mcps), { name: 'mcp2', last_updated: '2024-01-01T10:00:01.000Z' });
  });
});

