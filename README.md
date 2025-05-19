https://candy-feta-cc6.notion.site/E2E-test-f88fc498dd434b1dbae0f9e11a0fd9e8?pvs=4


cp: cannot stat '/Windows/System32/drivers/etc/hosts': No such file or directory
테스트 IP 210.96.164.68 (1/3)
Set-Content : The process cannot access the file 'C:\Windows\System32\drivers\etc\hosts' because it is being used by an
other process.
At line:1 char:105
+ ... estment\.com.*', '' | Set-Content /Windows/System32/drivers/etc/hosts
+                           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : WriteError: (C:\Windows\System32\drivers\etc\hosts:String) [Set-Content], IOException
    + FullyQualifiedErrorId : GetContentWriterIOError,Microsoft.PowerShell.Commands.SetContentCommand

run_tests.sh: line 40: /Windows/System32/drivers/etc/hosts: No such file or directory

