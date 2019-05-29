msiexec /i "%~dp0apache-couchdb-2.3.1.msi" /L*V "couch.log" TARGETDIR="%cd%"
msiexec /i "%~dp0Diksha-1.0.0.msi" /L*V "sunbird.log" TARGETDIR="%cd%"

REG ADD HKEY_CURRENT_USER\SOFTWARE\SunBird-Installer /v /f SUNBIRD_APP_WORKING_DIR /d "%cd%"