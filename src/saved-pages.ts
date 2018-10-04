import { SavedPage } from "./interfaces";

const savedPages: SavedPage[] = [
    {
        title: "Extension Analyzer - Compute",
        url:
            "https://extensionanalyzer.azurewebsites.net/extensions/Microsoft_Azure_Compute#deployments",
        tags: ["iaas", "extensionanalyzer", "compute"],
    },
    {
        title: "Extension Analyzer - Network",
        url:
            "https://extensionanalyzer.azurewebsites.net/extensions/Microsoft_Azure_Network#deployments",
        tags: ["iaas", "extensionanalyzer", "network"],
    },
    {
        title: "Extension Analyzer - Storage",
        url:
            "https://extensionanalyzer.azurewebsites.net/extensions/Microsoft_Azure_Storage#deployments",
        tags: ["iaas", "extensionanalyzer", "storage"],
    },
    {
        title: "IaaSExp AzDev",
        url:
            "https://msazure.visualstudio.com/DefaultCollection/One/_git/AzureUX-IaaSExp",
        tags: ["iaas", "azdev"],
    },
    {
        title: "IaaS Extensions - Sideload in Portal",
        url:
            "https://ms.portal.azure.com/?feature.canmodifyextensions=true&trace=diagnostics",
        tags: ["iaas", "sideload", "portal"],
    },
    {
        title: "IaaS Controller Deployments",
        url: "http://iaasexpinfo.azurewebsites.net/",
        tags: ["iaas", "controllers", "deployments"],
    },
    {
        title: "Portal - Prod",
        url: "https://portal.azure.com/?feature.customportal=false",
        tags: ["portal"],
    },
    {
        title: "IaaS Commit Tool",
        url: "https://commits.azurewebsites.net/",
        tags: ["iaas", "tools"],
    },
    {
        title: "AzDev Work Items",
        url: "https://msazure.visualstudio.com/DefaultCollection/One/_queries",
        tags: ["azdev", "workitems"],
    },
];

export default savedPages;
