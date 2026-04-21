/**
 * Manual one-shot sync of book/source-material/ to the faithwalkbook repo.
 * Run after updating timelines or adding new source material in this repo.
 */

const { syncToBookRepo } = require('./lib/book-sync');

const message = process.argv.slice(2).join(' ').trim() || 'Sync source material from consulting repo';
syncToBookRepo(message);
