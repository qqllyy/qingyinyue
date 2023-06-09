/**
 * SMusic
 * Author:Smohan
 * Version:1.0.0
 * url: http://www.smohan.net/lab/smusic.html
 * 使用请保留以上信息
 */
!
function(a) {
    function b(a, b) {
        0 == c(a, b) && (a.className += " " + b)
    }

    function c(a, b) {
        return !!a.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
    }

    function d(a, b) {
        var d = a.className;
        c(a, b) && (d = d.replace(new RegExp("(\\s|^)" + b + "(\\s|$)"), " "), d = d.replace(/(^\s*)|(\s*$)/g, ""), a.className = d)
    }

    function e(a, e) {
        c(a, e) ? d(a, e) : b(a, e)
    }

    function f(a) {
        return document.querySelector(a)
    }

    function g(a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }

    function h(a) {
        var b, c, d, e = "";
        return b = String(parseInt(a / 3600, 10)),
            c = String(parseInt(a % 3600 / 60, 10)),
            d = String(parseInt(a % 60, 10)),
            "0" != b && (1 == b.length && (b = "0" + b), e += b + ":"),
            1 == c.length && (c = "0" + c),
            e += c + ":",
            1 == d.length && (d = "0" + d),
            e += d
    }

    function j(a) {
        var b = this.config;
        this.config = g(b, a),
            this.musicList = this.config.musicList || [],
            this.musicLength = this.musicList.length,
            this.musicLength && f("body") || (this.musicDom.listWrap.innerHTML = "<p>\u6682\u65e0\u64ad\u653e\u8bb0\u5f55...</p>"),
            this.audioDom = null,
            this.init()
    }
    var i = null;
    j.prototype = {
            config: {
                musicList: [],
                defaultVolume: .7,
                defaultIndex: 0,
                playMode: 1,
            },
            createListDom: function() {
                var a = 0,
                    b = "<ul>";
                for (a; a < this.musicLength; a++) b += '<li class="f-toe"><strong>' + this.musicList[a].title + "</strong> -- <small>" + this.musicList[a].singer + "</small></li>";
                b += "</ul>",
                    this.musicDom.listWrap.innerHTML = b
            },
            setBuffer: function(a, b) {
                var c = b.parentNode.offsetWidth;
                i = setInterval(function() {
                        var d = a.buffered.length;
                        if (d > 0 && void 0 != a.buffered) {
                            var e = a.buffered.end(d - 1) / a.duration * c;
                            b.style.width = e + "px",
                                Math.abs(a.duration - a.buffered.end(d - 1)) < 1 && (b.style.width = c + "px", clearInterval(i))
                        }
                    },
                    1e3)
            },
            resetPlayer: function(a) {
                a >= this.musicLength - 1 && (a = this.musicLength - 1),
                    0 >= a && (a = 0),
                    this.currentMusic = a;
                var c = this.musicList[a],
                    e = this,
                    f = function() {
                        return e.setBuffer(this, e.musicDom.bufferProcess)
                    };
                this.audioDom.removeEventListener("canplay", f, !1),
                    clearInterval(i),
                    this.musicDom.bufferProcess.style.width = "0px",
                    this.musicDom.curProcess.style.width = "0px",
                    this.audioDom.src = c.src,
                    this.musicDom.cover.innerHTML = '<img src="' + c.cover + '" title="' + c.title + " -- " + c.singer + '">',
                    this.musicDom.title.innerHTML = "<strong>" + c.title + "</strong><small>" + c.singer + "</small>";
                var g = document.querySelectorAll(".m-music-list-wrap li"),
                    h = 0;
                for (h; h < this.musicLength; h++) h == a ? b(g[h], "current") : d(g[h], "current");
                this.audioDom.addEventListener("canplay", f, !1),
                    this.play()
            },
            setVolume: function(a) {
                var c = this.musicDom.volume,
                    e = c.volumeEventer.offsetHeight || 50;
                0 >= a && (a = 0),
                    a >= 1 && (a = 1),
                    this.audioDom.volume = a;
                var f = e * a;
                c.volumeCurrent.style.height = f + "px",
                    c.volumeCtrlBar.style.bottom = f + "px",
                    c.volumeProcess.setAttribute("data-volume", a),
                    0 == a ? (b(c.volumeControl, "muted"), this.audioDom.muted = !0) : (d(c.volumeControl, "muted"), this.audioDom.muted = !1)
            },
            initPlay: function() {
                var a = this.config.defaultIndex;
                this.setVolume(this.config.defaultVolume),
                    this.audioDom.load(),
                    this.resetPlayer(a)
            },
            play: function() {
                var a = this.musicDom.button.ctrl;
                this.audioDom.play(),
                    d(a, "paused"),
                    b(a, "play"),
                    a.setAttribute("title", "\u6682\u505c"),
                    d(this.musicDom.cover, "paused"),
                    b(this.musicDom.cover, "play")
            },
            pause: function() {
                var a = this.musicDom.button.ctrl;
                this.audioDom.pause(),
                    d(a, "play"),
                    b(a, "paused"),
                    a.setAttribute("title", "\u64ad\u653e"),
                    d(this.musicDom.cover, "play"),
                    b(this.musicDom.cover, "paused")
            },
            getRandomIndex: function() {
                var a = this.currentMusic,
                    b = this.musicLength,
                    c = 0,
                    d = [];
                for (c; b > c; c++) c != a && d.push(c);
                var e = parseInt(Math.random() * d.length);
                return d[e]
            },
            playByMode: function(a) {
                var b = this.playMode,
                    c = this.currentMusic,
                    d = this.musicLength,
                    e = c;
                1 == b ? "prev" == a ? e = d - 1 >= c && c > 0 ? c - 1 : d - 1 : ("next" == a || "ended" == a) && (e = c >= d - 1 ? 0 : c + 1) : 2 == b ? e = this.getRandomIndex() : 3 == b && (e = "prev" == a ? d - 1 >= c && c > 0 ? c - 1 : d - 1 : "next" == a ? c >= d - 1 ? 0 : c + 1 : c),
                    this.resetPlayer(e)
            },
            action: function() {
                var a = this,
                    g = this.musicDom.volume,
                    i = this.musicDom.button;
                this.audioDom.addEventListener("timeupdate",
                        function() {
                            var b = this;
                            if (!isNaN(b.duration)) {
                                var c = h(b.currentTime),
                                    d = h(b.duration),
                                    e = b.currentTime / b.duration * a.musicDom.bufferProcess.parentNode.offsetWidth;
                                a.musicDom.time.innerHTML = "" + c + "/" + d,
                                    a.musicDom.curProcess.style.width = e + "px"
                            }
                        },
                        !1),
                    this.audioDom.addEventListener("ended",
                        function() {
                            a.playByMode("ended")
                        },
                        !1),
                    g.volumeControl.addEventListener("click",
                        function(d) {
                            d = d || window.event,
                                d.stopPropagation(),
                                c(g.volumeProcess, "show") ? (e(this, "muted"), a.audioDom.muted = c(this, "muted") ? !0 : !1) : b(g.volumeProcess, "show")
                        },
                        !1),
                    document.addEventListener("click",
                        function(a) {
                            a = a || window.event,
                                a.stopPropagation();
                            var b = a.target || a.srcElement;
                            b.parentNode !== g.volumeProcess && b.parentNode !== f(".grid-music-container .u-volume") && d(g.volumeProcess, "show")
                        },
                        !1),
                    g.volumeEventer.addEventListener("click",
                        function(b) {
                            b = b || window.event,
                                b.stopPropagation();
                            var c = this.offsetHeight,
                                d = b.offsetY,
                                e = (c - d) / c;
                            a.setVolume(e)
                        },
                        !1);
                var j = document.querySelectorAll(".m-music-list-wrap li"),
                    k = 0;
                for (k; k < this.musicLength; k++) !
                    function(b) {
                        j[b].addEventListener("click",
                            function() {
                                a.resetPlayer(b)
                            },
                            !1)
                    }(k);
                i.ctrl.addEventListener("click",
                        function() {
                            c(this, "play") ? a.pause() : a.play()
                        },
                        !1),
                    i.prev.addEventListener("click",
                        function() {
                            a.playByMode("prev")
                        },
                        !1),
                    i.next.addEventListener("click",
                        function() {
                            a.playByMode("next")
                        },
                        !1),
                    i.listCircular.addEventListener("click",
                        function() {
                            b(this, "current"),
                                d(i.singleCircular, "current"),
                                d(i.randomPlay, "current"),
                                a.playMode = 1
                        }),
                    i.randomPlay.addEventListener("click",
                        function() {
                            b(this, "current"),
                                d(i.singleCircular, "current"),
                                d(i.listCircular, "current"),
                                a.playMode = 2
                        }),
                    i.singleCircular.addEventListener("click",
                        function() {
                            b(this, "current"),
                                d(i.listCircular, "current"),
                                d(i.randomPlay, "current"),
                                a.playMode = 3
                        })
            },
            init: function() {
                this.musicDom = {
                        music: f(".grid-music-container"),
                        cover: f(".grid-music-container .u-cover"),
                        title: f(".grid-music-container .u-music-title"),
                        curProcess: f(".grid-music-container .current-process"),
                        bufferProcess: f(".grid-music-container .buffer-process"),
                        time: f(".grid-music-container .u-time"),
                        listWrap: f(".grid-music-container .m-music-list-wrap"),
                        volume: {
                            volumeProcess: f(".grid-music-container .volume-process"),
                            volumeCurrent: f(".grid-music-container .volume-current"),
                            volumeCtrlBar: f(".grid-music-container .volume-bar"),
                            volumeEventer: f(".grid-music-container .volume-event"),
                            volumeControl: f(".grid-music-container .volume-control")
                        },
                        button: {
                            ctrl: f(".grid-music-container .ctrl-play"),
                            prev: f(".grid-music-container .prev"),
                            next: f(".grid-music-container .next"),
                            listCircular: f(".grid-music-container .mode-list"),
                            randomPlay: f(".grid-music-container .mode-random"),
                            singleCircular: f(".grid-music-container .mode-single")
                        }
                    },
                    this.currentMusic = this.config.defaultIndex || 0,
                    this.playMode = this.config.playMode || 1,
                    //this.playMode = 1,
                    this.audioDom = document.createElement("audio"),
                    this.createListDom(),
                    this.initPlay(),
                    this.action()
            }
        },
        a = a || window,
        a.SMusic = function(a) {
            return new j(a)
        }
}(window);