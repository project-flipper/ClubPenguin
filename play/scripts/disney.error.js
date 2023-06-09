if (typeof Disney === "undefined") {
    var Disney = {}
}

Disney.Error = {
    init: function () {
        this.data = {
            reason: "",
            context: ""
        };
        $("#D_ER_ErrorBtn").mousedown(function (e) {
            var t = Disney.Error;
            t.stopEvent(e);
            t.onClick(this)
        })
    },
    setUserId: function (e) {
        if (e) {
        }
    },
    onClick: function () {
        $("#D_ER_ErrorSection").css("display", "none");
        window.location.reload()
    },
    centerMessage: function () {
        var e = $(window).height() / 2 - 110;
        if (e < 0) {
            e = 0
        }
        var t = $(window).width() / 2 - 177;
        if (t < 0) {
            t = 0
        }
        $("#D_ER_ErrorSection").css("top", e.toString() + "px").css("left", t.toString() + "px")
    },
    logEvent: function (e) {
        try {
        } catch (t) { }
    },
    stopEvent: function (e) {
        if (e.cancelable) {
            e.preventDefault()
        }
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation()
        }
    }
};

Disney.Error.ClientCrash = {
    IELT8: false,
    IEGT10: false,
    REASON: "Client crash",
    CONTEXT: "CLIENT_CRASH",
    init: function () {
        if ($.browser.msie && parseInt($.browser.version, 10) < 8) {
            this.IELT8 = true
        }
        try {
            if (!!navigator.userAgent.match(/Trident\/7\./)) {
                this.IEGT10 = true;
                return
            }
        } catch (e) { }
    },
    showCrashMessage: function () {
        Disney.Error.centerMessage();
        $("#D_ER_ErrorSection").show();
        Disney.Error.data.reason = Disney.Error.ClientCrash.REASON;
        Disney.Error.data.context = Disney.Error.ClientCrash.CONTEXT;
        Disney.Error.logEvent(Disney.Error.data)
    },
    isClientCrashed: function () {
        var e, t = false;
        try {
            if (this.IEGT10) {
                return false
            }
            if (!this.IELT8) {
                e = $('[type="application/x-shockwave-flash"]')[0]
            }
            if (!e) {
                e = $('[classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"]')[0];
                if (e) {
                    e = e.object;
                    if (e) {
                        e.SetVariable("isSwfWorking", "true");
                        if (e.GetVariable("isSwfWorking") !== "true") {
                            t = true
                        }
                    }
                }
            } else {
                if (!e.SetVariable) {
                    t = true
                }
            }
        } catch (n) {
            t = true
        }
        return t
    }
};
$(function () {
    Disney.Error.init();
    Disney.Error.ClientCrash.init()
})
