/**
 * Manual one-shot sync of checkpoints.json to the faithwalklive repo.
 * Useful when you've edited the consulting checkpoints by hand and want
 * to push the public site without running a full tracker update.
 */

const { syncToFaithWalkLive } = require('./lib/faithwalklive-sync');

const message = process.argv.slice(2).join(' ').trim() || 'Sync checkpoints from consulting repo';
syncToFaithWalkLive(message);
