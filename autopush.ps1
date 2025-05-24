while ($true) {
    git add -A
    if (git diff --cached --quiet) {
        Start-Sleep -Seconds 5
        continue
    }
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto update $timestamp"
    git push origin main
    Start-Sleep -Seconds 5
}
