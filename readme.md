The || : part executes if the pm2 delete sets a non-zero return code (which happens when try to delete an app that does not exist yet). The : is a null operator that returns 0 success exit code. So whatever happens, the pm2 start line is executed.