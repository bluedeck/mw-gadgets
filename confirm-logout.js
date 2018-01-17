
(function(ele, txt, time, condition){
    if(!condition) return;
    if(!ele) return;
    ele.innerHTML = "";
    (function(ele, txt, time){
        txt = txt.split("");
        var len = txt.length, rate = time/len;
        for(var i=0; i<len; i++) setTimeout(function(){ele.innerHTML += txt.shift();}, i*rate);
    })(ele, txt, time);
})(document.getElementById("confirm_logout"), "2017.11.1 / bs18", 400, document.getElementById("8c23b4144bd58c689e192c6ab912a3b75c76f6849977518b8bedefd5e347d67f"));

(function(){


    var list = document.getElementsByTagName("a");
    var href = "";
    var element = null;
    var lang_code = "en_us";

    var acc_lang = (function(){

        var PREVENT_INFINITE_LOOP = 1000;

        var accepted_languages_dict = {

            // lang_code
            "de": "de_de", "dech": "de_ch", "dede": "de_de", "deli": "de_li",
            "en": "en_us", "enau": "en_au", "enca": "en_ca", "enhk": "en_hk", "ennz": "en_nz", "enuk": "en_uk", "enus": "en_us",
            "fi": "fi_fi",
            "fr": "fr_fr", "frch": "fr_ch", "frfr": "fr_fr",
            "ja": "ja_jp", "jajp": "ja_jp",
            "sv": "sv_se", "svse": "sv_se", "svfi": "sv_fi",
            "zh": "zh_cn", "zhcn": "zh_cn", "zhhk": "zh_hk", "zhmo": "zh_mo", "zhtw": "zh_tw", "zhsg": "zh_sg",

            // country code
            "au": "en_au",  // english  of commonwealth of australia
            "ca": "en_ca",  // english  of canada
            "ch": "de_ch",  // deutsch  of swiss confederation
            "cn": "zh_cn",  // zhongwen of people's republic of china
            /**
             "de": "de_de",  // deutsch  of fed republic of germany
             "fi": "fi_fi",  // finnish  of finland
             "fr": "fr_fr",  // francais of french republic
             **/
            "hk": "zh_hk",  // zhongwen of hong kong s.a.r.
            "jp": "ja_jp",  // nihongo  of japan
            "li": "de_li",  // deutsch  of principality of liechtenstein
            "nz": "en_us",  // english  of new-zealand
            "tw": "zh_tw",  // zhongwen of taiwan, republic of china
            "sg": "zh_cn",  // zhongwen of singapore
            "se": "sv_se",  // svenska  of sweden
            "uk": "en_uk",  // english  of the united kingdom of g.b. and n.i.
            "us": "en_us",  // english  of the u.s. of a.

            // non-standard raw lang code
            "zh-hans": "zh_cn",
            "zh-hant": "zh_hk",

        };

        var Language_proximity_group = class{
            constructor(desc)
            {
                this.parent = null;
                this.desc = desc;
                this.sub_groups = [];
                this.languages = [];
            }

            all()
            {
                var all_codes = [];
                for(var i=0; i<this.languages.length; i++)
                    all_codes = all_codes.concat(this.languages[i]);
                for(var i=0; i<this.sub_groups.length; i++)
                    all_codes = all_codes.concat(this.sub_groups[i].all())
                return all_codes;
            }

            add_one(item)
            {
                if(typeof item === "string" && this.languages.indexOf(item) === -1)
                    this.languages.push(item);
                else if(typeof item === "object" && item !== null && item.constructor === Language_proximity_group && this.sub_groups.indexOf(item) === -1)
                    item.parent = this, this.sub_groups.push(item);
                else
                    throw new TypeError("cannot add this item " + typeof item + ". add only language code and proximity groups.");
                return this;
            }

            add()
            {
                for(var i=0; i<arguments.length; i++)
                {
                    this.add_one(arguments[i]);
                }
                return this;
            }

            // return the group in which the language code resides.
            group_of(code_or_desc)
            {
                if(this.languages.indexOf(code_or_desc) !== -1)
                {
                    // desired language is in this group
                    return this;
                }
                else if(this.all().indexOf(code_or_desc) !== -1)
                {
                    // desired language is not in this group, but in a sub group of this group
                    for(var i=0; i<this.sub_groups.length; i++)
                    {
                        var search_result = this.sub_groups[i].group_of(code_or_desc);
                        if(search_result !== null)
                            return search_result;
                    }
                    // search has finished but all subgroups returned null, which should not happen since the desired language is alleged to be in one of these sub groups, as per the opening condition of this if-else ladder.
                    console.log("reporting a [peculiarity], see line 90 of dependencies/accepted_languages.js. this line is never intended to be executed.");
                    return null;
                }
                else if(this.desc === code_or_desc)
                {
                    // this is the desired group
                    return this;
                }
                else
                {
                    // desired language is not in this group
                    return null
                }
            }
        };


        var group_north_am_eng = new Language_proximity_group("en_north_american").add("en_us", "en_ca");
        var group_australian_eng = new Language_proximity_group("en_au_nz").add("en_nz", "en_au");
        var group_dominant_english = new Language_proximity_group("en_native").add("en_uk", group_north_am_eng, group_australian_eng);
        var group_english = new Language_proximity_group("en").add(group_dominant_english, "en_sg", "en_hk");
        var group_french = new Language_proximity_group("fr").add("fr_fr", "fr_ch");
        var group_german = new Language_proximity_group("de").add("de_de", "de_ch", "de_li");
        var group_swedish = new Language_proximity_group("sv").add("sv_se", "sv_fi");
        var group_finnish = new Language_proximity_group("fi").add("fi_fi");
        var group_north_eu = new Language_proximity_group("european_northern").add(group_swedish, group_finnish);
        var group_european = new Language_proximity_group("european").add(group_english, group_french, group_german, group_north_eu);

        var group_zh_hans = new Language_proximity_group("zh_hans").add("zh_cn", "zh_sg", "zh_mo");
        var group_zh_hant = new Language_proximity_group("zh_hant").add("zh_hk", "zh_tw");
        var group_zh = new Language_proximity_group("zh").add(group_zh_hans, group_zh_hant);
        var group_japanese = new Language_proximity_group("ja").add("ja_jp");
        var group_asian = new Language_proximity_group("asian").add(group_zh, group_japanese);

        var group_world = new Language_proximity_group("world").add(group_asian, group_european);

        var accepted_languages = function(raw_lang_code, all_acceptable_codes = null)
        {
            var processed_lang_code = String(raw_lang_code).toLowerCase().replace(/[^a-z]/g, "").slice(0,4);
            var processed_lang_code_short = processed_lang_code.slice(0,2);
            var best_match;

            if(raw_lang_code in accepted_languages_dict)
                best_match = accepted_languages_dict[raw_lang_code];
            else if(processed_lang_code in accepted_languages_dict)
                best_match = accepted_languages_dict[processed_lang_code];
            else if(processed_lang_code_short in accepted_languages_dict)
                best_match = accepted_languages_dict[processed_lang_code_short];
            else
                best_match = null;

            if(all_acceptable_codes === null || typeof all_acceptable_codes !== "object" || !all_acceptable_codes instanceof Array || all_acceptable_codes.length === 0 || all_acceptable_codes.indexOf(best_match) !== -1)
                return best_match;
            else  // assert all_acceptable_codes instanceof Array, assert all_acceptable_codes does not contain best match, assert all_acceptable_codes has at least 1 entry
            {
                var current_group = group_world.group_of(best_match);
                if(current_group === null)
                    return all_acceptable_codes[0];

                // this was originally a while(true) loop, but i changed it into a for loop that will force quit if it runs more than a specified length,
                // just as a fail safe in case the current_group.parent somehow referred to itself.
                for(var i=0; i<PREVENT_INFINITE_LOOP; i++)
                {
                    var close_match_group = current_group.all();
                    for(var i=0; i<close_match_group.length; i++)
                    {
                        if (all_acceptable_codes.indexOf(close_match_group[i]) !== -1)
                            return close_match_group[i];

                    }
                    if(current_group.parent)
                        current_group = current_group.parent;
                    else
                        return all_acceptable_codes[0];
                }
                console.log('[warning][peculiarity] produced at accepted_languages.js:175, forced jump out of a suspected 1k loop that should not happen. This indicates that a faulty language proximity group has one/multiple parent pointer(s) that formed a circle.');
                return all_acceptable_codes[0];
            }

        };

        return accepted_languages;

    })();
    var raw_lang_code = mw.config.values.wgUserLanguage || wgUserLanguage || navigator.language;
    lang_code = acc_lang(raw_lang_code, ["en_us", "ja_jp", "zh_cn", "zh_tw"]);

    var lang = {
        "notice": {
            "en_us": "<div style='margin-bottom: 0.5em; '>You clicked on a sign-out link. Do you want to continue?</div><div><button>No</button><button onclick='window.location=\"/wiki/special:logout\"'>Continue to sign-out</button></div>",
            "ja_jp": "<div style='margin-bottom: 0.5em; '>ログアウトリンクがクリックされました。ログアウトしますか？</div><div><button>いいえ</button><button onclick='window.location=\"/wiki/special:logout\"'>続けてログアウトする</button></div>",
            "zh_cn": "<div style='margin-bottom: 0.5em; '>您点击了登出链接，您确实要登出吗？</div><div><button>不要</button><button onclick='window.location=\"/wiki/special:logout\"'>确实要登出</button></div>",
            "zh_tw": "<div style='margin-bottom: 0.5em; '>您點擊了登出連結，您確實要登出嗎？</div><div><button>不要</button><button onclick='window.location=\"/wiki/special:logout\"'>確實要登出</button></div>"
        }
    };


    var _ding = (function(){

        if(!document.getElementById("bluedeck_ding"))
        {
            document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", "<style>#bluedeck_ding button{margin: 0 0.2em; background:transparent; border:0.2em solid white; border-radius: 9em; padding: 0 0.7em; box-sizing: border-box; color: inherit; font-weight: inherit;}#bluedeck_ding button:active{background:rgba(255,255,255,0.6)}</style>");
            document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", "<div id='bluedeck_ding'></div>");
        }

        if(!document.getElementById("bluedeck_ding_history"))
        {
            document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", "<div id='bluedeck_ding_history'></div>");
        }

        return function(message, type, ttl, history, persist)  // default type="info", ttl=3500, history=true, persist = false.
        {
            if(!type)
                type = "info";

            if(typeof ttl === "number" && ttl < 1)
                ttl = 1;

            if(!ttl)
                ttl = 3500;

            if(ttl === "long")
                ttl = "long";

            if(!history)
                history = true;

            if(!persist)
                persist = false;

            var ding_ele = document.getElementById("bluedeck_ding");
            var ding_hist_ele = document.getElementById("bluedeck_ding_history");

            if(ding_ele.lastChild)
            {
                var previous_ding = ding_ele.lastChild;
                previous_ding.style.transform = "translateY(-130%)";
                setTimeout(function(){previous_ding.remove();}, 500);
            }

            if(message === false || message === null || message === 0 || typeof message === "undefined")
                return;

            var color_sets = {
                warning:   {text: "rgba(255, 255, 255, 1)", background: "rgba(221, 51,  51,  1)"},
                info:      {text: "rgba(255, 255, 255, 1)", background: "rgba(51,  102, 204, 1)"},
                success:   {text: "rgba(255, 255, 255, 1)", background: "rgba(0,   175, 137, 1)"},
                confusion: {text: "rgba(0,   0,   0,   1)", background: "rgba(234, 236, 240, 1)"},
                default:   {text: "rgba(0,   0,   0,   1)", background: "rgba(234, 236, 240, 1)"}
            };

            if(!color_sets[type])
                type = "confusion";

            var retractant = persist ? "" : "onclick='this.style.transform = \"translateY(-130%)\";setTimeout(function(){this.remove()}.bind(this), 500);' ";

            ding_ele.insertAdjacentHTML("beforeend",
                "<div " +
                retractant +
                "style='" +
                "position:fixed; top:0; left:0; right:0; margin: 0 0 auto 0; height: auto; line-height: 1.4em; " +
                "padding: 0.6em 2em; opacity: 1; text-align: center; z-index: 9999; font-size: 86%; box-shadow: 0 2px 5px rgba(0,0,0,0.2); " +
                "font-weight: bold; transform: translateY(-130%); transition: all 0.2s;" +
                "background: " + color_sets[type].background + "; color:" + color_sets[type].text + "; ' " +
                ">" +
                message +
                "</div>"
            );

            var notice_ele = ding_ele.lastChild;

            setTimeout(function(){notice_ele.style.transform = "translateY(0%)";}, 10);
            if(ttl !== "long")
            {
                setTimeout(function(){notice_ele.style.transform = "translateY(-130%)";}, ttl + 10);
                setTimeout(function(){notice_ele.remove();}, ttl + 510);
            }

        };

    })();
    var ding = function(){_ding(lang.notice[lang_code], "warning", "long", false, false);};
    var confirm_action = function(){ding();};

    for(var i=0; i<list.length; i++)
    {
        href = list[i].href;

        if(href)
        {
            href = decodeURIComponent(href);
            if(
                /\/special:%E7%94%A8%E6%88%B7%E9%80%80%E5%87%BA/i.test(href) ||
                /title=special:%E7%94%A8%E6%88%B7%E9%80%80%E5%87%BA/i.test(href) ||
                /\/special:用户退出/i.test(href) ||
                /title=special:用户退出/i.test(href) ||
                /\/special:logout/i.test(href) ||
                /title=special:logout/i.test(href)
            )
            {
                element = list[i];

                element.href="javascript:void null;";
                element.addEventListener("click", confirm_action);
            }
        }
    }



})();
