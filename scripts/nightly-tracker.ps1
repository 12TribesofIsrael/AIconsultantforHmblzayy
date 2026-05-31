# Nightly Faith Walk tracker auto-update.
#
# Registered as a Windows Scheduled Task ("FaithWalk Nightly Tracker", daily 9:00 PM).
# Runs Half 1 of the daily tracker workflow only: title-driven location promotion +
# in-progress annotation + push to GitHub + sync to faithwalklive.com.
#
# Clips are NOT auto-attached (they're curated, and auto-picking risks attaching a
# clip to a sensitive/incident day). After the nightly run, attach the day's clip
# manually per CLAUDE.md "Standard daily tracker workflow" (Half 2).
#
# This machine (Owner) runs Node v20, which rejects --use-system-ca; cert trust comes
# from the NODE_EXTRA_CA_CERTS user env var, inherited by the scheduled task. We invoke
# `node scripts\tracker-from-title.js` directly because `npm run` fails here with
# "Could not determine Node.js install directory". See memory: node-tls-workaround.
#
# Run only on ONE machine — never register this on both Owner and Deskt (would cause
# cross-machine push conflicts). See memory: memory-index-crossmachine-drift.

$ErrorActionPreference = 'Continue'

$repo   = 'C:\Users\Owner\repos\AIconsultantforHmblzayy'
$logDir = 'C:\Users\Owner\.claude\logs'
$log    = Join-Path $logDir 'nightly-tracker.log'

if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }

Set-Location $repo

$stamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
Add-Content -Path $log -Value "`n===== $stamp  nightly tracker run ====="

# Merge stdout+stderr into the log. Under PowerShell 5.1 native stderr lines render
# as ErrorRecords via Out-String, which is fine for a log; $LASTEXITCODE still holds
# node's real exit code.
$output = & node "$repo\scripts\tracker-from-title.js" 2>&1 | Out-String
$code = $LASTEXITCODE

Add-Content -Path $log -Value $output
Add-Content -Path $log -Value "----- exit code: $code -----"

exit $code
