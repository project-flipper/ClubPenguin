import * as CP from "@clubpenguin/club_penguin";
import $ from "jquery";
import { DisneyClubPenguin } from "./club_penguin";
import { DisneyFriends, FriendsAPI, FriendsEvent, Jump, FriendsPresence, Settings, RosterItem } from "./friends";
import { DisneySocial, Data as SocialData, Environment, SocialEvent, EventAbstract, CharactersData } from "./social";

export interface UIFriend { 
    type: "BF_" | "BC_" | "C_" | "F_";
    Id: string;
    name: string;
    safeChatName: string,
    weight: number,
    status: string,
    worldID: string,
    roomID: number,
    mobile: boolean;
    cache: {};
}

export class UIEvent {
    static FRIENDS_COUNT: string = "friendsCount";
    static PENDINGS_UPDATED: string = "pendingsUpdated";
    static PENDING_ACCEPTED: string = "pendingAccepted";
    static PENDING_REJECTED: string = "pendingRejected";
    static PENDING_REMOVED: string = "pendingRemoved";
    static SUBPANEL_TOGGLED: string = "subpanelToggled";
    private static eventManager: EventAbstract;

    static init(): void {
        this.eventManager = new EventAbstract();
    }

    static addListener(event: string, listener: Function): void {
        this.eventManager.addListener(event, listener);
    }

    static removeListener(event: string, listener: Function): void {
        this.eventManager.removeListener(event, listener);
    }

    static updateListeners(...args: any[]): void {
        this.eventManager.updateListeners.apply(this.eventManager, args);
    }
}

export class Images {
    static implicit = {
        u: "images/D_F_implicit.gif",
        d: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAtJREFUCB1j+M8AAAIBAQDFXxteAAAAAElFTkSuQmCC"
    };
    static queue: { i: string; e: JQuery.Selector | HTMLElement | JQuery }[] = [];
    static isSet: boolean = false;

    static init(): boolean {
        const i = this;

        if (this.isSet || !UIData.images || !FriendsUI.gotLayout) return false;

        $(".D_F img").each(function () {
            const desc = $(this).prop("longdesc");
            if (desc && !$(this).hasClass("D_F_FriendAvatar")) {
                i.setAttrs(this, desc, true);
            }
        });

        if (DisneySocial.ieVer > 0 && DisneySocial.ieVer < 8) {
            if ('preloadCssImages' in $ && typeof $.preloadCssImages == 'function') $.preloadCssImages();
            this.preloadAll();
        }

        i.processQueue();
        i.isSet = true;
        return true;
    }

    static setImplicit(): boolean {
        if (UIData.images) return false;

        const n = this;
        $(".D_F img").each(function () {
            let desc = $(this).prop("longdesc");
            let alt = $(this).prop("alt");

            if (desc && !alt) {
                alt = n.implicit.d;
                if (DisneySocial.ieVer > 0 && DisneySocial.ieVer < 8) {
                    alt = DisneySocial.getUrl(n.implicit.u, true);
                }
                $(this).prop("src", alt);

                if (!UIData.images) {
                    n.queue.push({ i: desc, e: this });
                }
            }
        });

        return true;
    }

    static processQueue(): void {
        const i = this;
        while (i.queue.length > 0) {
            const item = i.queue.shift();
            if (item) {
                i.setAttrs(item.e, item.i, false);
            }
        }
    }

    static getSrcById(id: string): string {
        const n = UIData;
        let src = "";

        if (n.images.hasOwnProperty(id)) {
            let imgUrl = n.images[id].u;
            if (DisneySocial.ieVer > 0 && DisneySocial.ieVer < 8) {
                src = DisneySocial.getUrl(imgUrl, true);
            } else {
                const ext = imgUrl.substring(imgUrl.lastIndexOf(".") + 1);
                if (ext) {
                    src = `data:image/${ext};base64,${n.images[id].d}`;
                }
            }
        } else {
            src = DisneySocial.getUrl(this.implicit.u, true);
        }

        return src;
    }

    static getHWbyId(id: string): number[] {
        const n = UIData;
        return n.images.hasOwnProperty(id) ? [n.images[id].h, n.images[id].w] : [];
    }

    static setAttrs(e: JQuery.Selector | HTMLElement | JQuery, id: string, addToQueue?: boolean): boolean {
        if (!e || !id) return false;

        const t = this;
        if (!UIData.images) {
            if (addToQueue) {
                t.queue.push({ i: id, e: e });
            }
            return false;
        }

        t.setHW(e, id);
        t.setSrc(e, id);
        return true;
    }

    static setSrc(e: JQuery.Selector | HTMLElement | JQuery, id: string): boolean {
        if (!e || !id) return false;
        $(e as JQuery.Selector).prop("src", this.getSrcById(id));
        return true;
    }

    static setHW(e: JQuery.Selector | HTMLElement | JQuery, id: string): boolean {
        if (!e || !id) return false;

        const n = this.getHWbyId(id);
        if (n && n.length == 2) {
            $(e as JQuery.Selector).prop("width", n[1]).prop("height", n[0]);
        }

        return true;
    }

    static preloadAll(): void {
        const i = UIData;
        for (const e in i.images) {
            if (i.images.hasOwnProperty(e)) {
                this.loadImage(DisneySocial.getUrl(i.images[e].u, true));
            }
        }
    }

    static loadImage(src: string): void {
        const img = new Image();
        img.onerror = function () {
            $(this).off("error").prop("src", DisneySocial.getUrl(this.implicit.u, true));
        };
        img.src = src;
    }

    static getAvatarCache(swid: string, size: string): boolean {
        let n = false;
        const data = $("#D_F_FriendsPanel").data(swid);
        if (data && data.cache && data.cache[size]) {
            n = data.cache[size];
        }
        return n;
    }

    static setAvatarCache(swid: string, size: string, n: boolean): boolean {
        if (!swid || !size) return false;

        const data = $("#D_F_FriendsPanel").data(swid);
        if (data) {
            if (!data.cache) {
                data.cache = {};
            }
            data.cache[size] = n;
        }

        return true;
    }
    static preloadAvatars(): void {
        const maxAvatarsToPreload = 36;
        const friendsList = UIFriends.arrAllFriends;
        let startIndex = UIFriends.getIndexAllFriends();
        const totalFriends = friendsList.length;

        if (startIndex > totalFriends) startIndex = totalFriends - 1;
        startIndex = Math.max(startIndex - 9, 0);
        const endIndex = Math.min(startIndex + maxAvatarsToPreload, totalFriends);

        for (let i = startIndex; i < endIndex; i++) {
            const friendId = friendsList[i];
            if (friendId && friendId !== "null" && !friendId.startsWith("character_") && !this.getAvatarCache(friendId, "88")) {
                const avatarUrl = Environment.getAvatarUrl(friendId, {
                    size: 88,
                    language: DisneySocial.getPageLang(),
                    photo: true,
                    bypassPlayerSettingCache: false
                });
                Images.preloadAvatar(avatarUrl);
                break;
            }
        }
    }

    static preloadAvatar(e: string): void {
        const img = new Image();
        img.onload = function (this: HTMLImageElement) {
            const src = this.src;
            const s = src.lastIndexOf("%7B") + 3;
            const r = Images;
            let e, i, t;

            if (s > 0) {
                t = src.indexOf("%7D", s);
                if (t > s) {
                    e = "{" + src.substring(s, t) + "}";
                }
            }

            const params = src.slice(src.indexOf("?") + 1).split("&");
            for (let param of params) {
                const [key, value] = param.split("=");
                if (key == "size") {
                    i = value;
                }
            }

            if (e && i) {
                r.setAvatarCache(e, i, true);
                r.preloadAvatars();
            }
        };
        img.src = e;
    }

    static checkValidAvatar(e: JQuery.Selector | HTMLElement | JQuery, i: string, n: number): void {
        const t = n < 88 ? "14" : "18";
        const self = this;
        $(e as JQuery.Selector)
            .off("load")
            .off("error")
            .prop("longdesc", t)
            .on('error', function () {
                if (DisneySocial.ieVer < 9) {
                    $(this).off("error");
                    const desc = $(this).prop("longdesc");
                    self.setAttrs(this, desc, false);
                }
            })
            .on('load', function () {
                if (DisneySocial.ieVer < 9) {
                    $(this).off('load');
                }
            })
            .prop("src", i);
    }
}

export class HudNotification {
    static SLIDE_TIME: number = 500;
    static CHARACTER_ONLINE: string = "CO";
    static CHARACTER_INVITE: string = "CI";
    static FRIEND_ACCEPTANCE: string = "FA";
    static FRIEND_REQUEST: string = "FR";
    static JUMP_AVAILABLE: string = "FJ";
    static FRIEND_ONLINE: string = "FO";
    static crtSwid: string | null = null;
    static crtNotifyType: string | null = null;
    static characterPresences: Record<string, any> = {};
    static timeStarted: number | null = null;
    static crtArray: any[] | null = null;
    static crtSplice: number = 0;
    static requestCount: number = 1;
    static notifyTypes: string[] = [];
    static notifyArrays: any[][] = [];
    static hudVisible: boolean = false;
    static hidding: boolean = false;
    static timeout: ReturnType<typeof setTimeout> | undefined;
    static accumulateTimeout: ReturnType<typeof setTimeout> | undefined;

    static init(): void {
        const n = FriendsEvent;
        const t = UIEvent;

        this.notifyTypes = [
            this.CHARACTER_ONLINE,
            this.CHARACTER_INVITE,
            this.FRIEND_ACCEPTANCE,
            this.JUMP_AVAILABLE,
            this.FRIEND_ONLINE,
            this.FRIEND_REQUEST
        ];

        this.notifyArrays = this.notifyTypes.map(() => []);

        FriendsUI.frameIt("D_F_HudNotifBubble", "D_F_Box25Template", 190, 30, "2");

        n.addListener(n.HUD_UPDATE, this.hudUpdate.bind(this));
        n.addListener(n.FRIENDS_JUMP_AVAILABLE, this.notifyJump.bind(this));
        n.addListener(n.CHARACTER_INVITE, this.notifyInvite.bind(this));
        t.addListener(t.PENDINGS_UPDATED, this.pendingsUpdated.bind(this));
        t.addListener(t.PENDING_ACCEPTED, this.clearRequest.bind(this));
        t.addListener(t.PENDING_REJECTED, this.clearRequest.bind(this));

        $("#D_F_HudNotifClose").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            this.close();
        });

        $("#D_F_HudNotifBubble").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            this.notificationClick();
        });

        $("#D_F_HudNotification").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            this.bindMouseLeave();
        });

        this.bindClickAvatar();
        this.bindClickAccept();
        this.bindClickReject();
    }

    static hudUpdate(e: boolean): void {
        this.hudVisible = e;
        if (e) {
            this.rescan();
        } else {
            this.crtArray = null;
            this.crtSplice = 0;
            this.close();
        }
    }

    static pendingsUpdated(e: { name: string; swid: string }): void {
        this.notify(e.name, this.FRIEND_REQUEST, e.swid);
    }

    static notifyJump(e: string): boolean {
        if (!e || !$("#D_F_FriendsPanel").data(e)) return false;

        const name = $("#D_F_FriendsPanel").data(e).name;
        const roomId = $("#D_F_FriendsPanel").data(e).roomId;

        if (!name || !roomId) return false;

        this.notify(name, this.JUMP_AVAILABLE, e);
        ContextNotification.hide();
        UIFriends.meUpdate();
        return true;
    }

    static notifyInvite(e: string): boolean {
        const id = parseInt(e, 10);
        if (!SocialData.mascots || !SocialData.mascots[id]) return false;

        const swid = "character_" + id;
        const name = SocialData.mascots[id].name;
        this.notify(name, this.CHARACTER_INVITE, swid);
        return true;
    }

    static reposition(): void {
        const position = DisneyClubPenguin.getNotifyPosition();
        const height = $("#D_F_HudNotification").height()!;
        $("#D_F_HudNotification").css("top", `${position.top - height}px`);
        $("#D_F_HudNotification").css("left", `${position.left - 83}px`);
    }

    static bindClickAvatar(): void {
        $("#D_F_HudNotifCard").off("mousedown").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            const swid = this.crtSwid;
            if (typeof swid == "string") {
                FriendsUI.showPlayerCard(swid);
            } else {
                this.notificationClick();
            }
        });
    }

    static bindClickAccept(): void {
        $("#D_F_HudNotifBtnY").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            const swid = this.crtSwid;
            this.close();
            Pending.accept(swid);
        });
    }

    static bindClickReject(): void {
        $("#D_F_HudNotifBtnN").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            const swid = this.crtSwid;
            this.close();
            Pending.reject(swid);
        });
    }

    static bindMouseLeave(): void {
        let self = this;
        this.clearTimer();
        $("#D_F_HudNotification")
            .off("mouseleave")
            .on("mouseleave", function (e) {
                $(this).off("mouseleave");
                DisneySocial.stopEvent(e);
                if (self.hidding) return false;
                self.clearTimer();
                self.slidedUp();
            });
    }

    static notificationClick(): void {
        FriendsUI.showFriendsSection();
    }

    static deQueue(): void {
        if (this.crtArray && this.crtSplice) {
            this.crtArray.splice(0, this.crtSplice);
            this.crtArray = null;
            this.crtSplice = 0;
        }

        for (let e = 0; e < this.notifyTypes.length; e++) {
            const notifyType = this.notifyTypes[e];
            const notifyArray = this.notifyArrays[e];
            const length = notifyArray.length;

            if (length > 0) {
                const swid = notifyArray[0].s;
                const name = notifyArray[0].n;
                const presence = notifyArray[0].p;

                let count = 1;
                if (notifyType == this.CHARACTER_ONLINE || notifyType == this.CHARACTER_INVITE) {
                    count = 1;
                } else if (length > 1) {
                    count = length;
                }

                if (name && notifyType && presence) {
                    if (notifyType == this.FRIEND_REQUEST) {
                        if (this.accumulateTimeout) clearTimeout(this.accumulateTimeout);
                        if (count > this.requestCount) {
                            this.requestCount = count;
                            this.accumulateTimeout = setTimeout(() => {
                                this.rescan();
                            }, FriendsUI.delay);
                            return;
                        }
                        this.requestCount = 1;
                    }

                    this.crtArray = notifyArray;
                    this.crtSplice = count;
                    setTimeout(() => {
                        this.show(name, notifyType, presence, swid);
                    }, 50);
                    return;
                }
            }
        }
    }

    static show(e: string, i: string, n: string | number, t: any): void {
        this.timeStarted = new Date().getTime();
        FriendsAPI.showingNotification();
        this.crtSwid = null;
        this.crtNotifyType = i;
        this.reposition();

        let s: string;
        let r: JQuery<HTMLElement>;
        let d: JQuery<HTMLElement>;
        const o = typeof n !== "string";

        $(".D_F_HudNotifBubble_BoxW").css("width", "190px");
        $("#D_F_HudNotifLine2").show();
        $("#D_F_HudNotifJump").css("display", "none").siblings("input[type=hidden]").val(n);
        d = $("#D_F_HudNotifLine1");
        r = $("#D_F_HudNotifLine2");
        $("#D_F_HudNotifBtns").css("display", "none");

        if (i == this.CHARACTER_ONLINE || i == this.CHARACTER_INVITE) {
            FriendsUI.getAvatarUriBySwid("#D_F_HudNotifAvatar", n as string, 60, false);
            s = FriendsUI.setText("D4");
            if (DisneyFriends.activeUser.isPreActivated) {
                $("#D_F_HudNotifBtns").remove();
            } else if (i == this.CHARACTER_INVITE) {
                $("#D_F_HudNotifBtns").show();
            }
        } else if (typeof n == "string") {
            FriendsUI.getAvatarUriBySwid("#D_F_HudNotifAvatar", n, 60, false);
            this.crtSwid = n;
            switch (i) {
                case this.FRIEND_ACCEPTANCE:
                    $("#D_F_HudNotifBtnY").css("zoom", "").hide();
                    $("#D_F_HudNotifBtnN").css("zoom", "").hide();
                    s = FriendsUI.setText("D8").replace("{0}", e);
                    d = $("#D_F_HudNotifLine2").css("display", "none");
                    r = $("#D_F_HudNotifLine1");
                    break;
                case this.FRIEND_REQUEST:
                    s = FriendsUI.setText("D6");
                    break;
                case this.JUMP_AVAILABLE:
                    s = FriendsUI.setText("D2");
                    break;
                case this.FRIEND_ONLINE:
                    s = FriendsUI.setText("D25");
                    break;
            }
            if (DisneyFriends.activeUser.isPreActivated) {
                $("#D_F_HudNotifBtns").remove();
            } else {
                $("#D_F_HudNotifBtns").show();
            }
        } else {
            Images.setAttrs("#D_F_HudNotifAvatar", "14", false);
            switch (i) {
                case this.FRIEND_ACCEPTANCE:
                    s = FriendsUI.setText("D12").replace("{0}", e);
                    d = $("#D_F_HudNotifLine2").css("display", "none");
                    r = $("#D_F_HudNotifLine1");
                    break;
                case this.FRIEND_REQUEST:
                    s = FriendsUI.setText("D5").replace("{0}", e);
                    d = $("#D_F_HudNotifLine2").css("display", "none");
                    r = $("#D_F_HudNotifLine1");
                    break;
                case this.JUMP_AVAILABLE:
                    e += " " + FriendsUI.setText("D9");
                    s = FriendsUI.setText("D1");
                    break;
                case this.FRIEND_ONLINE:
                    e += " " + FriendsUI.setText("D9");
                    s = FriendsUI.setText("D3");
                    break;
            }
        }

        d.empty().text(e).css("font-weight", "bold");
        r.empty().text(s).css("font-weight", "normal");

        const presenceElement = $("#D_F_HudNotification .D_F_FriendPresence");
        if (i == this.FRIEND_ONLINE && t && !o) {
            presenceElement.text(t.mobile ? FriendsUI.setText("D24") : FriendsUI.setText("D23")).show();
        } else {
            presenceElement.hide();
        }

        $("#D_F_HudNotifBtnY").css("display", "none").css("zoom", "");
        $("#D_F_HudNotifBtnN").css("display", "none").css("zoom", "");

        if (i == this.FRIEND_REQUEST && !o) {
            if (DisneySocial.ieVer > 0 && DisneySocial.ieVer < 8) {
                $("#D_F_HudNotifBtnY").css("zoom", "1").css("display", "inline");
                $("#D_F_HudNotifBtnN").css("zoom", "1").css("display", "inline");
            } else {
                $("#D_F_HudNotifBtnY").css("display", "inline-block");
                $("#D_F_HudNotifBtnN").css("display", "inline-block");
            }
        }

        if ($("#D_F_FriendSection").css("display") == "none") {
            FriendsAPI.pollJumpStatus(true);
        }

        $("#D_F_HudNotification").show();
        $("#D_F_HudNotifBtnY").width();
        $("#D_F_HudNotifBtnN").width();
        this.reStyleBubble();
        $("#D_F_HudNotifBubble").stop(true, false).css("top", "124px").animate({
            top: "-=99"
        }, this.SLIDE_TIME, this.slidedUp);
    }

    static reStyleBubble(): boolean {
        if ($("#D_F_HudNotification").css("display") == "none") return false;

        $("#D_F_HudNotifMessage").css("top", ((30 - $("#D_F_HudNotifMessage").height() - $("#D_F_HudNotifBtns").height()) / 2).toString() + "px");
        $("#D_F_HudNotifBtns").css("top", (parseInt($("#D_F_HudNotifMessage").css("top"), 10) + $("#D_F_HudNotifMessage").height() + 2).toString() + "px");

        if ($("#D_F_HudNotifBtnJ").css("display") == "none") {
            $("#D_F_HudNotifRoom").css("text-align", "left").css("left", "0px").css("color", "gray");
        } else {
            $("#D_F_HudNotifRoom").css("left", "5px").css("text-align", "center");
        }

        let e = 0;
        if ($("#D_F_HudNotifLine1").css("display") !== "none") {
            e = Math.max(e, $("#D_F_HudNotifLine1").width());
        }
        if ($("#D_F_HudNotifLine2").css("display") !== "none") {
            e = Math.max(e, $("#D_F_HudNotifLine2").width());
        }
        if ($("#D_F_HudNotifBtnJ").css("display") !== "none") {
            e = Math.max(e, $("#D_F_HudNotifBtnJ").width());
        }
        if ($("#D_F_HudNotifRoom").css("display") !== "none") {
            e = Math.max(e, $("#D_F_HudNotifRoom").width());
        }
        if ($("#D_F_HudNotifBtnY").css("display") !== "none" && $("#D_F_HudNotifBtnN").css("display") !== "none") {
            const i = $("#D_F_HudNotifBtnY").width() + $("#D_F_HudNotifBtnN").width();
            e = Math.max(e, i);
        }

        e = Math.min(Math.max(e, 60), 151);
        $(".D_F_HudNotifBubble_BoxW").css("width", (60 + e).toString() + "px");

        return true;
    }

    static slidedUp(): void {
        let i = FriendsUI.delay;

        if (this.timeStarted) {
            let n = new Date().getTime() - this.timeStarted;
            n = Math.min(n, i - 20);
            i -= n;
        }

        this.timeout = setTimeout(() => {
            this.hide();
        }, i);
    }

    static hide(): void {
        this.hidding = true;
        $("#D_F_HudNotification").off("mouseleave");
        $("#D_F_HudNotifBubble").stop(true, false).css("top", "26px").animate({
            top: "+=99"
        }, this.SLIDE_TIME, this.slidedDown);
    }

    static slidedDown(): void {
        $("#D_F_HudNotification").hide();
        this.hidding = false;

        if ($("#D_F_FriendSection").css("display") == "none") {
            FriendsAPI.pollJumpStatus(false);
        }

        FriendsUI.delay = FriendsUI.DELAY_NORMAL;
        if (!FriendsUI.notificationAware && DisneyFriends.activeUser) {
            let settings = DisneyFriends.activeUser.settings;
            if (!settings.getSetting(Settings.Constants.NOTIFICATION_AWARE)) {
                settings.addSetting(Settings.Constants.NOTIFICATION_AWARE, "true");
            }
        }

        this.timeStarted = null;
        FriendsAPI.closedNotification();
        this.rescan();
    }

    static clearTimer(): void {
        if (typeof this.timeout == "number") {
            clearTimeout(this.timeout);
        }
    }

    static close(): void {
        this.clearTimer();
        $("#D_F_HudNotification").off("mouseleave");
        $("#D_F_HudNotifBubble").stop(true, false);
        $("#D_F_HudNotification").hide();
        $("#D_F_HudNotifBubble").css("top", "124px");
        this.timeStarted = null;
        FriendsAPI.closedNotification();
        this.rescan();
    }

    static rescan(): boolean {
        if (!this.hudVisible || this.timeStarted) return false;
        this.deQueue();
        return true;
    }

    static clearRequest(e: string): boolean {
        if (!e) return false;

        const i = this.notifyTypes.indexOf(this.FRIEND_REQUEST);
        let s = -1;
        const t = this.notifyArrays[i];
        const n = t.length;

        for (let j = 0; j < n; j++) {
            if (t[j].s == e) {
                s = j;
                break;
            }
        }

        if (s > -1) {
            t.splice(s, 1);
        }

        if (e == this.crtSwid && this.crtNotifyType == this.FRIEND_REQUEST) {
            this.close();
        }

        return true;
    }

    static notify(e: string, i: string, n: string, t?: any): boolean {
        if (!e || !i || !n) return false;

        const s = this.notifyTypes.indexOf(i);
        if (s < 0) return false;

        const a = this.notifyArrays[s];
        const l = a.length;

        for (let j = 0; j < l; j++) {
            if (a[j].s == n) return false;
        }

        a.push({ s: n, n: e, p: t });
        this.rescan();
        return true;
    }
}

export class ContextNotification {
    static bestHintShown: boolean = false;
    static queue: string[] = [];
    static timeout: ReturnType<typeof setTimeout> | undefined;
    static delay: number;
    static active: boolean;

    static init(): void {
        FriendsUI.frameIt("D_F_ContextNotification", "D_F_Box25Template", 150, 30, "2");
        const e = FriendsEvent;
        e.addListener(e.FRIENDS_JUMP_FAILED, this.showJumpError.bind(this));
        $("#D_F_ContextNotifClose").on('mousedown', (e) => {
            DisneySocial.stopEvent(e);
            this.hide();
        });
    }

    static showBestHint(): boolean {
        if (FriendsUI.bestCount >= FriendsUI.BEST_HINT_COUNT_MAX || this.bestHintShown || (!FriendsUI.bestEnabled && UIFriends.arrAllFriends.length < 10)) {
            return false;
        }
        if (this.active) {
            if (this.queue.indexOf("show_best") < 0) {
                this.queue.push("show_best");
            }
            return false;
        }
        if ($("#D_F_FriendSection").css("display") !== "none") {
            this.bestHintShown = true;
            FriendsUI.bestCount++;
            if (DisneyFriends.activeUser !== null) {
                DisneyFriends.activeUser.settings.addSetting(Settings.Constants.BEST_HINT_COUNT, FriendsUI.bestCount.toString());
            }
            this.delay = FriendsUI.DELAY_FIRST;
            $("#D_F_ContextNotifUp").css("left", "33px").show();
            Images.setAttrs("#D_F_ContextNotifIcon", "41", false);
            $("#D_F_ContextNotifText").text(FriendsUI.setText("D11"));
            $(".D_F_ContextNotification_BoxH").css("height", "30px");
            $(".D_F_ContextNotification_BoxW").css("width", "140px");
            $("#D_F_ContextNotifText").css("height", "48px").css("width", "85px");
            $("#D_F_ContextNotification").css("top", "60px").css("left", "60px");
            this.display();
            return true;
        }
        return false;
    }

    static showJumpError(e: any): boolean {
        if ($("#D_F_FriendSection").css("display") == "none") return false;
        if (!e) return false;
        const n = UIFriends.getTileIdBySwid(e);
        if (!n) return false;
        if (this.active) {
            if (this.queue.indexOf(e) < 0) this.queue.push(e);
            return false;
        }
        this.delay = FriendsUI.delay;
        $(".D_F_ContextNotification_BoxH").css("height", "30px");
        $(".D_F_ContextNotification_BoxW").css("width", "150px");
        $("#D_F_ContextNotifText").css("height", "51px").css("width", "100px");
        const position = $("#" + n).position();
        const parentPosition = $("#" + n).parent().position();
        let top = position.top + parentPosition.top + 155;
        let left = position.left + parentPosition.left + 25;
        let t = -5;
        switch (position.left) {
            case 100:
                left -= 50;
                t += 50;
                break;
            case 200:
                left -= 100;
                t += 100;
                break;
        }
        if (position.top == 256) {
            top -= 120;
            $("#D_F_ContextNotifDn").show();
        } else {
            $("#D_F_ContextNotifUp").show();
        }
        $("#D_F_ContextNotification").css("top", top + "px").css("left", left + "px");
        $("#D_F_ContextNotifUp").css("left", t + "px");
        $("#D_F_ContextNotifDn").css("left", t + "px");
        Images.setAttrs("#D_F_ContextNotifIcon", "42", false);
        $("#D_F_ContextNotifText").text(FriendsUI.setText("D14"));
        this.display();
        return true;
    }

    static display(): void {
        $("#D_F_ContextNotification").show();
        this.clearTimer();
        this.timeout = setTimeout(() => {
            this.hide();
        }, this.delay);
    }

    static clearTimer(): void {
        if (typeof this.timeout == "number") {
            clearTimeout(this.timeout);
            delete this.timeout;
        }
    }

    static hide(): void {
        this.clearTimer();
        $("#D_F_ContextNotification").css("display", "none");
        $("#D_F_ContextNotifUp").css("display", "none");
        $("#D_F_ContextNotifDn").css("display", "none");
        FriendsUI.delay = FriendsUI.DELAY_NORMAL;
        this.active = false;
        this.loop();
    }

    static cancel(): void {
        this.clearTimer();
        this.queue.length = 0;
        this.hide();
    }

    static loop(): void {
        if (this.queue.length > 0) {
            const item = this.queue.shift();
            if (item && item.indexOf("show_best") == 0) {
                this.showBestHint();
            } else {
                this.showJumpError(item);
            }
        }
    }
}

export class UIData {
    static markup: any = null;
    static text: Record<string, any> = null;
    static images: Record<string, any> = null;
    static timeoutID: ReturnType<typeof setTimeout> | undefined;

    static init(): boolean {
        if (typeof this.timeoutID == "number") {
            clearTimeout(this.timeoutID);
            delete this.timeoutID;
        }
        if (this.markup && this.text && this.images) return false;

        const e = DisneySocial;
        const i = Environment;

        if (!this.markup) {
            $.ajax(e.getUrl(i.CLUBPENGUIN_CONTENT_URL, i.MARKUP_PATH), {
                cache: true,
                dataType: "json",
                success: (response: any) => {
                    this.markup = response.data;
                    this.setMarkup();
                }
            });
        }

        if (!this.text) {
            $.ajax(e.getUrlForLanguage(i.CLUBPENGUIN_CONTENT_URL, i.TEXT_PATH), {
                cache: true,
                dataType: "json",
                success: (response: any) => {
                    this.text = response;
                    this.setText();
                }
            });
        }

        if (!this.images) {
            $.ajax(e.getUrl(i.CLUBPENGUIN_CONTENT_URL, i.IMAGES_PATH), {
                cache: true,
                dataType: "json",
                success: (response: any) => {
                    this.images = response;
                    this.setImages();
                }
            });
        }

        this.timeoutID = setTimeout(() => {
            this.init();
        }, 120000);

        return true;
    }

    static setMarkup(): boolean {
        if (!FriendsUI.gotLayout) return false;
        FriendsUI.setLayout();
        return true;
    }

    static setText(): boolean {
        if (!this.text || !FriendsUI.gotLayout) return false;

        $("[lang]").each(function () {
            if (this.nodeName.toLowerCase() !== "html") {
                FriendsUI.setTagText(this);
            }
        });

        Images.setImplicit();
        return true;
    }

    static setImages(): void {
        Images.init();
    }
}

export class Me {
    static worldId: string | null = null;
    static roomId: string | null = null;

    static init(): void {
        $("#D_F_FriendsSectionClose").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            FriendsUI.hideFriendsSection();
        });
        const e = FriendsEvent;
        e.addListener(e.USER_PRESENCE_UPDATE, this.updatePresence.bind(this));
    }

    static updatePresence(e: any): boolean {
        if (!e) return false;
        this.worldId = $(e).find("world").text();
        this.roomId = $(e).find("room").text();
        UIFriends.meUpdate();
        return true;
    }
}

export class Slider {
    crtSlider: JQuery<HTMLElement> | null = null;
    crtHandle: HTMLElement | null = null;
    crtPanel: JQuery<HTMLElement> | null = null;
    crtFadingUp: JQuery<HTMLElement> | null = null;
    crtFadingDn: JQuery<HTMLElement> | null = null;
    totalScroll: number = 0;
    handleHeightMin: number = 52;
    sliderStep: number = 1;
    sliderMin: number = 0;
    sliderMax: number = 100;
    holdScroll: ReturnType<typeof setTimeout> | null = null;

    constructor(elementClass: string, topOffset: number = 0, rightOffset: number = 0, panelHeight: number = 0, sliderMin?: number, sliderMax?: number) {
        if (elementClass) {
            if (sliderMin) this.sliderMin = sliderMin;
            if (sliderMax) this.sliderMax = sliderMax;
            this.crtPanel = $("#" + elementClass);
            this.crtPanel.parent().append($("#D_F_GenericSliderTemplate > div").clone(true));
            this.crtSlider = $(this.crtPanel.siblings(":last").children(".D_F_Slider")[0]);
            this.crtSlider.slider({
                orientation: "vertical",
                range: "min",
                min: this.sliderMin,
                max: this.sliderMax,
                value: 0,
                start: () => { },
                slide: (event, value) => {
                    this.scrollToValue(value);
                }
            });
            this.crtHandle = this.crtSlider.find(".ui-slider-handle")[0];
            this.buildHandle();
            this.crtSlider.parent().css("top", topOffset.toString() + "px").css("right", rightOffset.toString() + "px").css("height", panelHeight.toString() + "px");
            this.crtSlider.show();

            let element = this.crtSlider.parent().find(".D_F_SliderArrowTop")[0];
            $(element).on('mousedown', e => {
                DisneySocial.stopEvent(e);
                this.scrollUp();
                this.holdScroll = setInterval(() => {
                    this.scrollUp();
                }, 100);
            });
            $(element).on('mouseup', e => {
                DisneySocial.stopEvent(e);
                if (this.holdScroll) clearInterval(this.holdScroll);
            });

            element = this.crtSlider.parent().find(".D_F_SliderTop")[0];
            $(element).on('mousedown', e => {
                DisneySocial.stopEvent(e);
                this.scrollToTop();
            });

            element = this.crtSlider.parent().find(".D_F_SliderBottom")[0];
            $(element).on('mousedown', e => {
                DisneySocial.stopEvent(e);
                this.scrollBottom();
            });

            element = this.crtSlider.parent().find(".D_F_SliderArrowBottom")[0];
            $(element).on('mousedown', e => {
                DisneySocial.stopEvent(e);
                this.scrollDown();
                this.holdScroll = setInterval(() => {
                    this.scrollDown();
                }, 100);
            });
            $(element).on('mouseup', e => {
                DisneySocial.stopEvent(e);
                if (this.holdScroll) clearInterval(this.holdScroll);
            });
        }
    }

    buildHandle(): void {
        $(this.crtHandle).append($("#D_F_SliderHandleTopTemplate > div").clone(true));
        $(this.crtHandle).append($("#D_F_SliderHandleBottomTemplate > div").clone(true));
    }

    bindMousewheel(): void {
        const self = this;
        self.crtPanel?.off("mousewheel").on("mousewheel", (event, delta) => {
            DisneySocial.stopEvent(event);
            self.onMousewheel();
            self.mousewheelSlide(delta);
        });
        self.crtSlider?.parent().off("mousewheel").on("mousewheel", (event, delta) => {
            DisneySocial.stopEvent(event);
            self.onMousewheel();
            self.mousewheelSlide(delta);
        });
    }

    unbindMousewheel(): void {
        this.scrollToTop();
        this.crtPanel?.off("mousewheel");
        this.crtSlider?.parent().off("mousewheel");
    }

    scrollToValue(ui: { value?: number }): void {
        let scrollValue = Math.round(this.totalScroll * (this.sliderMax - ui.value) / this.sliderMax);
        scrollValue = this.getCustomTop(scrollValue, ui.value);
        this.crtPanel?.scrollTop(scrollValue);
        if (this.crtFadingUp) {
            ui.value == this.sliderMax || this.crtSlider?.parent().css("display") == "none"
                ? this.crtFadingUp.css("display", "none")
                : this.crtFadingUp.show();
        }
        if (this.crtFadingDn) {
            ui.value == this.sliderMin || this.crtSlider?.parent().css("display") == "none"
                ? this.crtFadingDn.css("display", "none")
                : this.crtFadingDn.show();
        }
    }

    getCustomTop(value: number, sliderValue: number): number {
        return value;
    }

    onMousewheel(): void { }

    scrollUp(): void {
        this.mousewheelSlide(1);
    }

    scrollDown(): void {
        this.mousewheelSlide(-1);
    }

    scrollToTop(): void {
        this.scrollToValue({ value: this.sliderMax });
        this.crtSlider?.slider("value", this.sliderMax);
    }

    scrollBottom(): void {
        this.scrollToValue({ value: this.sliderMin });
        this.crtSlider?.slider("value", this.sliderMin);
    }

    mousewheelSlide(delta: number): boolean {
        let value = this.crtSlider?.slider("value") ?? 0;
        if ((value == this.sliderMax && delta > 0) || (value == this.sliderMin && delta < 0)) return false;
        value += delta * this.sliderStep;
        if (value > this.sliderMax) value = this.sliderMax;
        if (value < this.sliderMin) value = this.sliderMin;
        this.scrollToValue({ value });
        this.crtSlider?.slider("value", value);
        return true;
    }

    getCustomHeight(value: number): number {
        return value;
    }

    resize(): boolean {
        if (!FriendsUI.isVisible(this.crtSlider)) return false;
        const panelHeight = this.crtPanel?.height() ?? 0;
        this.crtSlider?.parent().css("height", panelHeight.toString() + "px");
        let scrollHeight = Math.max(this.crtPanel?.[0].scrollHeight ?? 0, this.crtPanel?.[0].clientHeight ?? 0) - panelHeight;
        this.totalScroll = scrollHeight = this.getCustomHeight(scrollHeight);
        let sliderMax = this.sliderMax;
        if (scrollHeight + panelHeight > 0) {
            sliderMax = Math.round(this.sliderMax * panelHeight / (scrollHeight + panelHeight));
        }
        const sliderHeight = this.crtSlider?.parent().height() ?? 0;
        let handleHeight = 2 * Math.round((sliderHeight - 50) * sliderMax / (2 * this.sliderMax));
        if (handleHeight < this.handleHeightMin - 8) handleHeight = this.handleHeightMin - 8;
        const halfHandleHeight = handleHeight / 2;
        $(this.crtSlider).prev().css("height", (4 + halfHandleHeight).toString() + "px");
        $(this.crtSlider).next().css("height", (4 + halfHandleHeight).toString() + "px");
        handleHeight = sliderHeight - 2 * halfHandleHeight - 50;
        if (handleHeight <= 0) handleHeight = 1;
        $(this.crtSlider).css("height", handleHeight.toString() + "px").css("top", (halfHandleHeight + 25).toString() + "px");
        $(this.crtHandle).children().each(function () {
            const height = (halfHandleHeight - 7).toString() + "px";
            $(this).css("height", height);
            if ($(this).hasClass("D_F_SliderHandleMTop")) {
                $(this).css("top", "-" + height);
            } else {
                $(this).css("bottom", "-" + height);
            }
        });
        return true;
    }

    show(): void {
        this.crtSlider?.parent().show();
    }

    hide(): void {
        this.crtSlider?.parent().hide();
    }
}

export class UIFriends {
    static SECTION_HEIGHT: number = 360;
    static TILE_WIDTH: number = 100;
    static TILE_HEIGHT: number = 128;
    static BEST_FRIEND: string = "BF_";
    static BEST_CHARACTER: string = "BC_";
    static CHARACTER: string = "C_";
    static FRIEND: string = "F_";
    static START_IGLOO_ROOM_ID: number = 2000;
    static oldScrollTop: number | null = null;
    static arrAllFriends: string[] = [];
    static crtSwid: string | null = null;
    static swids: string[] = [];
    static grid: { [key: number]: { [key: number]: { swid: string | null } } } = {};
    static columns: number = 2;
    static groupNames: string[] = [];
    static groupArrays: any[] = [];
    static listSlider: Slider;
    static bestSwid: string | null = null;
    static sliderMin: number = 0;
    static sliderMax: number = 100;
    static sliderStep: number = 1;

    static init(): void {
        const status = FriendsPresence.Status;
        const friendsEvent = FriendsEvent;
        const socialEvent = SocialEvent;
        const uiEvent = UIEvent;

        $("#D_F_FriendsPanel").data();
        FriendsUI.frameIt("D_F_FriendSection", "D_F_Box25Template", 180, this.SECTION_HEIGHT, "0");
        FriendsUI.frameIt("D_F_FriendSectionReconnect", "D_F_Box25Template", 180, this.SECTION_HEIGHT, "1");

        this.groupNames = [
            this.BEST_FRIEND + status.ONLINE,
            this.BEST_CHARACTER + status.ONLINE,
            this.CHARACTER + status.ONLINE,
            this.FRIEND + status.ONLINE,
            this.BEST_FRIEND + status.OFFLINE,
            this.BEST_CHARACTER + status.OFFLINE,
            this.FRIEND + status.OFFLINE,
            this.CHARACTER + status.OFFLINE
        ];

        this.groupArrays = [];
        for (let groupNamesLength = this.groupNames.length, i = 0; i < groupNamesLength; i++) {
            this.groupArrays.push([]);
        }

        this.gridInit();
        this.gridFill();

        this.listSlider = new Slider("D_F_FriendsPanel", 20, -16, 3 * this.TILE_HEIGHT, 0, 100);
        this.listSlider.crtFadingUp = $("#D_F_FriendsGridFadeUp");
        this.listSlider.crtFadingDn = $("#D_F_FriendsGridFadeDn");
        this.listSlider.getCustomTop = this.getCustomTop.bind(this);
        this.listSlider.getCustomHeight = this.getCustomHeight.bind(this);
        this.listSlider.onMousewheel = this.onMousewheel.bind(this);

        $(this.listSlider.crtSlider.parent()).on('mousedown', () => {
            ContextNotification.cancel();
        });

        friendsEvent.addListener(friendsEvent.FRIENDS_UPDATE, this.updateList.bind(this));
        friendsEvent.addListener(friendsEvent.FRIENDS_WEIGHT_UPDATE, this.updatePriority.bind(this));
        friendsEvent.addListener(friendsEvent.FRIENDS_NEW, this.updateNew.bind(this));
        friendsEvent.addListener(friendsEvent.FRIENDS_REMOVE, this.removeFriend.bind(this));
        friendsEvent.addListener(friendsEvent.SAFE_CHAT_CONNECTION_UPDATE, this.safeChatConnectionUpdate.bind(this));
        socialEvent.addListener(socialEvent.ROOM_UPDATE, this.roomUpdate.bind(this));
        friendsEvent.addListener(friendsEvent.JUMP_STATUS_FOR_ROOMS_UPDATE, this.updateJumpStatus.bind(this));
        uiEvent.addListener(uiEvent.SUBPANEL_TOGGLED, this.resize.bind(this));
    }

    static getCustomTop(value: number, scrollValue: number): number {
        const tileHeight = this.TILE_HEIGHT;
        const friendIndexes = this.getIndexAllFriends();
        let rowIndex = 3 * Math.floor(value / tileHeight);
        const maxFriendIndex = this.getIndexAllFriendsMax();
        if (rowIndex > maxFriendIndex) rowIndex = maxFriendIndex;
        this.crtSwid = this.arrAllFriends[rowIndex];
        if (friendIndexes !== rowIndex) this.updateGrid();
        if (scrollValue == this.sliderMax) value = 0;
        else if (scrollValue == this.sliderMin) value = tileHeight;
        else value %= tileHeight;
        return value;
    }

    static getIndexAllFriendsMax(): number {
        let index = 3 * (Math.ceil(this.arrAllFriends.length / 3) - 4);
        return Math.max(index, 0);
    }

    static getIndexAllFriends(): number {
        let index = 0;
        if (this.arrAllFriends.length == 0) {
            this.crtSwid = null;
            return index;
        }
        const columns = this.columns;
        if (this.crtSwid) {
            index = this.arrAllFriends.indexOf(this.crtSwid);
            if (index < 0) index = 0;
            else {
                if (columns > 0) index = columns * Math.floor(index / columns);
                let n = this.getIndexAllFriendsMax();
                if (index > n) index = n;
            }
        }
        this.crtSwid = this.arrAllFriends[index];
        return index;
    }

    static checkIndexAllFriends(swid: string): void {
        if (this.bestSwid) return;
        let i;
        if (swid == this.crtSwid) {
            let index = this.arrAllFriends.indexOf(swid) + 1;
            i = 3 * (Math.ceil(this.arrAllFriends.length - 1 / 3) - 3);
            if (i < 0) i = 0;
            if (index > i) index = i;
            this.crtSwid = this.arrAllFriends[index];
        }
    }

    static getCustomHeight(value: number): number {
        const i = this.TILE_HEIGHT;
        let n = this.sliderMin;
        value = Math.ceil(this.arrAllFriends.length / 3) * i - 3 * i;
        if (value < 0) value = 0;
        if (value > 0) n = Math.ceil(this.sliderMax * i / value);
        if (n < 1) n = 1;
        if (n > this.sliderMax) n = this.sliderMax;
        this.sliderStep = n;
        return value;
    }

    static onMousewheel(): void {
        ContextNotification.cancel();
    }

    static roomUpdate(): void { }

    static safeChatConnectionUpdate(e: boolean): void {
        const friendsPanel = $("#D_F_FriendsPanel");
        friendsPanel.find(".D_F_FriendName").each(function () {
            let name = $(this).siblings("input[type=hidden]").val() as string;
            const t = $(this).siblings(".D_F_FriendPName")[0];
            if (name !== undefined) {
                let rosterItem = friendsPanel.data(name) as any as RosterItem;
                let friendName = rosterItem.name;
                if (friendName !== null) {
                    if (e == true && rosterItem.safeChatName !== null) {
                        if (t) $(t).text("(" + rosterItem.safeChatName + ")");
                        else friendName += " (" + rosterItem.safeChatName + ")";
                    }
                    $(this).text(friendName);
                }
            }
        });
    }

    static meUpdate(): void {
        var self = this;
        $(".D_F_FriendJump").each(function () {
            if (!$(this).hasClass("D_F_JumpTemplate")) self.updateJump(this);
        });
        HudNotification.reStyleBubble();
    }

    static updateJumpStatus(): void {
        this.meUpdate();
    }

    static gridInit(): void {
        for (let row = 0; row < 4; row++) {
            for (let column = 0; column < 3; column++) {
                $("#D_F_FriendsGrid").append($("#D_F_TileTemplate > div").clone(true));
                const n = "D_F_Tile_" + row.toString() + column.toString();
                $("#D_F_FriendsGrid").children(":last").prop("id", n).addClass("D_F_Tile_R" + row.toString()).addClass("D_F_Tile_C" + column.toString());
            }
        }
    }

    static gridFill(): void {
        for (let row = 0; row < 4; row++) {
            for (let column = 0; column < 3; column++) {
                if (!this.grid[row]) this.grid[row] = {};
                if (!this.grid[row][column]) this.grid[row][column] = { swid: null };
                this.grid[row][column].swid = null;
            }
        }
        for (let e = 0; e < this.swids.length; e++) {
            const i = this.swids[e];
            const n = this.getCoordByIndex(e);
            this.grid[n[0]][n[1]].swid = i;
        }
        this.gridPaint();
    }

    static resize(): void {
        let sectionHeight = this.SECTION_HEIGHT, friendSectionHeight = parseInt($("#D_F_FriendSection").css("height"), 10), columns = 2, row = 0;
        const tLength = this.arrAllFriends.length;
        if (tLength > 5) columns = 3;
        if (tLength == 5 || tLength > 6) sectionHeight += 44;
        if ($("#D_F_AddFriendPanel").css("display") !== "none") sectionHeight += 25;
        if ($("#D_F_NotificationPanel").css("display") !== "none") sectionHeight += 20;
        if (columns !== this.columns) {
            row = (columns - this.columns) * this.TILE_WIDTH;
            this.columns = columns;
            $("#D_F_FriendsPanel").width(columns * this.TILE_WIDTH);
        }
        const nSlider = this.listSlider.crtSlider.parent();
        if (tLength > 9) {
            $("#D_F_FriendsPanel").css("left", "-13px");
            $(".D_F_FriendFavorite").show();
            this.listSlider.bindMousewheel();
            if ($(nSlider).css("display") == "none") {
                $(nSlider).show();
                row += parseInt($(nSlider).css("width"), 10) - 10;
            }
            sectionHeight += 3;
        } else {
            $("#D_F_FriendsPanel").css("left", "-10px");
            if (FriendsUI.bestEnabled) $(".D_F_FriendFavorite").show();
            else $(".D_F_FriendFavorite").css("display", "none");
            this.listSlider.unbindMousewheel();
            this.listSlider.scrollToTop();
            if ($(nSlider).css("display") !== "none") {
                row -= parseInt($(nSlider).css("width"), 10) - 10;
                $(nSlider).hide();
            }
        }
        sectionHeight -= friendSectionHeight;
        if (row || sectionHeight) FriendsUI.resizeFriendsWidgetWith(row, sectionHeight);
    }

    static gridPaint(): void {
        const friendsGrid = $("#D_F_FriendsGrid").detach();
        for (let row = 0; row < 4; row++) {
            for (let column = 0; column < 3; column++) {
                let tile = this.getTileIdByCoord(row, column);
                if (tile) {
                    let elem = friendsGrid.find("#" + tile);
                    const swid = this.grid[row][column].swid;
                    if (swid) {
                        let avatar = $(elem).find(".D_F_FriendAvatar")[0];
                        if (avatar == undefined) {
                            DisneySocial.unbindAll(elem);
                            $(elem).empty().append($("#D_F_FriendTileTemplate > *").clone(true));
                            avatar = $(elem).find(".D_F_JumpTemplate")[0];
                            $(avatar).removeClass("D_F_JumpTemplate");
                        }
                        this.displayTile(elem, swid);
                    } else if (row < 3) {
                        let s = $(elem).find(".D_F_AddFriendBtn")[0];
                        if (s == undefined && this.arrAllFriends.length < 9) {
                            DisneySocial.unbindAll(elem);
                            $(elem).empty().append($("#D_F_AddTileTemplate > *").clone(true));
                        }
                    } else {
                        DisneySocial.unbindAll(elem);
                        $(elem).empty();
                    }
                }
            }
        }
        friendsGrid.appendTo("#D_F_FriendsPanel");
        $("#D_F_FriendsPanel").scrollTop(0);
    }

    static updateArrays(): void {
        const t = UIEvent;
        const i = this.arrAllFriends.length;
        this.arrAllFriends.length = 0;
        const n = this.groupArrays.length;
        for (let e = 0; e < n; e++) {
            this.parseFriendsArr(this.groupArrays[e]);
        }
        if (i !== this.arrAllFriends.length) {
            t.updateListeners(t.FRIENDS_COUNT, this.arrAllFriends.length);
        }
        this.updateGrid();
        this.bestSwid = null;
        if (this.arrAllFriends.length > 9) {
            ContextNotification.showBestHint();
            this.listSlider.resize();
            $("#D_F_HeaderFriendsCount").text("(" + this.arrAllFriends.length.toString() + ")").show();
            const t = Math.ceil(this.arrAllFriends.length / 3);
            const i = Math.ceil(this.getIndexAllFriends() / 3);
            const e = this.listSlider.sliderMax - Math.round(this.listSlider.sliderMax * i / t);
            this.listSlider.crtSlider.slider("value", e);
        } else {
            $("#D_F_HeaderFriendsCount").css("display", "none");
        }
        Images.preloadAvatars();
    }

    static parseFriendsArr(friends: { swid: string }[]): void {
        for (let i = 0; i < friends.length; i++) {
            const n = friends[i].swid;
            this.arrAllFriends.push(n);
        }
    }

    static updateGrid(): void {
        if ($("#D_F_FriendSection").css("display") == "none") return;
        this.swids.length = 0;
        let e = this.getIndexAllFriends();
        const i = this.arrAllFriends.length;
        for (; e < i && this.swidsAdd(this.arrAllFriends[e]) && this.swids.length !== 12; e++);
        this.gridFill();
    }

    static swidsAdd(swid: string): boolean {
        if (!swid) return false;
        if (this.swids.length > 11) return false;
        if (this.swids.indexOf(swid) >= 0) return false;
        this.swids.push(swid);
        return true;
    }

    static getSwidIndex(swid: string, friends: { name: string; swid: string }[]): number {
        for (let n = friends.length; n--;) {
            if (friends[n].swid == swid) return n;
        }
        return -1;
    }

    static getTileIdByCoord(row: number, column: number): string {
        return "D_F_Tile_" + row.toString() + column.toString();
    }

    static getTileIdBySwid(swid: string): string | null {
        const index = this.swids.indexOf(swid);
        if (index < 0) return null;
        const coord = this.getCoordByIndex(index);
        if (!coord) return null;
        return this.getTileIdByCoord(coord[0], coord[1]);
    }

    static getGroupIndexBySwid(swid: string): [number, number] {
        for (let i = 0; i < this.groupArrays.length; i++) {
            const index = this.getSwidIndex(swid, this.groupArrays[i]);
            if (index > -1) return [i, index];
        }
        return [-1, -1];
    }

    static getCoordByIndex(e: number): [number, number] | null {
        if (!this.columns || e < 0 || e > 11) return null;
        return [Math.floor(e / this.columns), (e + this.columns) % this.columns];
    }

    static getSwidByTileId(tileId: string): string | null {
        let swid = null;
        const underscoreIndex = tileId.lastIndexOf("_");
        const row = parseInt(tileId.substring(underscoreIndex + 1, 1));
        const column = parseInt(tileId.substring(underscoreIndex + 2, 1));
        if (this.grid[row] && this.grid[row][column]) {
            swid = this.grid[row][column].swid;
        }
        return swid;
    }

    static displayTile(element: JQuery.Selector | HTMLElement | JQuery, swid: string): boolean {
        const status = FriendsPresence.Status;
        const groupIndex = this.getGroupIndexBySwid(swid);
        let tile = $("#D_F_FriendsPanel").data(swid);
        if (!tile) return false;

        let tileElement, mascotId = tile.Id, name = tile.name;
        tile = tile.status;
        $(element as JQuery.Selector).children("input[type=hidden]").val(swid);
        if ((tileElement = $(element as JQuery.Selector).find(".D_F_CharacterCard")[0]) && !swid.includes("character_")) {
            FriendsTile.bindPlayerCard(tileElement);
        }
        if ((tileElement = $(element as JQuery.Selector).find(".D_F_PlayerCard")[0]) && swid.startsWith("character_")) {
            FriendsTile.bindCharacterCard(tileElement);
            if (SocialData.mascots && SocialData.mascots[mascotId]) {
                name = SocialData.mascots[mascotId].name;
            }
        }
        tileElement = tileElement || $(element as JQuery.Selector).find(".D_F_CharacterCard");
        let avatar = $(element as JQuery.Selector).find(".D_F_FriendAvatar")[0];
        let avatarOffline = $(element as JQuery.Selector).find(".D_F_FriendAvatarOff")[0];
        let bestFriend = $(element as JQuery.Selector).find(".D_F_FriendFavorite")[0];
        let friendName = $(element as JQuery.Selector).find(".D_F_FriendName")[0];
        FriendsUI.getAvatarUriBySwid(avatar, swid, 88, true);
        if (tile == status.ONLINE) {
            $(avatarOffline).css("display", "none");
        } else {
            $(avatarOffline).show();
        }
        $(avatar).show();
        const groupName = this.groupNames[groupIndex[0]];
        if (groupName.startsWith(this.BEST_FRIEND) || groupName.startsWith(this.BEST_CHARACTER)) {
            Images.setAttrs(bestFriend, "20", false);
            $(bestFriend).prop("title", FriendsUI.setText("D7"));
        } else {
            Images.setAttrs(bestFriend, "22", false);
            $(bestFriend).prop("title", FriendsUI.setText("D10"));
        }
        if (friendName != null) {
            $(friendName).text(name);
        }
        this.updateJump($(element as JQuery.Selector).find(".D_F_FriendJump")[0]);
        return true;
    }

    static updateJump(element: HTMLElement, presence?: any): boolean {
        if (!element) return false;
        $(element).css("cursor", "default").off("mousedown");

        let r = $(element).siblings("input[type=hidden]").val() as string;
        if (!r) return false;

        let t, s, d;
        let nData = $("#D_F_FriendsPanel").data(r) || {
            status: FriendsPresence.Status.OFFLINE,
            roomID: null,
            worldID: null
        };
        if (presence) {
            nData.status = FriendsPresence.Status.ONLINE;
            nData.roomID = presence.location.room;
            nData.worldID = presence.location.world;
        }
        t = nData.status;
        s = $(element).siblings(".D_F_FriendStatus")[0];
        if (s) {
            if (t == FriendsPresence.Status.ONLINE) {
                $(s).css("display", "none");
            } else {
                $(s).show();
            }
        }
        if (t !== FriendsPresence.Status.ONLINE) {
            $(element).css("display", "none");
            return false;
        }
        $(element).css("display", "none");
        d = $(element).find(".D_F_FriendJumpBtn")[0];
        $(d).css("display", "none");
        t = $(element).find(".D_F_FriendRoom")[0];
        $(t).text("").css("display", "none");
        if (r.startsWith("character_") && !presence) return false;

        if (nData.roomID && SocialData.rooms && SocialData.rooms[nData.roomID]) {
            $(element).show();
            $(t).text(nData.mobile ? FriendsUI.setText("D24") : FriendsUI.setText("D23"))
                .css("left", "15px")
                .css("color", "#6DABD7")
                .css("display", "block");
        } else {
            if (!(nData.roomID > this.START_IGLOO_ROOM_ID)) return false;
            $(element).show();
            $(t).text(FriendsUI.setText("D22"))
                .css("left", "15px")
                .css("color", "#6DABD7")
                .css("display", "block");
        }
        if (!nData.worldID || (nData.roomID == Me.roomId && nData.worldID == Me.worldId)) return false;
        if (!presence && !Jump.canJump(nData.worldID, nData.roomID)) return false;

        UIFriends.bindJump(element);
        $(element).css("cursor", "pointer");
        $(t).css("left", "5px").css("color", "white");
        $(d).show();
        return true;
    }

    static bindJump(element: HTMLElement): void {
        $(element).on('mousedown', function (event) {
            DisneySocial.stopEvent(event);
            HudNotification.close();
            const swid = $(this).siblings("input[type=hidden]").val() as string;
            if (swid.startsWith("character_")) {
                FriendsUI.jumpToCharacter(HudNotification.characterPresences[swid]);
            } else {
                FriendsUI.jumpToFriend(swid);
            }
        });
    }

    static updatePriority(e: any): void {
        for (const i in e) {
            if (e.hasOwnProperty(i) && e[i].weight && $("#D_F_FriendsPanel").data(i)) {
                $("#D_F_FriendsPanel").data(i).weight = e[i].weight;
            }
        }
        for (let s = this.groupArrays.length, e = 0; e < s; e++) {
            const groupArray = this.groupArrays[e];
            for (let t = groupArray.length, n = 0; n < t; n++) {
                groupArray[n].weight = ($("#D_F_FriendsPanel").data(groupArray[n].swid) as any as RosterItem).weight;
            }
            this.sortListByWeight(e);
        }
        this.updateArrays();
    }

    static updateTile(e: string): boolean {
        if ($("#D_F_FriendSection").css("display") == "none") return false;
        const i = this.getTileIdBySwid(e);
        if (!i) return false;
        if ($("#D_F_FriendsPanel").data(e) !== undefined && $("#D_F_FriendsPanel").data(e) !== null) {
            this.displayTile($("#" + i)[0], e);
        }
        return true;
    }

    static sortNames(e: any, i: any): number {
        if (e.name) {
            if (i.name) {
                return e.name.toLocaleUpperCase().localeCompare(i.name.toLocaleUpperCase());
            }
            return -1;
        }
        return 1;
    }

    static sortWeights(e: any, i: any): number {
        if (e.weight !== i.weight) {
            return e.weight > i.weight ? -1 : 1;
        }
        return 0;
    }

    static updateNew(e: RosterItem): void {
        this.oldScrollTop = null;
        if (e.swid !== undefined) {
            const n = e.swid;
            const t = e.name;
            const i = this.processSingleEntry(n, e);
            this.sortAffected(i);
            this.updateArrays();//n);
            HudNotification.notify(t, HudNotification.FRIEND_ACCEPTANCE, n);
            BarNotification.newFriendCallback(e);
        }
    }

    static updateList(data: RosterItem | { [swid: string]: RosterItem }): void {
        this.oldScrollTop = null;
        let i, n;
        if (data.character !== undefined) {
            data = data as CharactersData;
            i = data.id.toString();
            const processedEntry = this.processSingleEntry(i, data);
            i = "character_" + i;
            this.sortAffected(processedEntry);
            if (processedEntry.length == 0) {
                this.updateTile(i);
            } else {
                this.updateArrays();
            }
        } else if (data.swid !== undefined) {
            data = data as RosterItem;
            i = data.swid;
            const processedEntry = this.processSingleEntry(i, data);
            this.sortAffected(processedEntry);
            if (processedEntry.length == 0) {
                this.updateTile(i);
            } else {
                this.updateArrays();
            }
        } else {
            data = data as { [swid: string]: RosterItem };
            for (n in data) {
                this.processSingleEntry(n, data[n]);
            }
            const affectedGroups = [];
            for (let len = this.groupArrays.length, n = 0; n < len; n++) {
                affectedGroups[n] = n;
            }
            this.sortAffected(affectedGroups);
            this.updateArrays();
        }
        this.updateWidget();
        AddFriend.updateSearchTile(i);
    }

    static updateWidget(): void {
        if (this.arrAllFriends.length > 9) {
            this.listSlider.resize();
        }
    }

    static sortAffected(e: any[]): void {
        for (let i = 0, n = e.length; i < n; i++) {
            this.sortListByName(e[i]);
            this.sortListByWeight(e[i]);
        }
    }

    static sortListByName(e: number): void {
        this.groupArrays[e].sort(this.sortNames);
    }

    static sortListByWeight(e: number): void {
        this.groupArrays[e].sort(this.sortWeights);
    }

    static _processSingleEntry(swid: string, i: any): any[] {
        let groups: any[] = [];
        let friendId: string | null = null;
        let name: string | null = null;
        let safeChatName: string | null = null;
        let weight: number = 0;
        let status: string | null = null;
        let worldId: string | null = null;
        let roomId: number | null = null;

        let friendType: string;

        if ('character' in i) {
            swid = "character_" + swid;
            if (i.id !== undefined && i.id !== null) {
                friendId = i.id;
            }
            if (i.groups !== undefined && i.groups !== null) {
                groups = i.groups;
            }
            friendType = groups[0] !== undefined && groups[0] !== null && groups[0] == 1 ? this.BEST_CHARACTER : this.CHARACTER;
        } else {
            if (i.groups !== undefined && i.groups !== null) {
                groups = i.groups;
            }
            friendType = groups[0] !== undefined && groups[0] !== null && groups[0] == 1 ? this.BEST_FRIEND : this.FRIEND;
            if (i.presence.id !== undefined && i.presence.id !== null) {
                friendId = i.presence.id;
            }
        }
        if (i.name !== undefined && i.name !== null) {
            name = i.name.trim();
        }
        if (i.safeChatName !== undefined && i.safeChatName !== null) {
            safeChatName = i.safeChatName.trim();
        }
        if (i.weight !== undefined && i.weight !== null) {
            weight = i.weight;
        }
        if (i.presence.status !== undefined && i.presence.status !== null) {
            status = i.presence.status;
        }
        if (i.presence.location !== undefined && i.presence.location !== null) {
            if (i.presence.location.world !== undefined && i.presence.location.world !== null && i.presence.location.world !== "") {
                worldId = i.presence.location.world;
            }
            if (i.presence.location.room !== undefined && i.presence.location.room !== null && i.presence.location.room !== "") {
                roomId = i.presence.location.room;
            }
        }

        let l, u, F = HudNotification;
        const h = FriendsPresence.Status;
        let D = "";

        if ($("#D_F_FriendsPanel").data(swid) !== undefined && $("#D_F_FriendsPanel").data(swid) !== null) {
            D = $("#D_F_FriendsPanel").data(swid).status;
            l = $("#D_F_FriendsPanel").data(swid).type;
            u = $("#D_F_FriendsPanel").data(swid).cache;
        }

        if ((friendType == this.BEST_FRIEND || friendType == this.BEST_CHARACTER) && (l == undefined || l == this.BEST_FRIEND || l == this.BEST_CHARACTER)) {
            this.crtSwid = this.bestSwid = swid;
        }

        $("#D_F_FriendsPanel").data(swid, {
            type: friendType,
            Id: friendId,
            name: name,
            safeChatName: safeChatName,
            weight: weight,
            status: status,
            worldID: worldId,
            roomID: roomId,
            mobile: roomId == FriendsPresence.MobileRoomID
        });

        if (status !== h.ONLINE) {
            $("#D_F_FriendsPanel").data(swid).cache = {};
        } else if (u) {
            $("#D_F_FriendsPanel").data(swid).cache = u;
        }

        if (status == h.ONLINE && D == h.OFFLINE) {
            Images.setAvatarCache(swid, "88", false);
            if (friendType == this.BEST_CHARACTER || friendType == this.CHARACTER) {
                F.notify(name, F.CHARACTER_ONLINE, swid);
            } else {
                F.notify(name, F.FRIEND_ONLINE, swid, i.presence);
            }
        }

        const groupIndex = this.getGroupIndexBySwid(swid);
        const groupNameIndex = this.groupNames.indexOf(groups + status);
        if (groupIndex[0] == groupNameIndex) {
            this.groupArrays[groupIndex[0]][groupIndex[1]] = {
                name: name,
                weight: weight,
                swid: swid
            };
            return [];
        } else {
            if (groupIndex[0] > -1) {
                this.checkIndexAllFriends(swid);
                this.groupArrays[groupIndex[0]].splice(groupIndex[1], 1);
            }
            this.groupArrays[groupNameIndex].push({
                name: name,
                weight: weight,
                swid: swid
            });
            return [groupNameIndex];
        }
    }

    static processSingleEntry(swid: string, data: any): number[] {
        let groups: number[] = [];
        let friendId: string | null = null;
        let name: string | null = null;
        let safeChatName: string | null = null;
        let weight: number = 0;
        let status: string | null = null;
        let worldId: string | null = null;
        let roomId: number | null = null;

        let friendType: string;

        if ('character' in data) {
            swid = "character_" + swid;
            if (data.id !== undefined && data.id !== null) {
                friendId = data.id;
            }
            if (data.groups !== undefined && data.groups !== null) {
                groups = data.groups;
            }
            friendType = groups[0] !== undefined && groups[0] !== null && groups[0] === 1 ? UIFriends.BEST_CHARACTER : UIFriends.CHARACTER;
        } else {
            if (data.groups !== undefined && data.groups !== null) {
                groups = data.groups;
            }
            friendType = groups[0] !== undefined && groups[0] !== null && groups[0] === 1 ? UIFriends.BEST_FRIEND : UIFriends.FRIEND;
            if (data.presence.id !== undefined && data.presence.id !== null) {
                friendId = data.presence.id;
            }
        }

        if (data.name !== undefined && data.name !== null) {
            name = data.name.trim();
        }
        if (data.safeChatName !== undefined && data.safeChatName !== null) {
            safeChatName = data.safeChatName.trim();
        }
        if (data.weight !== undefined && data.weight !== null) {
            weight = data.weight;
        }
        if (data.presence.status !== undefined && data.presence.status !== null) {
            status = data.presence.status;
        }
        if (data.presence.location !== undefined && data.presence.location !== null) {
            if (data.presence.location.world !== undefined && data.presence.location.world !== null && data.presence.location.world !== "") {
                worldId = data.presence.location.world;
            }
            if (data.presence.location.room !== undefined && data.presence.location.room !== null && data.presence.location.room !== "") {
                roomId = data.presence.location.room;
            }
        }

        let cache = "", type: string, dataCache: any;

        if ($("#D_F_FriendsPanel").data(swid) !== undefined && $("#D_F_FriendsPanel").data(swid) !== null) {
            cache = $("#D_F_FriendsPanel").data(swid).status;
            type = $("#D_F_FriendsPanel").data(swid).type;
            $("#D_F_FriendsPanel").data(swid);
            dataCache = $("#D_F_FriendsPanel").data(swid).cache;
        }

        if (friendType !== UIFriends.BEST_FRIEND && friendType !== UIFriends.BEST_CHARACTER || type === undefined || type !== UIFriends.BEST_FRIEND || type !== UIFriends.BEST_CHARACTER) {
            UIFriends.crtSwid = UIFriends.bestSwid = swid;
        }

        $("#D_F_FriendsPanel").data(swid, {
            type: friendType,
            Id: friendId,
            name: name,
            safeChatName: safeChatName,
            weight: weight,
            status: status,
            worldID: worldId,
            roomID: roomId,
            mobile: roomId == FriendsPresence.MobileRoomID
        });

        if (status !== FriendsPresence.Status.ONLINE) {
            $("#D_F_FriendsPanel").data(swid).cache = {};
        } else {
            if (dataCache) {
                $("#D_F_FriendsPanel").data(swid).cache = dataCache;
            }
        }

        if (status == FriendsPresence.Status.ONLINE && cache == FriendsPresence.Status.OFFLINE) {
            Images.setAvatarCache(swid, "88", false);
            if (friendType === UIFriends.BEST_CHARACTER || friendType === UIFriends.CHARACTER) {
                HudNotification.notify(name, HudNotification.CHARACTER_ONLINE, swid);
            } else {
                HudNotification.notify(name, HudNotification.FRIEND_ONLINE, swid, data.presence);
            }
        }

        const groupIndex = UIFriends.getGroupIndexBySwid(swid);
        const groupNameIndex = UIFriends.groupNames.indexOf(friendType + status);

        if (groupIndex[0] === groupNameIndex) {
            UIFriends.groupArrays[groupIndex[0]][groupIndex[1]] = {
                name: name,
                weight: weight,
                swid: swid
            };
            return [];
        } else {
            if (groupIndex[0] > -1) {
                UIFriends.checkIndexAllFriends(swid);
            }
            UIFriends.groupArrays[groupNameIndex].push({
                name: name,
                weight: weight,
                swid: swid
            });
            return [groupNameIndex];
        }
    }

    static removeFriend(e: string): void {
        if (parseInt(e, 10) > 0 && parseInt(e, 10) < 100) {
            e = "character_" + e;
        }
        $("#D_F_FriendsPanel").data(e, null);
        $("#D_F_FriendsPanel").removeData(e);
        this.checkIndexAllFriends(e);
        const groupIndex = this.getGroupIndexBySwid(e);
        this.groupArrays[groupIndex[0]].splice(groupIndex[1], 1);
        this.updateArrays();
    }
}

export class FriendsTile {
    static friendGroups = {
        swid: null as string | null,
        groups: [] as any[]
    };

    static init(): void {
        $(".D_F_PlayerCard").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            this.showPlayerCard(e.currentTarget as HTMLElement);
        });

        $(".D_F_FriendFavorite").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            this.toggleBest(e.currentTarget as HTMLElement);
        });

        $(".D_F_AddFriendBtn").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            AddFriend.showAddFriend(e.currentTarget as HTMLElement);
        });
    }

    static showPlayerCard(element: HTMLElement): void {
        const swid = $(element).siblings("input[type=hidden]").val() as string;
        FriendsUI.showPlayerCard(swid);
    }

    static bindPlayerCard(element: HTMLElement): void {
        $(element).off("mousedown")
            .addClass("D_F_PlayerCard")
            .removeClass("D_F_CharacterCard")
            .on('mousedown', e => {
                DisneySocial.stopEvent(e);
                this.showPlayerCard(e.currentTarget as HTMLElement);
            });
    }

    static bindCharacterCard(element: HTMLElement): void {
        $(element).off("mousedown")
            .addClass("D_F_CharacterCard")
            .removeClass("D_F_PlayerCard")
            .on('mousedown', e => {
                DisneySocial.stopEvent(e);
                this.showCharacterCard(e.currentTarget as HTMLElement);
            });
    }

    static showCharacterCard(element: HTMLElement): void {
        let swid = $(element).siblings("input[type=hidden]").val() as string;
        swid = swid.substring(swid.lastIndexOf("_") + 1);
        FriendsAPI.showCharacterCard(swid);
    }

    static toggleBest(element: HTMLElement): void {
        let swid = $(element).siblings("input[type=hidden]").val() as string;
        FriendsUI.setBestFriend(swid);
        if (swid.indexOf("character_") > -1) {
            swid = swid.substring(swid.lastIndexOf("_") + 1);
            CP.sendToggleBestCharacter(swid);
        } else {
            CP.sendToggleBestFriend(swid);
        }
    }
}

export class Pending {
    static sortedList: { name: string; swid: string }[] = [];

    static init(): void {
        const e = FriendsEvent;
        e.addListener(e.PENDING_UPDATE, this.update.bind(this));
        e.addListener(e.PENDING_REMOVE, this.remove.bind(this));
    }

    static update(e: any): void {
        if (!e || !e.swid) return;
        const swid = e.swid;
        const name = e.name.trim();
        if (!name) return;
        this.sortedList.push({ name, swid });
        this.sortedList.sort(UIFriends.sortNames);
        const t = UIEvent;
        t.updateListeners(t.PENDINGS_UPDATED, e);
    }

    static accept(e: string): void {
        if (!e) return;
        FriendsAPI.acceptFriendship(e);
        const i = UIEvent;
        i.updateListeners(i.PENDING_ACCEPTED, e);
    }

    static reject(e: string): void {
        if (!e) return;
        const i = DisneyFriends;
        const n = UIEvent;
        if (i.activeUser && i.activeUser.roster.pending[e]) {
            FriendsAPI.rejectFriendship(e);
        }
        n.updateListeners(n.PENDING_REJECTED, e);
    }

    static remove(e: string): void {
        if (!e) return;
        const i = UIFriends.getSwidIndex(e, this.sortedList);
        if (i > -1) {
            this.sortedList.splice(i, 1);
        }
        const t = UIEvent;
        t.updateListeners(t.PENDING_REMOVED, e);
    }
}

export class BarNotification {
    static state: string | null = null;
    static states = {
        CLOSED: "closed",
        OPEN: "open",
        ANIMATING: "animating"
    };
    static scroller: any = null;
    static dragging: boolean = false;
    static dragStartTime: number | null = null;
    static dragStartState: string | null = null;
    static dragStartPosition: { x: number; y: number } | null = null;
    static dragMinimum: number = 300;
    static animationSpeed: number = 300;
    static maxHeight: number = 176;
    static largeMaxHeight: number = 176;
    static largeHalfHeight: number = 102;
    static smallMaxHeight: number = 150;
    static timeoutDuration: number = 20000;
    static timeouts: { key: string; timeout: ReturnType<typeof setTimeout> }[] = [];
    static newFriendAnimationFrames: { [key: number]: number } = {
        3: 2,
        4: 2,
        5: 2,
        6: 2,
        7: 2,
        8: 2,
        14: 2,
        15: 2,
        16: 2,
        17: 2,
        18: 2,
        19: 2,
        20: 2,
        21: 2,
        22: 2,
        23: 2,
        24: 2,
        25: 2,
        26: 3,
        27: 2,
        29: 2
    };
    static pendingAccept: boolean = false;
    static friendsCount: number = 0;

    static init(): void {
        this.state = this.states.CLOSED;
        this.scroller = new Slider("D_F_Notifications", 20, 0, 130, 0, 100);
        this.scroller.bindMousewheel();
        this.friendsCount = UIFriends.arrAllFriends.length;

        const e = UIEvent;
        e.addListener(e.FRIENDS_COUNT, this.friendsCountUpdate.bind(this));
        e.addListener(e.PENDINGS_UPDATED, this.pendingUpdateCallback.bind(this));
        e.addListener(e.PENDING_ACCEPTED, this.friendshipAccepted.bind(this));
        e.addListener(e.PENDING_REJECTED, this.friendshipRejected.bind(this));
        e.addListener(e.PENDING_REMOVED, this.pendingRemoveCallback.bind(this));

        $("#D_F_NotificationHandleHolder").on('mousedown', this.startDragCallback);
    }

    static friendsCountUpdate(e: number): void {
        this.friendsCount = e;
        this.togglePanel(true);
        this.resizeHeight();
        $("#D_F_NotificationPanel").height(this.maxHeight);
        $("#D_F_Notifications").height(this.maxHeight - 24);
    }

    static update(): void {
        this.state = this.states.OPEN;
        this.checkScroller();
        setTimeout(this.showQueuedAccept, 300);
    }

    static togglePanel(e: boolean): void {
        this.resize();
        if (e && $("#D_F_Notifications").children().length) {
            this.showQueuedAccept();
            $("#D_F_NotificationPanel").show();
            this.state = this.states.OPEN;
            this.hideCount();
        } else {
            $("#D_F_NotificationPanel").hide();
            this.state = this.states.CLOSED;
            this.showCount();
        }
        this.updateHandle();
        const event = UIEvent;
        event.updateListeners(event.SUBPANEL_TOGGLED);
    }

    static togglePanelCallback(e: Event | JQuery.Event | null, i?: string | null): void {
        const n = this;
        if (e) DisneySocial.stopEvent(e);
        if (i) n.state = i == n.states.CLOSED ? n.states.OPEN : n.states.CLOSED;

        switch (n.state) {
            case n.states.CLOSED:
                n.togglePanel(true);
                n.hideCount();
                $("#D_F_NotificationPanel").animate({ height: n.maxHeight + "px" }, n.animationSpeed, function () {
                    n.state = n.states.OPEN;
                    n.updateHandle();
                });
                n.state = n.states.ANIMATING;
                break;
            case n.states.OPEN:
                $("#D_F_NotificationPanel").animate({ height: "20px" }, n.animationSpeed, function () {
                    n.state = n.states.CLOSED;
                    n.updateHandle();
                    n.showCount();
                    if (!$("#D_F_Notifications").children().length) n.togglePanel(false);
                });
                n.state = n.states.ANIMATING;
                break;
        }
    }

    static updateHandle(): void {
        let e = 44;
        if (this.state == this.states.OPEN) e = 38;
        Images.setAttrs($("#D_F_NotificationHandle"), e.toString());
    }

    static showCount(): void {
        const e = $("#D_F_Notifications .D_F_FriendNotification").length;
        if (e) {
            $("#D_F_NotificationCountText").html(e.toString());
            $("#D_F_NotificationCount, #D_F_NotificationCountText").css("display", "block");
        } else {
            this.hideCount();
        }
    }

    static hideCount(): void {
        $("#D_F_NotificationCount, #D_F_NotificationCountText").css("display", "none");
    }

    static checkHidingPanel(): void {
        if (!$("#D_F_Notifications").children().length) {
            this.togglePanelCallback(null, this.states.CLOSED);
        }
    }

    static checkBarHeight(e: () => void, i?: boolean): void {
        const n = $("#D_F_Notifications").height();
        this.resizeHeight();
        if (this.state == this.states.CLOSED && i !== true || n == this.maxHeight - 24) {
            $("#D_F_NotificationPanel").height(this.maxHeight);
            $("#D_F_Notifications").height(this.maxHeight - 24);
            e();
        } else {
            $("#D_F_NotificationPanel").animate({ height: this.maxHeight }, this.animationSpeed, e);
            $("#D_F_Notifications").animate({ height: this.maxHeight - 24 }, this.animationSpeed);
        }
        this.resizeActions();
    }

    static resizeHeight(): void {
        this.maxHeight = $("#D_F_NotificationPanel").hasClass("D_F_FriendNotificationBgL")
            ? $("#D_F_Notifications").children().length > 1 || $("#D_F_Notifications").find(".D_F_FriendNotificationAccept").length
                ? this.largeMaxHeight
                : this.largeHalfHeight
            : this.smallMaxHeight;
    }

    static pendingUpdateCallback(e: any): boolean {
        const i = this;
        const n = FriendsUI;
        const t = e.swid;
        if ($("#D_F_Notifications").find("input[value='" + t + "']").length) return false;

        const s = $("#D_F_FriendNotificationTemplate").contents().clone(true);
        s.find("input").val(t);
        s.find(".D_F_FriendNotificationName").html(e.name);
        s.find(".D_F_FriendNotificationMessage").html(FriendsUI.setText("D6"));
        n.getAvatarUriBySwid(s.find(".D_F_FriendNotificationAvatar"), t, 60, false);

        if (DisneyFriends.activeUser.isPreActivated) {
            s.find(".D_F_FriendNotificationActions").remove();
        } else {
            s.find(".D_F_FriendNotificationAvatar").on("click", () => FriendsUI.showPlayerCard(t));
            s.find(".D_F_FriendNotificationAdd").on("click", () => Pending.accept(t));
            s.find(".D_F_FriendNotificationDeny").on("click", () => {
                i.queue("Deny" + t, Pending.reject, [s, t], i.timeoutDuration);
                Pending.reject(t);
            });
        }

        $("#D_F_Notifications").append(s);
        if ($("#D_F_Notifications").children().length > 1) {
            i.checkScroller(true);
        } else {
            this.scroller.hide();
        }

        if (i.state == i.states.CLOSED) {
            i.togglePanelCallback(null, i.states.OPEN);
        }

        this.resizeActions();
        return true;
    }

    static pendingRemoveCallback(e: string): void {
        this.dequeue("Deny" + e);
    }

    static newFriendCallback(e: any): void {
        const i = this;
        let n = $("#D_F_Notifications");
        const t = FriendsUI;
        n = n.find(".D_F_FriendNotificationAccept");
        let s = e.name;
        e = e.swid;

        const existingNotification = $("#D_F_Notifications").find("input[value='" + e + "']");
        if (existingNotification.length) {
            i.removeNotification(existingNotification.parents(".D_F_FriendNotification"));
        }

        if (n.length) {
            s = parseInt(n.data("count"), 10);
            n.find(".D_F_FriendNotificationAcceptName").html(++s + " " + t.setText("D21"));
            n.data("count", s);
        } else {
            const newNotification = $("#D_F_FriendNotificationAcceptTemplate").contents().clone(true);
            newNotification.find(".D_F_FriendNotificationAcceptName").html(s);
            newNotification.data("count", 1);
            i.checkBarHeight(() => {
                i.scroller.scrollToTop();
                i.togglePanelCallback(null, i.states.OPEN);
                i.pendingAccept = true;
                if ($("#D_F_FriendsPanel:visible").length) {
                    i.showQueuedAccept();
                }
            }, true);
        }
    }

    static showQueuedAccept(): void {
        if ($("#D_F_FriendsPanel:visible").length !== 0) {
            const e = this;
            const i = $("#D_F_Notifications .D_F_FriendNotificationAccept");
            if (e.pendingAccept) {
                e.pendingAccept = false;
                if (i.length) {
                    i.slideDown(() => {
                        i.css("visibility", "visible").hide().fadeIn(() => {
                            FriendsUI.animateSprite("#D_F_NotificationAnimation", 80, 29, e.newFriendAnimationFrames, 10, () => {
                                i.empty();
                                e.removeNotification(i);
                            });
                        });
                    });
                }
            }
        }
    }

    static friendshipAccepted(e: string): void {
        this.removeNotification($("#D_F_Notifications").find("input[value='" + e + "']").parents(".D_F_FriendNotification"));
    }

    static friendshipRejected(e: string): void {
        this.removeNotification($("#D_F_Notifications").find("input[value='" + e + "']").parents(".D_F_FriendNotification"));
    }

    static removeNotification(element: JQuery<HTMLElement>, delay?: number, shouldHidePanel?: boolean): void {
        if (delay) {
            setTimeout(() => {
                this.removeNotification(element);
            }, delay);
        } else {
            element.fadeOut(() => {
                DisneySocial.unbindAll(element);
                element.show().css("visibility", "hidden");
                element.slideUp(() => {
                    element.remove();
                    this.checkScroller();
                    if (!shouldHidePanel) this.checkHidingPanel();
                });
            });
        }
    }

    static checkScroller(e?: boolean): void {
        this.resize();
        this.checkBarHeight(() => {
            const scroller = this.scroller;
            const childrenCount = $("#D_F_Notifications").children().length;
            if (childrenCount > 2 || (childrenCount > 1 && $("#D_F_NotificationPanel").hasClass("D_F_FriendNotificationBgS"))) {
                $("#D_F_NotificationPanel").addClass("D_F_FriendNotificationWithScroller");
                scroller.show();
                scroller.resize();
                scroller.scrollToTop();
            } else {
                $("#D_F_NotificationPanel").removeClass("D_F_FriendNotificationWithScroller");
                scroller.hide();
            }
        }, e);
    }

    static resize(): void {
        if (this.friendsCount < 9 && this.friendsCount > 5) {
            $("#D_F_NotificationPanel").css("bottom", "-5px").removeClass("D_F_FriendNotificationBgS").addClass("D_F_FriendNotificationBgL");
        } else if (this.friendsCount > 8) {
            $("#D_F_NotificationPanel").css("bottom", "20px").removeClass("D_F_FriendNotificationBgS").addClass("D_F_FriendNotificationBgL");
        } else {
            $("#D_F_NotificationPanel").css("bottom", "-5px").removeClass("D_F_FriendNotificationBgL").addClass("D_F_FriendNotificationBgS");
        }
        $("#D_F_NotificationPanel").css("width", ($("#D_F_FriendSection").width() + 32).toString() + "px");
        this.scroller.resize();
        this.resizeActions();
    }

    static resizeActions(): void {
        let e, i;
        if ((i = $("#D_F_Notifications").find(".D_F_FriendNotificationYN")[0]) && FriendsUI.isVisible($(i))) {
            e = $(i).children(":first").width();
            e += $(i).children(":last").width();
            e += 30;
            $(".D_F_FriendNotificationYN").css("width", e.toString() + "px").css("margin", "0 auto");
            i = $(i).parent().parent().width() - 5;
            if ($("#D_F_NotificationPanel").hasClass("D_F_FriendNotificationBgL")) {
                $(".D_F_FriendNotificationYN").parent().css("width", e.toString() + "px");
            } else {
                $(".D_F_FriendNotificationYN").parent().css("width", i.toString() + "px");
            }
        }
    }

    static startDragCallback(e: JQuery.MouseDownEvent): void {
        const i = this;
        DisneySocial.stopEvent(e);
        i.dragStartState = i.state;
        i.dragStartTime = new Date().getTime();
        i.dragging = true;
        i.dragStartPosition = { x: e.pageX, y: e.pageY };
        $(document).on('mouseup', i.endDragCallback);
        $(document).on('mousemove', i.dragCallback);
    }

    static dragCallback(e: JQuery.MouseMoveEvent): void {
        DisneySocial.stopEvent(e);
        const i = this;
        const n = i.dragStartPosition!.y;
        const newY = e.pageY;
        const deltaY = i.dragStartState == i.states.OPEN ? newY - n : n - newY;
        if (deltaY <= i.maxHeight - 20 && deltaY >= 0) {
            if (i.dragStartState == i.states.OPEN) {
                $("#D_F_NotificationPanel").css("height", (i.maxHeight - deltaY).toString() + "px");
            } else {
                $("#D_F_NotificationPanel").css("height", (deltaY + 20).toString() + "px");
            }
        }
    }

    static endDragCallback(e: JQuery.MouseUpEvent): void {
        const i = this;
        const n = new Date().getTime();
        if (i.dragging && i.dragStartTime! < n - i.dragMinimum) {
            const dragUp = i.dragStartPosition!.y - e.pageY > $("#D_F_Notifications").height() / 2;
            const dragDown = e.pageY - i.dragStartPosition!.y > $("#D_F_Notifications").height() / 2;
            if (i.dragStartState == i.states.CLOSED && dragUp || i.dragStartState == i.states.OPEN && !dragDown) {
                i.togglePanelCallback(null, i.states.OPEN);
            } else if (i.dragStartState == i.states.CLOSED || i.dragStartState == i.states.OPEN && dragDown) {
                i.togglePanelCallback(null, i.states.CLOSED);
            }
        } else {
            i.togglePanelCallback(e);
        }
        i.dragging = false;
        i.dragStartTime = null;
        i.dragStartState = null;
        $(document).off("mouseup", i.endDragCallback);
        $(document).off("mousemove", i.dragCallback);
    }

    static queue(e: string, i: (...args: any[]) => void, n: any[], t: number): void {
        const timeout = setTimeout(() => {
            i.apply(this, n);
        }, t);
        this.timeouts.push({ key: e, timeout });
    }

    static dequeue(e: string): void {
        this.timeouts = $.grep(this.timeouts, function (i) {
            if (i.key !== e) return true;
            clearTimeout(i.timeout);
            return false;
        });
    }
}

export class AddFriend {
    static searchName: string = "";
    static currentFilter: string = "";
    static filterCount: number = 0;
    static filterStep: number = 200;
    static filterDelay: number = 50;
    static filterTimeout: ReturnType<typeof setTimeout> | null = null;
    static ctrlDown: boolean = false;
    static friendRequestAnimationFrames: { [key: number]: number } = {
        1: 9,
        17: 2,
        18: 8,
        19: 2
    };
    static modes = {
        STANDALONE: 1,
        FULL: 2
    };
    static mode: number;
    static scroller: any;
    static friendsCount: number;
    static searching: boolean = false;
    static typingTimeout: ReturnType<typeof setTimeout> | null = null;
    static filterRunning: boolean = false;
    static filterUpdated: boolean = false;

    static init(): void {
        FriendsUI.frameIt20("D_F_AddFriendExpanded", "D_F_Box20Template", 164, 150);
        this.scroller = new Slider("D_F_AddFriendGrid", 15, -15, 110, 0, 100);
        this.scroller.bindMousewheel();
        this.friendsCount = UIFriends.arrAllFriends.length;

        const e = FriendsEvent;
        e.addListener(e.FOUND_PLAYER, this.foundPlayer.bind(this));
        e.addListener(e.FIND_PLAYER_EXISTING_FRIEND, this.foundPlayerExisting.bind(this));
        e.addListener(e.FIND_PLAYER_EXISTING_IGNORE, this.foundPlayerIgnored.bind(this));
        e.addListener(e.FIND_PLAYER_NOT_FOUND, this.playerNotFound.bind(this));
        const uiEvent = UIEvent;
        uiEvent.addListener(uiEvent.FRIENDS_COUNT, this.friendsCountUpdate.bind(this));

        $("#D_F_AddFriendClose").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            this.closePanel();
        });

        $("#D_F_AddFriendFinderFieldDef").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            this.setFocus();
        });

        $(".D_F_AddFriendItem").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            this.addClick(e.currentTarget as HTMLElement);
        });

        $("#D_F_AddFriendFinderFind").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            this.findClick();
        });

        $(".D_F_AddFriendFavorite").on('mousedown', e => {
            DisneySocial.stopEvent(e);
            this.toggleBest(e.currentTarget as HTMLElement);
        });

        document.getElementById("D_F_AddFriendFinderInput")!.onselectstart = e => {
            e.stopPropagation();
        };
    }

    static friendsCountUpdate(e: number): void {
        this.friendsCount = e;
        this.togglePanel();
    }

    static findClick(): boolean {
        if (this.searching) return false;
        const i = this.trimInput();
        if (i.length < 1) {
            this.setFocus();
            return false;
        }
        $("#D_F_AddFriendError, #D_F_AddFriendResults, #D_F_AddFriendGrid").css("display", "none");
        this.scroller.hide();
        $("#D_F_AddFriendFinderField").prop("value", i);
        this.showExpanded();
        $("#D_F_AddFriendMessage").css("display", "none");
        $("#D_F_AddFriendBusy").show();
        this.searching = true;
        this.findPlayer(i);
        return true;
    }

    static trimInput(): string {
        let value = $("#D_F_AddFriendFinderField").prop("value") as string;
        return value.trim();
    }

    static setFocus(): void {
        this.showExpanded();
        setTimeout(() => {
            $("#D_F_AddFriendFinderField").trigger('focus');
        }, 100);
    }

    static resetPlacehoder(): void {
        $("#D_F_AddFriendFinderField").prop("value", "");
        $("#D_F_AddFriendFinderFieldDef").show();
    }

    static addClick(e: HTMLElement): void {
        $(e).off("mousedown");
        const swid = $(e).find("input[type=hidden]").val() as string;
        this.addRequest(swid);
        const animation = $('<div id="D_F_AddFriendAnimation" />');
        FriendsUI.animateSprite("#D_F_AddFriendAnimation", 100, 21, this.friendRequestAnimationFrames, 15, () => {
            this.clearFilterResults();
            $("#D_F_AddFriendResults").css("display", "none");
            $("#D_F_AddFriendGrid").css("display", "none");
            $("#D_F_AddFriendFinderField").val("");
            this.closePanel();
        });
        animation.css({
            top: $("#D_F_AddFriendResults").find(".D_F_AddFriendItem").position().top + 10,
            left: ($("#D_F_AddFriendResults").width() - 100) / 2 + 10
        });
        $("#D_F_AddFriendResults").find(".D_F_AddFriendItem").css("display", "none");
        $("#D_F_AddFriendResults").append(animation);
    }

    static keyDown(e: KeyboardEvent | JQuery.Event): boolean {
        if (e.which == 17) {
            this.ctrlDown = true;
            return false;
        }
        this.searchName = $("#D_F_AddFriendFinderField").prop("value") as string;
        $("#D_F_AddFriendError").empty().css("display", "none");
        if (this.ctrlDown && e.which == 86) {
            $("#D_F_AddFriendFinderFieldDef").css("display", "none");
        }
        const i = this.trimInput();
        if ((i.length <= 1 && (e.which == 8 || e.which == 46)) || (i.length == 0 && (e.which < 48 || e.which > 110)) || (this.ctrlDown && e.which == 8)) {
            $("#D_F_AddFriendFinderField").prop("value", "");
            this.clearFilterResults();
            $("#D_F_AddFriendMessage").show();
            $("#D_F_AddFriendBusy").css("display", "none");
            this.searching = false;
            return true;
        }
        $("#D_F_AddFriendFinderFieldDef").css("display", "none");
        if (e.which == 13) {
            $("#D_F_AddFriendFinderFind").trigger('mousedown');
        } else {
            $("#D_F_AddFriendBusy").css("display", "none");
            $("#D_F_AddFriendMessage").show();
            this.searching = false;
        }
        if (this.typingTimeout) clearTimeout(this.typingTimeout);
        return true;
    }

    static keyUp(e: KeyboardEvent | JQuery.Event): void {
        if (e.which == 17) {
            this.ctrlDown = false;
        } else {
            if (e.which == 32 && !this.searchName) {
                $("#D_F_AddFriendFinderField").prop("value", "");
            }
            if (e.which == 46 && this.searchName) {
                $("#D_F_AddFriendFinderField").prop("value", this.searchName.substring(0, this.searchName.length - 1));
            }
            if (this.searchName.length !== ($("#D_F_AddFriendFinderField").prop("value") as string).length) {
                this.searchName = $("#D_F_AddFriendFinderField").prop("value") as string;
                if (this.searchName.length > 0) {
                    $("#D_F_AddFriendFinderFieldDef").css("display", "none");
                }
                if (this.typingTimeout) clearTimeout(this.typingTimeout);
                if (this.friendsCount > 9 && e.which !== 13) {
                    this.typingTimeout = setTimeout(() => {
                        this.updateFilter();
                    }, 200);
                } else {
                    this.clearFilterResults();
                }
            }
        }
    }

    static updateFilter(): void {
        this.currentFilter = this.searchName.toLowerCase();
        this.clearFilterResults();
        if (this.filterRunning) {
            this.filterUpdated = true;
        } else {
            this.lookupFriends();
        }
    }

    static stopFilter(): void {
        clearTimeout(this.filterTimeout!);
        this.filterUpdated = false;
        this.filterRunning = false;
        this.filterCount = 0;
    }

    static lookupFriends(): void {
        this.filterRunning = true;
        const e = () => {
            const i = this;
            const n: string[] = [];
            const t: string[] = [];
            const s: string[] = [];
            const r = i.filterCount;
            let d = true;
            if (i.filterUpdated) {
                i.stopFilter();
                i.clearFilterResults();
                i.lookupFriends();
            } else {
                if (i.currentFilter) {
                    var filter = function (e) {
                        for (var i = 0; i < 11; i++) e = e.replace(RegExp("\\" + "\\.[]()*+?^$"[i], "g"), "\\" + "\\.[]()*+?^$"[i]);
                        return e
                    }(i.currentFilter);

                    let o = RegExp("^" + filter);
                    let c = RegExp(filter + "$");
                    let a = RegExp(filter);
                    const l = UIFriends.arrAllFriends;
                    for (let u = r; u < r + i.filterStep; u++) {
                        const F = l[u];
                        const h = $("#D_F_FriendsPanel").data(F);
                        if (F == undefined) {
                            i.stopFilter();
                            d = false;
                            break;
                        }
                        const name = h.name.toLowerCase();
                        if (o.test(name) && !n.includes(F)) {
                            n.push(F);
                        } else if (c.test(name) && !s.includes(F)) {
                            s.push(F);
                        } else if (a.test(name) && !t.includes(F)) {
                            t.push(F);
                        }
                        i.filterCount = u + 1;
                    }
                } else {
                    i.stopFilter();
                    i.clearFilterResults();
                }
                i.updateGrid([...n, ...s, ...t]);
                if (d) {
                    i.filterTimeout = setTimeout(e, i.filterDelay);
                }
            }
        };
        e();
    }

    static clearFilterResults(): void {
        DisneySocial.unbindAll("#D_F_AddFriendResults");
        $("#D_F_AddFriendResults").empty();
        DisneySocial.unbindAll("#D_F_AddFriendGrid");
        $("#D_F_AddFriendGrid").empty();
        this.scroller.hide();
        $("#D_F_AddFriendMessage").show();
        if (!this.searchName) {
            $("#D_F_AddFriendFinderFieldDef").show();
        }
    }

    static updateGrid(e: string[]): void {
        const i = $("#D_F_AddFriendGrid");
        e.forEach((n) => {
            i.append(this.getFriendHTML(n));
        });
        i.show();
        $("#D_F_AddFriendResults").css("display", "none");
        const childrenCount = i.children().length;
        if (childrenCount) {
            $("#D_F_AddFriendMessage").css("display", "none");
            if (childrenCount > 3) {
                this.scroller.show();
                this.scroller.resize();
                this.scroller.scrollToTop();
                this.scroller.bindMousewheel();
            } else {
                this.scroller.hide();
                this.scroller.scrollToTop();
                this.scroller.unbindMousewheel();
            }
        } else {
            $("#D_F_AddFriendMessage").show();
            this.scroller.hide();
        }
    }

    static getFriendHTML(e: string): JQuery {
        const n = $("#D_F_FriendsPanel").data(e);
        const t = $("#D_F_AddFriendResultsTileTemplate").contents().clone(true);
        const s = $(t).find(".D_F_AddFriendResultsTileAvatarCard");
        const r = $(t).find(".D_F_AddFriendFavorite");
        t.find("input[type=hidden]").val(e);
        FriendsUI.getAvatarUriByFriendId(t.find(".D_F_AddFriendResultsTileAvatar"), e, n.Id, 88, true);
        if (n.status == FriendsPresence.Status.ONLINE) {
            $(s).addClass("D_F_AvatarBg");
            t.find(".D_F_FriendAvatarMask").show();
            t.find(".D_F_FriendAvatarOff").css("display", "none");
        } else {
            t.find(".D_F_FriendAvatarOff, .D_F_FriendAvatarMask").show();
            $(s).addClass("D_F_AvatarBg");
            $(t).find(".D_F_AddFriendResultsTileJumpStatus .D_F_AddFriendStatus").show().html(FriendsUI.setText("D15"));
        }
        $(s).on("click", (i) => {
            DisneySocial.stopEvent(i);
            FriendsUI.showPlayerCard(e);
        });
        this.updateBestFriend(r, e);
        t.find(".D_F_AddFriendResultsTileName").html(n.name);
        return t as JQuery;
    }

    static toggleBest(e: HTMLElement): void {
        const swid = $(e).siblings("input[type=hidden]").val() as string;
        FriendsUI.setBestFriend(swid);
        CP.sendToggleBestFriend(swid);
    }

    static updateBestFriend(e: JQuery<HTMLElement>, i: string, n?: number): void {
        if (n == 1 || (n == undefined && this.isBestFriend(i))) {
            Images.setAttrs(e, "20", false);
        } else {
            Images.setAttrs(e, "22", false);
        }
    }

    static isBestFriend(e: string): boolean {
        const type = $("#D_F_FriendsPanel").data(e).type;
        const i = UIFriends;
        return type == i.BEST_CHARACTER || type == i.BEST_FRIEND;
    }

    static updateSearchTile(e: string): void {
        this.updateBestFriend(
            $("#D_F_AddFriendResults").find("input[value='" + e + "']").siblings(".D_F_AddFriendFavorite"),
            e
        );
    }

    static openPanel(): void {
        this.setMode();
        this.clearFilterResults();
        this.searching = false;
        $("#D_F_AddFriendError").empty().css("display", "none");
        $("#D_F_AddFriendResults").css("display", "none");
        $("#D_F_AddFriendGrid").css("display", "none");
        $("#D_F_AddFriendBusy").css("display", "none");
        if (this.mode == this.modes.FULL) {
            $("#D_F_AddFriendDivider").show();
        }
        $("#D_F_AddFriendMessage, #D_F_AddFriendClose").show();
        $("#D_F_AddFriendPanel").show();
        this.resetPlacehoder();
        this.resize();
        $("#D_F_AddFriendFinderField").on("focus", () => {
            this.showExpanded();
        });
        $("#D_F_AddFriendFinder").on("keydown", e => {
            this.keyDown(e);
        }).on("keyup", (e: JQuery.KeyUpEvent) => {
            this.keyUp(e);
        });
    }

    static showAddFriend(e: HTMLElement): boolean {
        const i = UIFriends;
        this.setMode();
        if (this.mode !== this.modes.STANDALONE) return false;
        this.openPanel();
        const positionTop = $(e).parent().position().top / i.TILE_HEIGHT;
        switch (Math.floor(positionTop)) {
            case 0:
                $("#D_F_AddFriendPanel").css("bottom", "").css("top", "40px");
                break;
            case 1:
                $("#D_F_AddFriendPanel").css("bottom", "").css("top", "150px");
                break;
            case 2:
                $("#D_F_AddFriendPanel").css("top", "").css("bottom", "7px");
                break;
        }
        this.setFocus();
        this.showExpanded();
        this.resize();
        return true;
    }

    static showExpanded(): boolean {
        if ($("#D_F_AddFriendExpanded").show()) return false;
        this.clearFilterResults();
        this.resetPlacehoder();
        $("#D_F_AddFriendError").empty().css("display", "none");
        $("#D_F_AddFriendResults").css("display", "none");
        $("#D_F_AddFriendGrid").css("display", "none");
        FriendsUI.setTagText($("#D_F_AddFriendMessage").get(0));
        $("#D_F_AddFriendPanel").css("height", "150px");
        $("#D_F_AddFriendExpanded").show();
        $("#D_F_AddFriendDivider").css("display", "none");
        $("#D_F_AddFriendMessage, #D_F_AddFriendClose").show();
        return true;
    }

    static closePanel(): void {
        const e = this;
        e.resize();
        $("#D_F_AddFriendFinderField").val("").trigger("blur");
        e.clearFilterResults();
        e.resetPlacehoder();
        e.searching = false;
        $("#D_F_AddFriendExpanded").css("display", "none");
        $("#D_F_AddFriendBusy").css("display", "none");
        $("#D_F_AddFriendError").empty().css("display", "none");
        if (e.mode == e.modes.STANDALONE) {
            $("#D_F_AddFriendFinder").off("keyup").off("keydown");
            $("#D_F_AddFriendPanel").css("display", "none");
        } else if (e.mode == e.modes.FULL) {
            $("#D_F_AddFriendDivider").show();
            $("#D_F_AddFriendPanel").css("height", "15px");
        }
    }

    static setMode(): void {
        this.mode = this.friendsCount < 9 ? this.modes.STANDALONE : this.modes.FULL;
    }

    static resize(): void {
        this.setMode();
        if (this.mode == this.modes.STANDALONE && this.friendsCount > 5) {
            $("#D_F_AddFriendPanel, .D_F_AddFriendExpanded_BoxW20").css("width", "264px");
            $("#D_F_AddFriendPanel").css({
                height: "150px",
                left: "8px"
            });
            $("#D_F_AddFriendDivider").css("width", ($("#D_F_FriendSection").width() + 32).toString() + "px");
        } else if (this.mode == this.modes.FULL) {
            $("#D_F_AddFriendPanel").css({
                width: $("#D_F_FriendSection").width().toString() + "px",
                left: "0px",
                top: "auto"
            });
            $(".D_F_AddFriendExpanded_BoxW20").css("width", $("#D_F_FriendSection").width().toString() + "px");
            $("#D_F_AddFriendPanel").css("height", "15px");
            $("#D_F_AddFriendDivider").css("width", ($("#D_F_FriendSection").width() + 32).toString() + "px");
        } else {
            $("#D_F_AddFriendPanel").css({
                width: "164px",
                left: "8px"
            });
            $(".D_F_AddFriendExpanded_BoxW20").css("width", "164px");
            $("#D_F_AddFriendPanel").css("height", "150px");
        }
        this.resizeFinder();
    }

    static resizeFinder(): void {
        const e = $("#D_F_AddFriendFinderFind");
        e.css("width", ($("#D_F_AddFriendBtnText").width() + 10).toString() + "px");
        let width = e.parent().width() - (e.width() + 30);
        if (width < 80) width = 80;
        $("#D_F_AddFriendFinderInput").css("width", width.toString() + "px");
        $("#D_F_AddFriendFinderField").css("width", width.toString() + "px");
        $("#D_F_AddFriendFinderFieldDef").css("width", (width - 4).toString() + "px");
    }

    static findPlayer(e: string): boolean {
        if (!e) return false;
        this.searchName = e;
        const i = this.getCharacter(e);
        if (i[0] > -1) {
            this.foundCharacter(i[0], i[1]);
            return false;
        }
        $("#D_F_AddFriendResults").css("display", "none");
        $("#D_F_AddFriendGrid").css("display", "none");
        this.scroller.hide();
        FriendsAPI.findPlayerByName(e);
        return true;
    }

    static getCharacter(e: string): [number, string] {
        let i, n = -1, t = e;
        const s = SocialData.mascots;
        for (i in s) {
            if (s.hasOwnProperty(i) && s[i].name.toLowerCase() == e.toLowerCase()) {
                n = s[i].mascot_id;
                t = s[i].name;
                break;
            }
        }
        return [n, t];
    }

    static foundPlayer(e: any): boolean {
        if (!this.searching) return false;
        const i = FriendsUI;
        $("#D_F_AddFriendBusy").css("display", "none");
        if (e == null || e.swid == null || e.name == null) {
            this.showError(i.setText("D17"));
            this.resetPlacehoder();
            return false;
        }
        if (e.swid == DisneyFriends.activeConnection.swid) {
            this.showError(i.setText("D18"));
            return false;
        }
        const n = $("#D_F_AddFriendResults");
        DisneySocial.unbindAll("#D_F_AddFriendResults");
        n.empty().append($("#D_F_AddFriendResultItemTemplate").contents().clone(true));
        const t = $(n).find(".D_F_AddFriendItemName")[0];
        const s = $(n).find(".D_F_AddFriendItemAvatar")[0];
        const input = $(n).find("input")[0];
        $(t).text(e.name);
        i.getAvatarUriByFriendId(s, e.swid, e.playerId, 60, false);
        $(input).prop("value", e.swid);
        $("#D_F_AddFriendMessage").css("display", "none");
        $("#D_F_AddFriendResults").show();
        this.resetPlacehoder();
        this.scroller.hide();
        return true;
    }

    static foundPlayerExisting(e: string): boolean {
        if (!this.searching) return false;
        this.showError(FriendsUI.setText("D19").replace("{0}", e));
        return true;
    }

    static foundPlayerIgnored(e: string): boolean {
        if (!this.searching) return false;
        this.showError(FriendsUI.setText("D20").replace("{0}", e));
        return true;
    }

    static foundCharacter(e: number, i: string): boolean {
        if (!this.searching) return false;
        $("#D_F_AddFriendBusy").css("display", "none");
        const t = SocialData.characters;
        if (!t.hasOwnProperty(e) || !t[e].info) {
            this.playerNotFound(i);
            return false;
        }
        const n = t[e].info;
        let s = 0;
        if (t.hasOwnProperty(e) && t[e].img) {
            s = t[e].img;
        }
        this.clearFilterResults();
        const results = $("#D_F_AddFriendResults");
        results.empty().append($("#D_F_AddFriendResultCharTemplate").contents().clone(true));
        let r = false;
        if ($("#D_F_AddFriendPanel").width() >= 280) {
            r = true;
        }
        const input = $(results).find("input")[0];
        const char = $(results).find(".D_F_AddFriendChar")[0];
        const charCard = $(results).find(".D_F_AddFriendCharCard")[0];
        const avatarMask = $(results).find(".D_F_FriendAvatarMask")[0];
        const charAvatar = $(results).find(".D_F_AddFriendCharAvatar")[0];
        const charInfo = $(results).find(".D_F_AddFriendCharInfo")[0];
        const F = "character_" + e.toString();
        $(input).prop("value", F);
        if (s > 0) {
            if (r) {
                $(charCard).css("width", "83px").css("height", "83px");
                $(avatarMask).show();
                $(charAvatar).prop("width", "88").prop("height", "88").css("left", "-3px").css("top", "-3px");
                FriendsUI.getAvatarUriByFriendId(charAvatar, F, e.toString(), 88, false);
            } else {
                $(avatarMask).css("display", "none");
                $(charAvatar).prop("width", "60").prop("height", "60").css("left", "0px").css("top", "0px");
                $(charCard).css("width", "60px").css("height", "60px");
                FriendsUI.getAvatarUriByFriendId(charAvatar, F, e.toString(), 60, false);
            }
            $(charCard).show();
            $(charInfo).css("left", "40%");
            $(char).css("left", "0");
            results.css("left", "0px");
        } else {
            $(charCard).css("display", "none");
            $(charInfo).css("left", "21%");
            $(char).css("left", "5px");
            results.css("left", "0");
        }
        $(charInfo).text(n).show();
        $("#D_F_AddFriendMessage").css("display", "none");
        $("#D_F_AddFriendResults").show();
        this.scroller.hide();
        this.setFocus();
        return true;
    }

    static playerNotFound(e: string): boolean {
        if (!this.searching) return false;
        if (!e) e = this.searchName!;
        this.showError(FriendsUI.setText("D17").replace("{0}", e));
        return true;
    }

    static showError(e: string): void {
        $("#D_F_AddFriendBusy, #D_F_AddFriendMessage").css("display", "none");
        $("#D_F_AddFriendError").empty().text(e).show();
        $("#D_F_AddFriendError").css("top", ($("#D_F_AddFriendError").parent().height() - $("#D_F_AddFriendError").height() - 20) / 2);
    }

    static addRequest(e: string): boolean {
        if (e == null) return false;
        FriendsAPI.requestFriendship(e);
        return true;
    }

    static togglePanel(): void {
        if (this.friendsCount > 8) {
            if ($("#D_F_AddFriendPanel").css("display") == "none") {
                this.openPanel();
            }
        } else {
            if ($("#D_F_AddFriendPanel").css("display") !== "none") {
                this.closePanel();
            }
        }
        const e = UIEvent;
        e.updateListeners(e.SUBPANEL_TOGGLED);
    }
}

export class FriendsUI {
    static Event = UIEvent;
    static Images = Images;
    static HudNotification = HudNotification;
    static ContextNotification = ContextNotification;
    static Data = UIData;
    static Me = Me;
    static Friends = UIFriends;
    static FriendsTile = FriendsTile;
    static Pending = Pending;
    static BarNotification = BarNotification;
    static AddFriend = AddFriend;

    static gotLayout: boolean = false;
    static DELAY_NORMAL: number = 10000;
    static DELAY_FIRST: number = 30000;
    static BEST_HINT_COUNT_MAX: number = 2;
    static bestCount: number = 0;
    static bestEnabled: boolean = false;
    static delay: number = FriendsUI.DELAY_FIRST;
    static notificationAware: boolean = false;

    static init(): void {
        $("#D_F_FriendSection").draggable({
            containment: "window"
        });
        this.bestCount = 0;
        this.bestEnabled = false;
        this.delay = this.DELAY_FIRST;
        this.notificationAware = false;

        const e = FriendsEvent;
        e.addListener(e.DISCONNECTED, this.friendDisconnect.bind(this));
        e.addListener(e.CONNECTED, this.friendConnect.bind(this));
        e.addListener(e.FRIENDS_GOT_SETTINGS, this.updateSettings.bind(this));

        const socialEvent = SocialEvent;
        socialEvent.addListener(socialEvent.EVENT_STOPPED, this.bubbleEvent.bind(this));

        this.friendConnect();
    }

    static initUIComponents(): void {
        Me.init();
        UIFriends.init();
        FriendsTile.init();
        Pending.init();
        AddFriend.init();
        BarNotification.init();
        ContextNotification.init();
        $(window).on("resize", FriendsUI.resized);
        HudNotification.init();
    }

    static updateSettings(): void {
        const settings = DisneyFriends.activeUser.settings;
    
        let bestHintCount = settings.getSetting(Settings.Constants.BEST_HINT_COUNT);
        if (bestHintCount !== undefined) {
            bestHintCount = parseInt(bestHintCount, 10);
            if (!isNaN(bestHintCount)) {
                this.bestCount = bestHintCount;
            }
        }
    
        let bestFriendEnabled = settings.getSetting(Settings.Constants.BEST_FRIEND_ENABLED);
        if (bestFriendEnabled !== undefined && (bestFriendEnabled === "true" || bestFriendEnabled === "false")) {
            this.bestEnabled = true;
        }
    
        let notificationAware = settings.getSetting(Settings.Constants.NOTIFICATION_AWARE);
        if (notificationAware !== undefined && (notificationAware === "true" || notificationAware === "false")) {
            if (notificationAware === "true") {
                this.notificationAware = true;
                this.delay = this.DELAY_NORMAL;
            } else {
                this.notificationAware = true;
            }
        }
    
        let friendsEnabled = settings.getSetting(Settings.Constants.FRIENDS_ENABLED);
        let isPreActivated = false;
        if (friendsEnabled === "false") {
            isPreActivated = true;
        }
    
        DisneyFriends.activeUser.setIsPreActivated(isPreActivated);
    
        if (DisneyFriends.activeUser.isPreActivated) {
            this.preActivatedFriendsPanel();
        }
    }

    static preActivatedFriendsPanel(): void {
        if (!$("#D_F_FriendsPanel .preactivated-message").length) {
            const e = this.setText("D26");
            const i = this.setText("D27");

            $("#D_F_FriendSection").addClass("preactivated");
            $("#D_F_FriendsPanel").prepend(
                `<div export class="preactivated-message"><p>${e}</p><div export class="about-activation"><a href="#" export class="button">${i}</a></div></div>`
            );

            $(".preactivated-message .about-activation .button").on("click", function (e) {
                e.preventDefault();
                CP.handleShowPreactivation();
                $("#D_F_FriendSection").fadeOut();
            });
        }

        $("#D_F_FriendsGrid").remove();
    }

    static friendConnect(): void {
        $("#D_F_FriendSectionReconnect").css("display", "none");
    }

    static friendDisconnect(): void {
        $("#D_F_FriendSectionReconnect").show();
    }

    static resized(): void {
        HudNotification.reposition();
    }

    static toggleFriendsSection(): void {
        if ($("#D_F_FriendSection").css("display") == "none") {
            this.showFriendsSection();
        } else {
            this.hideFriendsSection();
        }
    }

    static showFriendsSection(): void {
        if ($("#D_F_FriendSection").css("display") == "none") {
            if ($("#D_F_HudNotification").css("display") == "none") {
                FriendsAPI.pollJumpStatus(true);
            }

            if (DisneySocial.ieVer > 0 && DisneySocial.ieVer < 9) {
                $("#D_F_FriendSection").show();
            } else {
                $("#D_F_FriendSection").fadeIn(200);
            }

            UIFriends.updateGrid();
            UIFriends.updateWidget();
            AddFriend.closePanel();
            BarNotification.update();
            ContextNotification.bestHintShown = false;
            ContextNotification.showBestHint();
            Images.preloadAvatars();
        }
    }

    static hideFriendsSection(): void {
        if ($("#D_F_FriendSection").css("display") !== "none") {
            ContextNotification.cancel();

            if (DisneySocial.ieVer > 0 && DisneySocial.ieVer < 9) {
                $("#D_F_FriendSection").css("display", "none");
            } else {
                $("#D_F_FriendSection").fadeOut(200);
            }

            if ($("#D_F_HudNotification").css("display") == "none") {
                FriendsAPI.pollJumpStatus(false);
            }
        }
    }

    static getCharacterAvatar(e: JQuery.Selector | HTMLElement | JQuery, i: string, n: number): void {
        let t = `images/CP/${i}_${n.toString()}`;
        const panelData = $("#D_F_FriendsPanel").data(i);

        if (panelData) {
            const status = panelData.status;
            if (status && status == FriendsPresence.Status.ONLINE) {
                t += "Off";
            }
        }

        t += ".png";
        t = DisneySocial.getUrl(t, true);
        Images.checkValidAvatar(e, t, n);
    }

    static getAvatarUriByFriendId(e: JQuery.Selector | HTMLElement | JQuery, i: string, n: string | null, t: number, s: boolean): boolean {
        const images = Images;
        t = t || 88;
        t = t < 88 ? 60 : 88;

        if (i.startsWith("character_")) {
            this.getCharacterAvatar(e, i, t);
            return false;
        }

        if (i && i !== "null") {
            const avatarUrl = Environment.getAvatarUrl(i, {
                size: t,
                language: DisneySocial.getPageLang(),
                photo: s,
                bypassPlayerSettingCache: false
            });
            images.checkValidAvatar(e, avatarUrl, t);
            return true;
        }

        const longdesc = t < 88 ? "14" : "18";
        $(e as JQuery.Selector).off("load").off("error").prop("longdesc", longdesc);
        Images.setAttrs(e, longdesc, false);
        return false;
    }

    static getAvatarUriBySwid(e: JQuery.Selector | HTMLElement | JQuery, i: string, n: number, t: boolean): void {
        let s: string | null = null;
        const gridData = $("#D_F_FriendsGrid").data(i);

        if (gridData) {
            s = gridData.Id;
        }

        this.getAvatarUriByFriendId(e, i, s, n, t);
    }

    static getFriendNameBySwid(e: string): string {
        let i = "Friend";
        const gridData = $("#D_F_FriendsGrid").data(e);

        if (gridData) {
            i = gridData.name;
        }

        return i;
    }

    static getPendingNameBySwid(e: string): string {
        let i = "";
        const activeUser = DisneyFriends.activeUser;

        if (e && activeUser && activeUser.roster.pending[e] && activeUser.roster.pending[e].name) {
            i = activeUser.roster.pending[e].name;
        }

        return i;
    }

    static disableSelectText(e: JQuery.Selector | HTMLElement): void {
        if (document.body.style.webkitUserSelect !== undefined) {
            $(e as JQuery.Selector).each(function () {
                this.style.webkitUserSelect = "none";
            });
        } else if (document.body.onselectstart !== undefined) {
            $(e as JQuery.Selector).each(function () {
                this.onselectstart = function () {
                    window.event.cancelBubble = true;
                    return false;
                };
            });
        } /* else if (document.body.style.MozUserSelect !== undefined) {
            $(e as JQuery.Selector).each(function () {
                this.style.MozUserSelect = "-moz-none";
            });
        } */
    }

    static frameIt(e: string, i: string, n: number, t: number, s: string): void {
        $("#" + e).append($("#" + i + " > div").clone(true));
        $("#" + e + " > .D_F_BoxW").addClass(e + "_BoxW");
        $("#" + e + " > .D_F_BoxH").addClass(e + "_BoxH");
        $("#" + e).addClass(e + "_BoxW").addClass(e + "_BoxH");
        $("." + e + "_BoxW").css("width", n + "px");
        $("." + e + "_BoxH").css("height", t + "px");
        $("#" + e + " > .D_F_BoxC").addClass("D_F_BoxCBg" + s);
        $("#" + e + " > .D_F_BoxT").addClass("D_F_BoxTBg" + s);
        $("#" + e + " > .D_F_BoxB").addClass("D_F_BoxBBg" + s);
        $("#" + e + " > .D_F_BoxR").addClass("D_F_BoxRBg" + s);
        $("#" + e + " > .D_F_BoxL").addClass("D_F_BoxLBg" + s);
        $("#" + e + " > .D_F_BoxI").addClass("D_F_BoxIBg" + s);
    }

    static frameIt20(e: string, i: string, n: number, t: number): void {
        $("#" + e).append($("#" + i + " > div").clone(true));
        $("#" + e + " > .D_F_BoxW20").addClass(e + "_BoxW20");
        $("#" + e + " > .D_F_BoxH20").addClass(e + "_BoxH20");
        $("#" + e).addClass(e + "_BoxW20").addClass(e + "_BoxH20");
        $("." + e + "_BoxW20").css("width", n + "px");
        $("." + e + "_BoxH20").css("height", t + "px");
    }

    static setTheme(): void {
        const e = "url('" + DisneySocial.getUrl("css/themes/CP/D_F_btnCloseHover.png", true) + "')";
        const i = "url('" + DisneySocial.getUrl("css/themes/CP/D_F_btnClose.png", true) + "')";
        $(".D_F_CloseButton").hover(
            function () {
                $(this).css("background-image", e);
            },
            function () {
                $(this).css("background-image", i);
            }
        );
    }

    static setTagText(e: HTMLElement): void {
        const i = UIData.text;
        let n = $(e).prop("lang")!;
        n = n.substring(n.lastIndexOf("-") + 1);
        if (i.hasOwnProperty(n)) {
            for (const t in i[n]) {
                switch (t) {
                    case "a":
                        $(e).prop("alt", i[n].a);
                        break;
                    case "c":
                        $(e).prop("content", i[n].c);
                        break;
                    case "h":
                        if (e.nodeName.toLowerCase() == "title") {
                            document.title = i[n].h;
                        } else {
                            $(e).html(i[n].h);
                        }
                        break;
                    case "r":
                        $(e).prop("href", i[n].r);
                        break;
                    case "s":
                        $(e).prop("src", DisneySocial.getUrl(i[n].s, true));
                        break;
                    case "t":
                        $(e).prop("title", i[n].t);
                        break;
                    case "v":
                        $(e).prop("value", i[n].v);
                        break;
                }
            }
        }
    }

    static setText(e: string): string {
        return UIData.text ? UIData.text.dynamic[e] : "";
    }

    static setLayout(): boolean {
        FriendsUI.gotLayout = true;
        if (!UIData.markup) return false;
        $("#D_F").append(UIData.markup);
        $("#D_F_FriendSection").unwrap();
        UIData.setText();
        UIData.setImages();
        FriendsUI.init();
        HudNotification.reposition();
        FriendsUI.initUIComponents();
        FriendsUI.setTheme();
        FriendsUI.disableSelectText(".D_F");
        const ver = DisneySocial.ieVer;
        if (ver > 0 && ver < 8) {
            $("a").each(function () {
                $(this).prop("hideFocus", "hideFocus");
            });
        }
        return true;
    }

    static resizeFriendsWidgetWith(row: number, column: number): void {
        let sectionCount: number, sections: string[];
        if (row) {
            sections = [".D_F_SectionW", ".D_F_FriendSection_BoxW", ".D_F_FriendSectionReconnect_BoxW"];
            sectionCount = sections.length;
            for (let i = 0; i < sectionCount; i++) {
                $(sections[i]).each(function () {
                    const width = parseInt($(this).css("width"), 10);
                    $(this).css("width", (width + row).toString() + "px");
                });
            }
            const headerTop = $("#D_F_HeaderTop");
            sectionCount = (headerTop.parent().width()! - headerTop.width()!) / 2;
            headerTop.css("left", sectionCount.toString() + "px");
            $("#D_F_ReconnectTop").css("left", (sectionCount - 25).toString() + "px");
            AddFriend.resize();
            BarNotification.resize();
        }
        if (column) {
            sections = [".D_F_SectionH", ".D_F_FriendSection_BoxH", ".D_F_FriendSectionReconnect_BoxH"];
            sectionCount = sections.length;
            for (let i = 0; i < sectionCount; i++) {
                $(sections[i]).each(function () {
                    const height = parseInt($(this).css("height"), 10);
                    $(this).css("height", (height + column).toString() + "px");
                });
            }
        }
    }

    static isVisible(element: JQuery<HTMLElement>): boolean {
        return !(element.parents().map(function () {
            return $(this).css("display");
        }).get().indexOf("none") >= 0);
    }

    static showPlayerCard(swid: string): void {
        if (swid.indexOf("character_") == 0) {
            swid = swid.substring(swid.indexOf("_") + 1);
        }
        FriendsAPI.showPlayerCard(swid);
    }

    static jumpToFriend(e: string): void {
        FriendsAPI.jumpToFriend(e);
    }

    static jumpToCharacter(e: string): void {
        FriendsAPI.jumpToCharacter(e);
    }

    static bubbleEvent(e: Event): void {
        if (e.type == "mousedown") {
            $(e.target).parents().map(function () {
                const id = $(this).prop("id");
                if (id && id == "D_F_FriendSection") {
                    ContextNotification.cancel();
                }
            });
        }
    }

    static setBestFriend(swid: string): void {
        let groupIndex = UIFriends.getGroupIndexBySwid(swid);
        let groupType = 1;
        let friendType = "f";
        let groupNames = UIFriends.groupNames[groupIndex[0]];

        if (groupNames.substring(0, UIFriends.BEST_CHARACTER.length) === UIFriends.BEST_CHARACTER || groupNames.substring(0, UIFriends.BEST_FRIEND.length) === UIFriends.BEST_FRIEND) {
            groupType = 0;
        }

        if (swid.indexOf("character_") === 0) {
            swid = swid.substring(swid.indexOf("_") + 1);
            friendType = "c";
        }

        FriendsAPI.updateFriend({
            swid: swid,
            groups: [groupType],
            type: friendType
        });

        if (DisneyFriends.activeUser !== null) {
            DisneyFriends.activeUser.settings.addSetting(Settings.Constants.BEST_HINT_COUNT, this.BEST_HINT_COUNT_MAX.toString());
        }
    }

    static animateSprite(e: string, i: number, n: number, t: { [key: number]: number; }, s: number, r: () => void): void {
        let d = 0;
        let a = 1;
        let o = 1;
        let c = (new Date()).getTime();
        s = 1000 / s;
        const l = () => {
            $(e).css("background-position", `-${d}px 0px`);
            if (t && t[a] && o < t[a]) {
                o++;
                a--;
            } else {
                o = 1;
                d += i;
            }
            if (++a <= n) {
                const u = (new Date()).getTime();
                setTimeout(l, s - (u - c));
                c = u;
            } else {
                setTimeout(() => {
                    $(e).remove();
                    r();
                }, 2 * s);
            }
        };
        l();
    }
}
