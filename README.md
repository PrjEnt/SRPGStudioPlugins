# SRPG Studio Plugins


## Download
Pre-built scripts can be downloaded from [Release page](https://github.com/PrjEnt/SRPGStudioPlugins/releases/latest).


## Functions
| Script  | Summary |
| ------------- | ------------- |
| XPE_Support_4Characters | Allows 4 illustrations to be displayed at the same time |


## Proposal new plugins or report bugs
Please post to [Issues page](https://github.com/PrjEnt/SRPGStudioPlugins/issues)

> [!TIP]
> Paid support is required if you request the following:
> 
> - Customizing an existing plugin for your project
> - Requesting new plugins instead of proposing them



## Build
**Requirements:**
- MinPreprocessor
- XFramework (Legacy, ES3)
- XFramework.Async  (Legacy, ES3)
- XFramework.Event (Legacy, ES3)

```
./MinPreprocessor "!XPE_SRSFramework/!XPE_SRSFramework.js" "!XPE_SRSFramework.js"
./MinPreprocessor "XPE_Support_4Characters/XPE_Support_4Characters.js" "XPE_Support_4Characters.js" 
...
```
