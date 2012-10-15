/*************************************************************************
*
* ADOBE CONFIDENTIAL
* ___________________
*
*  Copyright 2012 Adobe Systems Incorporated
*  All Rights Reserved.
*
* NOTICE:  All information contained herein is, and remains
* the property of Adobe Systems Incorporated and its suppliers,
* if any.  The intellectual and technical concepts contained
* herein are proprietary to Adobe Systems Incorporated and its
* suppliers and are protected by trade secret or copyright law.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe Systems Incorporated.
**************************************************************************/

/**
 * @class CQ.form.rte.commands.Format
 * @extends CQ.form.rte.commands.Command
 * @private
 */
CQ.form.rte.commands.Format = new Class({

    toString: "Format",

    extend: CQ.form.rte.commands.Command,

    isCommand: function(cmdStr) {
        return (cmdStr.toLowerCase() == "format");
    },

    getProcessingOptions: function() {
        var cmd = CQ.form.rte.commands.Command;
        return cmd.PO_BOOKMARK | cmd.PO_SELECTION;
    },

    execute: function(execDef) {
        var dpr = CQ.form.rte.DomProcessor;
        var com = CQ.form.rte.Common;
        var dom;
        var selection = execDef.selection;
        var context = execDef.editContext;
        var containerList = dpr.createContainerList(context, selection);
        if (containerList.length == 0) {
            var nodeList = execDef.nodeList;
            if (!nodeList) {
                nodeList = dpr.createNodeList(context, selection);
            }
            var auxRoot = com.getTagInPath(context, nodeList.commonAncestor,
                    dpr.AUXILIARY_ROOT_TAGS);
            if (auxRoot) {
                dom = dpr.createNode(execDef.editContext, execDef.value.tag);
                com.moveChildren(auxRoot, dom);
                auxRoot.appendChild(dom);
            }
        } else {
            dom = dpr.createNode(execDef.editContext, execDef.value.tag);
            dpr.changeContainerTag(execDef.editContext, containerList, dom, true);
        }
    },

    queryState: function(selectionDef, cmd) {
        // todo find a meaningful implementation -> list of container tags?
        return false;
    }

});


// register command
CQ.form.rte.commands.CommandRegistry.register("format", CQ.form.rte.commands.Format);