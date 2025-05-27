Set-Location -Path "$PSScriptRoot"

while ($true) {
    git add -A

    git diff --cached --quiet
    if ($LASTEXITCODE -eq 0) {
        Start-Sleep -Seconds 5
        continue
    }

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Auto update $timestamp"
    git push origin main

    Start-Sleep -Seconds 5
}
