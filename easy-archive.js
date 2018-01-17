// Author: Bluedeck <bluedeck@outlook.com>
// Licence: CC-BY-SA
// Currently English(US), Japanese(Japan), Chinese(China, Hong Kong, Taiwan) are the five supported languages of this tool.
// It will adapt the language of the interface to the best of its ability to the MediaWiki interface language and the user's browser interface.
// This tool can expand the spectrum of languages it supports easily. Please provide the interface translation of your language to the author and it will go online in no time.
// Your contributions will be listed below.
// このツールには新しい言語へのサポートと既存の言語の修正はとても安いものです。翻訳や修正をもらうと、アップデートをすぐにリリースします。翻訳を投稿したあなたの署名をここで書き添えます。
// 本工具可以轻易增加其所支持的语言或修订当前的界面语言。如要增加新语言或提出修订，请您提供翻译或修订，很快就能在新版中出现。您的翻译贡献将在下方列出。
// Release Note: User:Bluedeck/etc/sandbox/box1494993850812
//
// contributors:
// Plenty thanks to zh:User:Wong128hk for providing zh_hk interface translation
// Plenty thanks to lzh:User:Davidzdh for providing zh_classical interface translation
//
// strict mode where possible

if(!window.bluedeck)
{
    window.bluedeck = {};
}


if(!window.bluedeck.easy_archive) {

    bluedeck.easy_archive = {};

    (function(object){

        var x = 2017;
        var y = 11;
        var z = 2;
        var more = 0;
        var status = "s";
        var build = 75;
        var version_delim = ".";

        var version =
            x.toString(10) + version_delim +
            y.toString(10) + version_delim +
            z.toString(10) + (more ? version_delim + more.toString(10) : "");

        var iteration = status + build.toString(10);

        var ver = version + " / " + iteration;

        object.version = version;
        object.iteration = iteration;
        object.build = build;
        object.ver = ver;
        object.version_parsed = {x: x, y: y, z: z, more: more, status: status, build: build};

    })(window.bluedeck.easy_archive);

    (function(ele, txt, time, condition){
        if(!condition) return;
        ele.innerHTML = "";
        (function(ele, txt, time){
            txt = txt.split("");
            var len = txt.length, rate = time/len;
            for(var i=0; i<len; i++) setTimeout(function(){ele.innerHTML += txt.shift();}, i*rate);
        })(ele, txt, time);
    })(document.getElementById("easy_archive"), window.bluedeck.easy_archive.ver, 400, document.getElementById("8c23b4144bd58c689e192c6ab912a3b75c76f6849977518b8bedefd5e347d67f"));

    (function (easy) {

        "use strict";

        // Go repo
        var Go = (function(){

            var Go;

            try
            {
                new Function("(x=9, ...a) => 0;");
                if(!Promise) throw 0;
                Go = (function(){
                    var Go = function(...fns){this.task = new Promise(resolve => resolve());this.chain(...fns);};
                    var chain = function(go, fn){var f2 = x => 0;var promise = new Promise((reso, reje) => {f2 = x => fn(reso, reje)});go.task.then(f2);go.task = promise;};
                    Go.prototype.chain = function(...fns){for(var i=0; i<fns.length; i++){if(typeof fns[i] === "function") chain(this, fns[i]); else if(typeof fns[i] === "object" && fns[i] !== null && fns[i].constructor === Array) this.chain(...fns[i]); else throw new TypeError("Cannot chain non-function and non-arrays to a Go instance.");}return this;};
                    return Go;
                })();
            }
            catch(e)
            {
                Go = function(){};
                Go.prototype.chain = function(f){f();};
            }

            return Go;

        })();

        var go = new Go();

        if(!("mw" in window))
            throw new Error("Easy Archive cannot function without mw object.");

        // minified code dependency functions
        var Pare_str = (function(){
            "use strict";

            function Pare_str(pare_string, config)
            {
                this.str = pare_string;
                this.left = "(";
                this.delim = ":";
                this.right = ")";

                if(typeof config !== "string")
                    config = String(config);

                if(pare_string.length > 6 && /[@#%][sS][eE][tT]/.test(pare_string.slice(0,4)) && config.indexOf("ignore-set") === -1)
                {
                    this.left = pare_string[4];
                    this.delim = pare_string[5];
                    this.right = pare_string[6];

                    if(this.left === this.right || this.left === this.delim || this.right === this.delim)
                    {
                        throw new SyntaxError("Pound set statement has repetitive characters. E.g. '#set|:|' is illegal.")
                    }
                }
            }

            Pare_str.prototype.find = function(lookup_key)
            {
                lookup_key = this.left + lookup_key + this.delim;

                if(this.str.indexOf(lookup_key) === -1)
                {
                    return null;
                }
                else
                {
                    return this.str.split(lookup_key)[1].split(this.right)[0];
                }
            };

            Pare_str.prototype.new = function(new_key, new_value) // will not check for existance
            {
                if (new_key.indexOf(this.left) !== -1 || new_key.indexOf(this.right) !== -1 || new_key.indexOf(this.delim) !== -1 ||
                    new_value.indexOf(this.left) !== -1 || new_value.indexOf(this.right) !== -1)
                {
                    throw new Error("Pare_str: Illegal key or value. Key mustn't have any bound or delimiter, value mustn't have any bound.");
                }

                this.str = this.left + new_key + this.delim + new_value + this.right + this.str;

                return this;
            };

            Pare_str.prototype.update = function(lookup_key, new_value) // will create if not exist
            {
                if(this.find(lookup_key) === null)
                {
                    this.new(lookup_key, new_value);
                }
                else
                {
                    var new_str = this.str.split(this.left + lookup_key + this.delim);
                    new_str[1] = new_str[1].split(this.right);
                    new_str[1][0] = new_value;
                    new_str[1] = new_str[1].join(this.right);
                    new_str = new_str.join(this.left + lookup_key + this.delim);
                    this.str = new_str;
                }

                return this;
            };

            function intep(celldata)
            {
                if(/^\$[fF]alse$/.test(celldata))
                    return false;
                else if(/^\$[tT]rue$/.test(celldata))
                    return true;
                else if(/^\$-?(0*|[1-9][0-9]*)(|.[0-9]+)(|[eE](|\+|-)[0-9]*)$/.test(celldata))
                    return parseFloat(celldata.slice(1));
                else if(/^\$[nN](ull|one|il)$/.test(celldata))
                    return null;
                else
                    return celldata;
            }

            Pare_str.prototype.intep = function(lookup_key)
            {
                return intep(this.find(lookup_key));
            };

            return Pare_str;

        })();

        // bluedeck common repo.
        var expose = (function(){

            var glb={
                url: mw.config.values.wgServer,
                p: mw.config.values.wgPageName,
                un: mw.config.values.wgUserName,
                u: "User:"+mw.config.values.wgUserName,
                ut: "User_talk:"+mw.config.values.wgUserName,
                t: null
            };

            glb.a=glb.url+"/w/api.php";

            loadTokenSilently();

            function ding(a, b) {}

            var eur=encodeURIComponent;

            function asyncGet(url, fn)
            {
                var a=new XMLHttpRequest();
                a.onreadystatechange=fn;
                a.open("GET",url,true);
                a.send(null);
            }

            function asyncPost(url, body, fn)
            {
                var z1="Content-Type";
                var z2="application/x-www-form-urlencoded";
                var a=new XMLHttpRequest();
                a.onreadystatechange=fn;
                a.open("POST",url,true);
                a.setRequestHeader(z1,z2);
                a.send(body);
            }

            function loadTokenSilently()
            {
                var f=function(){if(this.readyState===4){glb.t=JSON.parse(this.responseText).query.tokens.csrftoken;}};
                var z="action=query&meta=tokens&format=json";
                asyncPost(glb.a, z, f);
                setTimeout(loadTokenSilently, 1800000);
            }

            function takeToken()
            {
                if(glb.t)
                {
                    return glb.t;
                }
                else
                {
                    loadTokenSilently();
                    return false;
                }
            }

            function getPage(a, fn)		// a: pagename / fn: function for execution
            {
                // ding("Requesting page: "+a,1);
                var z="action=query&prop=revisions&rvprop=ids|flags|timestamp|user|userid|size|comment|tags|content&format=json&titles=";
                asyncPost(glb.a, z+eur(a), fn);
            }

            function getPageSection(a, b, fn)		// a: pagename / b: section id numeric / fn: function for execution
            {
                ding("Requesting page: "+a+" in section: "+b,1);
                var z="action=query&prop=revisions&rvprop=content&format=json&titles=";
                asyncPost(glb.a,z+eur(a)+"&rvsection="+eur(b),fn);
            }

            function pickPageContent(a)
            {
                if(typeof a==="string")
                {
                    var b=JSON.parse(a);
                    if(typeof b==="object")
                    {
                        for(var x in b.query.pages)
                        {
                            var c=b.query.pages[x];
                            return c.revisions[0]["*"];
                        }
                    }
                    else
                    {
                        return false;
                    }
                }
                else		// from now on pick functions will only work with string inputs. DO NOT parse pages before passing them into pick functions.
                {
                    return false;
                }
            }

            function tellPageExist(a)
            {
                try {a = JSON.parse(a);}catch(e){return false;}

                if(typeof a !== "object") return false;

                if(!("query" in a)) return false;

                if(!("pages" in a.query)) return false;

                if(-1 in a.query.pages) return false;

                return true;
            }

            function edit(a, b, c, d, f)
            {
                // ding("Requesting page edit for: "+a+" Summary: "+c,1);
                var fn = typeof f === "function" ? (function(){if(this.readyState===4){f();}}) : function(){if(this.readyState===4){ding("Following page edited: "+a+" Detail: "+this.responseText)}};		// from now on, f is definable.
                if(!d){d=takeToken();}
                var z="action=edit&format=json&title=";
                asyncPost(glb.a, z+eur(a)+"&text="+eur(b)+"&summary="+eur(c)+"&token="+eur(d), fn);
            }

            function editPro(a, b, c, d, e, f)
            {
                // ding("Requesting page edit for: "+a+" in section: "+b+" Summary: "+d,1);
                var fn = typeof f === "function" ? (function(){if(this.readyState===4){f();}}) : function(){if(this.readyState===4){ding("Following page edited: "+a+" Section: "+b+" Detail: "+this.responseText)}};
                var z="action=edit&format=json&title=";
                asyncPost(glb.a, z+eur(a)+"&section="+eur(b)+"&text="+eur(c)+"&summary="+eur(d)+"&token="+eur(e), fn);
            }

            function editAppend(a, b, c, d, fn)
            {
                var f = function()
                {
                    if(this.readyState===4)
                    {
                        var original_content;

                        if(tellPageExist(this.responseText) === false)
                            original_content = "";
                        else
                            original_content = pickPageContent(this.responseText);
                        edit(a, original_content+""+b, c, d, fn);
                    }
                };
                getPage(a,f);
            }

            function archive_section(page_name, section, to, callback, summary)
            {
                getPageSection(page_name, section, function()
                {
                    var doneness = 0;

                    function done()
                    {
                        doneness++;
                        if(doneness === 2)
                            callback();
                    }

                    if(this.readyState === 4)
                    {
                        editAppend(to, "\n\n"+pickPageContent(this.responseText), summary, takeToken(), done);
                        editPro(page_name, section.toString(), "", summary, takeToken(), done);
                    }
                });
            }

            function delete_section(page_name, section, callback, summary)
            {
                editPro(page_name, section.toString(), "", summary, takeToken(), callback);
            }

            return {
                a: archive_section,
                d: delete_section
            };

        })();

        // default settings:
        easy.settings_string =
            "#set%|?                                     \n" +
            "display section delete link   %sec-del|1?   \n" +
            "display section archive line  %sec-arc|1?   \n" +
            "display control bar at top    %top-bar|0?   \n" +
            "archive location              %arc-loc|?    \n" +
            "subsection effectiveness      %sub-sec|2?   \n" +
            "confirm action                %confirm|0?   \n" +
            "is this data initialized      %data-init|0? \n";
        easy.settings = new Pare_str(easy.settings_string);
        easy.my_user_talk = null;

        try
        {
            easy.never_enable_on_these_pages_regex = window.bluedeck.external_config.easy_archive.never_enable_on_these_pages_regex;
        }
        catch(e)
        {
            easy.never_enable_on_these_pages_regex = [];
        }

        easy.dis_support_these_pages_regex = [
            /^File:.*$/,
            /^MediaWiki:.*$/,
            /^Module:.*$/,
            /^Category:.*$/,
            /^Template:.*$/,
            /^Special:.*$/,
            /^User:.*\/?.*\.js$/,
            /^User:.*\/?.*\.css$/,
            /^User:.*\/?.*\.json$/
        ];

        var settings_span_collection = document.getElementsByClassName("bluedeck_easy_archive_data_point_collection");
        var settings_span = settings_span_collection[0];
        var settings = settings_span ? new Pare_str(settings_span.innerHTML) : new Pare_str("");
        if(settings.find("data-init") === "1")
        {
            easy.settings_string = settings_span.innerHTML;
            easy.settings = new Pare_str(easy.settings_string)
        }

        try
        {
            var settings_archive_link = settings.find("sec-arc").indexOf("1") !== -1;
            var settings_delete_link = settings.find("sec-del").indexOf("1") !== -1;
            var settings_control_bar = settings.find("top-bar").indexOf("1") !== -1;
            var settings_archive_location_general = settings.find("arc-loc");
            var settings_subsection_level = settings.find("sub-sec").indexOf("1") !== -1;
            var settings_confirm_needed = settings.find("confirm").indexOf("1") !== -1;
        }
        catch(e){}

        // language selection logic

        var accepted_language = (function(){

            var PREVENT_INFINITE_LOOP = 1000;

            var accepted_languages_dict = {

                // lang_code
                "de" : "de_de", "dech" : "de_ch", "dede" : "de_de", "deli" : "de_li",
                "en" : "en_us", "enau" : "en_au", "enca" : "en_ca", "enhk" : "en_hk", "ennz" : "en_nz", "enuk" : "en_uk", "enus" : "en_us",
                "fi" : "fi_fi",
                "fr" : "fr_fr", "frch" : "fr_ch", "frfr" : "fr_fr",
                "ja" : "ja_jp", "jajp" : "ja_jp",
                "sv" : "sv_se", "svse" : "sv_se", "svfi" : "sv_fi",
                "zh" : "zh_cn", "zhcn" : "zh_cn", "zhhk" : "zh_hk", "zhtw" : "zh_tw", "zhsg" : "zh_cn",

                // country code
                "au" : "en_au",  // english  of commonwealth of australia
                "ca" : "en_ca",  // english  of canada
                "ch" : "de_ch",  // deutsch  of swiss confederation
                "cn" : "zh_cn",  // zhongwen of people's republic of china
                /**
                 "de" : "de_de",  // deutsch  of fed republic of germany
                 "fi" : "fi_fi",  // finnish  of finland
                 "fr" : "fr_fr",  // francais of french republic
                 **/
                "hk" : "zh_hk",  // zhongwen of hong kong s.a.r.
                "jp" : "ja_jp",  // nihongo  of japan
                "li" : "de_li",  // deutsch  of principality of liechtenstein
                "nz" : "en_us",  // english  of new-zealand
                "tw" : "zh_tw",  // zhongwen of taiwan, republic of china
                "sg" : "zh_cn",  // zhongwen of singapore
                "se" : "sv_se",  // svenska  of sweden
                "uk" : "en_uk",  // english  of the united kingdom of g.b. and n.i.
                "us" : "en_us",  // english  of the u.s. of a.

                // non-standard raw lang code
                "zh-hans": "zh_cn",
                "zh-hant": "zh_hk",
                "lzh":     "zh_cl",  // classical chinese
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
                group_of(code_or_desc, include_desc)
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
                        console.log("reporting a [peculiarity], see line 97 of dependencies/accepted_languages.js. this line is never intended to be executed.");
                        return null;
                    }
                    else if(this.desc === code_or_desc && include_desc !== false)
                    {
                        // this is the desired group
                        // also, caller did not specified group label exclusion
                        return this;
                    }
                    else
                    {
                        // desired language is not in this group
                        return null
                    }
                }

            };

// define friends

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
            var group_zh_classical = new Language_proximity_group("zh_classical").add("zh_cl");
            var group_zh = new Language_proximity_group("zh").add(group_zh_hans, group_zh_hant, group_zh_classical);
            var group_japanese = new Language_proximity_group("ja").add("ja_jp");
            var group_cjk = new Language_proximity_group("cjk").add(group_zh, group_japanese);
            var group_asian = new Language_proximity_group("asian").add(group_cjk);

            var group_world = new Language_proximity_group("world").add(group_asian, group_european);


            var accepted_languages = function(raw_lang_code, all_acceptable_codes = null)
            {
                var processed_lang_code = String(raw_lang_code).toLowerCase().replace(/[^a-z]/g, "").slice(0,4);
                var processed_lang_code_short = processed_lang_code.slice(0,2);

                var best_match =
                    accepted_languages_dict[raw_lang_code] ||
                    accepted_languages_dict[processed_lang_code] ||
                    accepted_languages_dict[processed_lang_code_short] ||
                    null;

                if(all_acceptable_codes === null || typeof all_acceptable_codes !== "object" || !all_acceptable_codes instanceof Array || all_acceptable_codes.length === 0 || all_acceptable_codes.indexOf(best_match) !== -1)
                    return best_match;
                else
                {
                    // assert all_acceptable_codes:
                    //     instanceof Array
                    //     does not contain best match
                    //     has at least 1 entry
                    var current_group = group_world.group_of(best_match);

                    if(current_group === null)
                        return all_acceptable_codes[0];

                    // equivalent to a while(true).
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

        var raw_lang_code = window.wgUserLanguage || mw.config.values.wgUserLanguage || navigator.language;

        easy.lang_code = accepted_language(raw_lang_code, ["en_us", "ja_jp", "zh_cn", "zh_hk", "zh_tw", "zh_cl"]);

        // ... lang done

        // identify if Easy Archive can be used on the page - compatibility

        easy.on_user_talk = (mw.config.values.wgNamespaceNumber === 3);
        easy.my_user_talk = easy.on_user_talk && ((function () {
                var page_name = mw.config.values.wgPageName.split(":");
                page_name[0] = "";
                page_name = page_name.join("");
                page_name = page_name.split("/")[0];
                var user_name = mw.config.values.wgUserName;
                return (user_name.split("_").join("").split(" ").join("") === page_name.split("_").join("").split(" ").join(""));
            })());
        easy.has_template = (settings.find("data-init") === "1");
        easy.others_user_talk = (easy.my_user_talk === false && easy.on_user_talk === true);
        easy.on_article = (mw.config.values.wgNamespaceNumber === 0);
        easy.on_hist_version = (mw.config.values.wgCurRevisionId - mw.config.values.wgRevisionId !== 0);


        // this nested IEFE is unnecessary. but it doesn't hurt to keep the scope clean.

        (function(){
            "use strict";
            if(!easy.lang)
                easy.lang = {};
            easy.lang.delete = {
                en_us: "delete",
                ja_jp: "削除",
                zh_cl: "刪削",
                zh_cn: "删除",
                zh_hk: "刪除",
                zh_tw: "刪除"
            };
            easy.lang.archive = {
                en_us: "archive",
                ja_jp: "アーカイブ",
                zh_cl: "存檔",
                zh_cn: "存档",
                zh_hk: "存檔",
                zh_tw: "存檔"
            };
            easy.lang.supports = {
                en_us: "Easy Archive is enabled on this talk page",
                ja_jp: "この会話ページでは Easy Archive ツールが有効されています",
                zh_cl: "此頁具載文士之議論，而以 Easy Archive 存檔",
                zh_cn: "本讨论页面使用 Easy Archive 快速存档",
                zh_hk: "本頁使用 Easy Archive",
                zh_tw: "本頁使用 Easy Archive"
            };
            easy.lang.others_page = {
                en_us: "This page is other user's talk page. Easy Archive is disabled.",
                ja_jp: "この会話ページは他人の利用者会話ページです。なので Easy Archive が適用しません。",
                zh_cl: "此議論之頁屬於他人，故 Easy Archive 無以存檔。",
                zh_cn: "本页面是他人的用户讨论页面，因此不支持 Easy Archive 快速存档。",
                zh_hk: "本頁為他人用戶討論頁面，故不支援 Easy Archive 快速存檔。",
                zh_tw: "本頁為他人用戶討論頁面，故不支援 Easy Archive 快速存檔。"
            };
            easy.lang.to_enable = {
                en_us: "This page is not using Easy Archive.",
                ja_jp: "このページで Easy Archive がオンにされていません。",
                zh_cl: "此頁不用 Easy Archive。",
                zh_cn: "本页面没有启用 Easy Archive。",
                zh_hk: "本頁没有啟用 Easy Archive。",
                zh_tw: "本頁没有啟用 Easy Archive。"
            };
            easy.lang.enable_on_generic_page = {
                en_us: "<div>This page is not your user talk page. However Easy Archive still can be used if needed.</div><div>To enable it, add {{Easy Archive|to=[Archive location]}} to this page.</div>",
                ja_jp: "<div>このページはあなたの利用者会話ページではありませんが、必要であれば Easy Archive がここでも機能できます。</div><div>Easy Archive を使用するなら、テンプレート {{Easy Archive|to=アーカイブ先}} を書き添えてください。</div>",
                zh_cl: "<div>此討論之頁所屬，微獨足下。雖曰弗屬，而 Easy Archive 之用，亦無不可。</div><div>欲行 Easy Archive 於此頁，宜補 {{Easy Archive|to=存檔所在}}。</div>",
                zh_cn: "<div>本页面不是您的用户讨论页面。不过，如果需要，本页面是可以使用 Easy Archive 的。</div><div>如果要在本页面使用 Easy Archive，请加入 {{Easy Archive|to=存档位置}}。</div>",
                zh_hk: "<div>本頁面不是您的用戶討論頁面。不過，如果需要，本頁面是可以使用 Easy Archive 的。</div><div>如果要在本頁面使用 Easy Archive，請加入 {{Easy Archive|to=存檔位置}}。</div>",
                zh_tw: "<div>本頁面不是您的用戶討論頁面。不過，如果需要，本頁面是可以使用 Easy Archive 的。</div><div>如果要在本頁面使用 Easy Archive，請加入 {{Easy Archive|to=存檔位置}}。</div>"
            };
            easy.lang.please_enable = {
                en_us: "<div>Add {{Easy Archive|to=[Archive location]}} to this page to start using Easy Archive.</div>",
                ja_jp: "<div>このページで、テンプレート {{Easy Archive|to=アーカイブ先}} を書き添えて Easy Archive をオンにしてください。</div>",
                zh_cl: "<div>以 {{Easy Archive|to=存檔所在}} 補於此頁，而 Easy Archive 得以行矣。</div>",
                zh_cn: "<div>请在本页面加入 {{Easy Archive|to=存档地址}} 来启用 Easy Archive。</div>",
                zh_hk: "<div>請在本頁加入 {{Easy Archive|to=存檔位置}} 來啟用 Easy Archive。</div>",
                zh_tw: "<div>請在本頁加入 {{Easy Archive|to=存檔位置}} 來啟用 Easy Archive。</div>"
            };
            easy.lang.please_enable_elaborate = {
                en_us: "<div>You have the Easy Archive functionality enabled but your talk page hasn't been configured yet. </div><div>To take advantage of Easy Archive, add {{Easy Archive|to=[Archive location]}} template to this page.</div>",
                ja_jp: "<div>Easy Archive はすでにインストールされていますが、この機能を利用するには、自分の利用者会話ページでテンプレートも必要です。</div><div>{{Easy Archive|to=アーカイブ先}} をこのページで書き添えて、Easy Archive の使用を開始しましょう。</div>",
                zh_cl: "<div>足下之簿已可行 Easy Archive，懸模板於書齋，曰 {{Easy Archive|to=存檔所在}}，即能用之。</div>",
                zh_cn: "<div>您的帐户已经支持 Easy Archive，但是，为了开始使用该功能，您还需要在自己的用户讨论页面上添加模板 {{Easy Archive|to=存档位置}}。</div>",
                zh_hk: "<div>您的帳戶已經支持 Easy Archive，但是，為了開始使用該功能，您還需要在自己的用戶討論頁面上添加模板 {{Easy Archive|to=存檔位置}}。</div>",
                zh_tw: "<div>您的帳戶已經支持 Easy Archive，但是，為了開始使用該功能，您還需要在自己的用戶討論頁面上添加模板 {{Easy Archive|to=存檔位置}}。</div>"
            };
            easy.lang.arc_all = {
                en_us: "Archive all topics",
                ja_jp: "全てアーカイブ",
                zh_cl: "所論悉存檔",
                zh_cn: "存档全部讨论",
                zh_hk: "全部討論存檔",
                zh_tw: "全部討論存檔"
            };
            easy.lang.arc_old_percent = {
                en_us: "Archive oldest ${1}",
                ja_jp: "${1}をアーカイブ",
                zh_cl: "以最舊者${1}存檔",
                zh_cn: "存档最旧${1}",
                zh_hk: "存檔最舊${1}",
                zh_tw: "存檔最舊${1}"
            };
            easy.lang.arc_old = {
                en_us: "Archive oldest ${1} topic${2}",  // ${2} = 's' if plural
                ja_jp: "${1}つをアーカイブ",
                zh_cl: "舊者凡${1}，悉存檔",
                zh_cn: "存档最旧${1}个",
                zh_hk: "存檔最舊${1}個",
                zh_tw: "存檔最舊${1}個"
            };
            easy.lang.arc_all_but = {
                en_us: "Archive all but ${1} topic${2}",  // ${2} = 's' if plural
                ja_jp: "${1}つを残す",
                zh_cl: "徒留新者凡${1}",
                zh_cn: "只留下${1}个最新",
                zh_hk: "只留最新${1}個",
                zh_tw: "只留最新${1}個"
            };
            easy.lang.settings = {
                en_us: "Preference",
                ja_jp: "設定",
                zh_cl: "設定",
                zh_cn: "设置",
                zh_hk: "設定",
                zh_tw: "設定"
            };
            easy.lang.stop_using = {
                en_us: "Turn off",
                ja_jp: "オフにする",
                zh_cl: "休止",
                zh_cn: "停用",
                zh_hk: "停用",
                zh_tw: "停用"
            };
            easy.lang.change = {
                en_us: "Change",
                ja_jp: "変更",
                zh_cl: "更改",
                zh_cn: "更改",
                zh_hk: "更改",
                zh_tw: "更改"
            };
            easy.lang.left_par_split = {
                en_us: " (",
                ja_jp: "（",
                zh_cl: "（",
                zh_cn: "（",
                zh_hk: "（",
                zh_tw: "（"
            };
            easy.lang.right_par = {
                en_us: ")",
                ja_jp: "）",
                zh_cl: "）",
                zh_cn: "）",
                zh_hk: "）",
                zh_tw: "）"
            };
            easy.lang.full_stop_split = {
                en_us: ". ",
                ja_jp: "。",
                zh_cl: "。",
                zh_cn: "。",
                zh_hk: "。",
                zh_tw: "。"
            };
            easy.lang.archive_path_colon_split = {
                en_us: "Archive location: ",
                ja_jp: "アーカイブ先：",
                zh_cl: "存檔所在：",
                zh_cn: "存档地址：",
                zh_hk: "存檔至：",
                zh_tw: "存檔至："
            };
            easy.lang.warning_stop_using = {
                en_us: "<div>Once Easy Archive is turned off, and you want it back on, you'll have to turn it on manually.</div><div>Do you want to turn it off? <div style='height:0.5em'></div><button onclick='window.bluedeck.easy_archive.turn_off(1)'>Yes</button><button onclick='window.bluedeck.easy_archive.elaborate_notice(3163);'>No</button></div>",
                ja_jp: "<div>Easy Archive をオフにしたら、戻ってオンにしたい時、手動でする必要があります。</div><div>Easy Archive をオフにしますか？<div style='height:0.5em'></div><button onclick='window.bluedeck.easy_archive.turn_off(1)'>はい</button><button onclick='window.bluedeck.easy_archive.elaborate_notice(3163);'>いいえ</button></div>",
                zh_cl: "<div>既休止 Easy Archive，復欲使之，則必躬親啟動。</div><div>今休意已決乎？<div style='height:0.5em'></div><button onclick='window.bluedeck.easy_archive.turn_off(1)'>然</button><button onclick='window.bluedeck.easy_archive.elaborate_notice(3163);'>否</button></div>",
                zh_cn: "<div>停用 Easy Archive 后，如要再次启用，只能手工操作。</div><div>要现在停用 Easy Archive 吗？<div style='height:0.5em'></div><button onclick='window.bluedeck.easy_archive.turn_off(1)'>是</button><button onclick='window.bluedeck.easy_archive.elaborate_notice(3163);'>否</button></div>",
                zh_hk: "<div>停用 Easy Archive 後，如要再次啟用，則必須手動重啟。</div><div>要現在停用 Easy Archive 嗎？<div style='height:0.5em'></div><button onclick='window.bluedeck.easy_archive.turn_off(1)'>是</button><button onclick='window.bluedeck.easy_archive.elaborate_notice(3163);'>否</button></div>",
                zh_tw: "<div>停用 Easy Archive 後，如要再次啟用，則必須手動重啟。</div><div>要現在停用 Easy Archive 嗎？<div style='height:0.5em'></div><button onclick='window.bluedeck.easy_archive.turn_off(1)'>是</button><button onclick='window.bluedeck.easy_archive.elaborate_notice(3163);'>否</button></div>"
            };
            easy.lang.stop_manually = {
                en_us: "<div>Cannot turn off Easy Archive automatically. </div><div>To manually discontinue use, delete the template {{Easy Archive|to=[Archive location]}} from this page.</div>",
                ja_jp: "<div>Easy Archive を自動的にオフにできませんでした。</div><div>Easy Archive を手動でオフにするなら、このページからテンプレート {{Easy Archive|to=アーカイブ先}} を削除してください。</div>",
                zh_cl: "<div>怪哉，Easy Archive 不能自休。宜親止之。</div><div>此頁模板曰 {{Easy Archive|to=存檔位置}} 者，宜刪之。</div>",
                zh_cn: "<div>经过尝试，无法自动停用 Easy Archive。请手动停用。</div><div>请从本页面删除如下模版：{{Easy Archive|to=存档位置}}。</div>",
                zh_hk: "<div>經過嘗試，恕無法自動停用 Easy Archive。請手動停用。</div><div>請從本頁刪除以下模板︰{{Easy Archive|to=存檔位置}}。</div>",
                zh_tw: "<div>經過嘗試，恕無法自動停用 Easy Archive。請手動停用。</div><div>請從本頁刪除以下模板︰{{Easy Archive|to=存檔位置}}。</div>"
            };
            easy.lang.change_location_to = {
                en_us: "<div>Change archive location to: <input type='text'/></div>",
                ja_jp: "<div>アーカイブ先を変更：<input type='text'/></div>",
                zh_cl: "<div>存檔所在易爲：<input type='text'/></div>",
                zh_cn: "<div>将存档地址更改为：<input type='text'/></div>",
                zh_hk: "<div>将存檔地址更改為：<input type='text'/></div>",
                zh_tw: "<div>将存檔地址更改為：<input type='text'/></div>"
            };
            easy.lang.change_manually = {
                en_us: "<div>Cannot update Easy Archive location automatically. </div><div>To update manually, find the template {{Easy Archive|to=[Archive location]}} and update the location.</div>",
                ja_jp: "<div>アーカイブ先が自動的に変更できませんでした。</div><div>手動で変更するなら、このページでテンプレート {{Easy Archive|to=アーカイブ先}} を探し、アーカイブ先を取って替えてください。</div>",
                zh_cl: "<div>存檔所在無以自易。惟君親改之。</div><div>是頁有模板曰 {{Easy Archive|to=存檔所在}} 者，徑改之。</div>",
                zh_cn: "<div>无法自动更改 Easy Archive 存档地址。请手动更改。</div><div>请在本页面找到如下模版：{{Easy Archive|to=存档位置}}，并更改存档位置。</div>",
                zh_hk: "<div>恕無法自動更改 Easy Archive 存檔地址。請手動更改。</div><div>請在本頁找到以下模板︰{{Easy Archive|to=存檔位置}}，并更改存檔位置。</div>",
                zh_tw: "<div>恕無法自動更改 Easy Archive 存檔地址。請手動更改。</div><div>請在本頁找到以下模板︰{{Easy Archive|to=存檔位置}}，并更改存檔位置。</div>"
            };
            easy.lang.loading_section_i = {
                en_us: "<div>Loading section ${1}</div>",
                ja_jp: "<div>セクション ${1} を読み込んでいます</div>",
                zh_cl: "<div>方解析第 ${1} 節</div>",
                zh_cn: "<div>正在读取第 ${1} 节的内容</div>",
                zh_hk: "<div>正在讀取第 ${1} 節的內容</div>",
                zh_tw: "<div>正在讀取第 ${1} 節的內容</div>"
            };
            easy.lang.deleting_section_i = {
                en_us: "<div>Deleting section ${1}</div>",
                ja_jp: "<div>セクション ${1} を削除しています</div>",
                zh_cl: "<div>第 ${1} 節之刪削未畢</div>",
                zh_cn: "<div>正在删除第 ${1} 节的内容</div>",
                zh_hk: "<div>正在刪除第 ${1} 節的內容</div>",
                zh_tw: "<div>正在刪除第 ${1} 節的內容</div>"
            };
            easy.lang.done_section_i = {
                en_us: "<div>Section ${1} has been archived to ${2}</div>",
                ja_jp: "<div>セクション ${1} が ${2} にアーカイブされました</div>",
                zh_cl: "<div>第 ${1} 節已存於 ${2}</div>",
                zh_cn: "<div>已经将第 ${1} 节存档到 ${2}</div>",
                zh_hk: "<div>已經將第 ${1} 節存檔到 ${2}</div>",
                zh_tw: "<div>已經將第 ${1} 節存檔到 ${2}</div>"
            };
            easy.lang.done_sections_i_thru_j = {
                en_us: "<div>Sections ${1} through ${2} has been archived to ${3}</div>",
                ja_jp: "<div>${1} から ${2} までのセクションが ${3} にアーカイブされました</div>",
                zh_cl: "<div>第 ${1} 至 ${2} 節已存於 ${3}</div>",
                zh_cn: "<div>已经将第 ${1} 至 ${2} 节存档到 ${3}</div>",
                zh_hk: "<div>已經將第 ${1} 至 ${2} 節存檔到 ${3}</div>",
                zh_tw: "<div>已經將第 ${1} 至 ${2} 節存檔到 ${3}</div>"
            };
            easy.lang.done_deleting_section_i = {
                en_us: "<div>Section ${1} has been deleted</div>",
                ja_jp: "<div>セクション ${1} が削除されました</div>",
                zh_cl: "<div>第 ${1} 節已刪</div>",
                zh_cn: "<div>已经将第 ${1} 节删除</div>",
                zh_hk: "<div>已經將第 ${1} 節刪除</div>",
                zh_tw: "<div>已經將第 ${1} 節刪除</div>"
            };
            easy.lang.done_deleting_sections_i_thru_j = {
                en_us: "<div>Sections ${1} through ${2} has been deleted</div>",
                ja_jp: "<div>${1} から ${2} までのセクションが削除されました</div>",
                zh_cl: "<div>第 ${1} 至 ${2} 節已刪</div>",
                zh_cn: "<div>已经将第 ${1} 至 ${2} 节删除</div>",
                zh_hk: "<div>已經將第 ${1} 至 ${2} 節刪除</div>",
                zh_tw: "<div>已經將第 ${1} 至 ${2} 節刪除</div>"
            };
            easy.lang.being_archived = {
                en_us: "being archived",
                ja_jp: "アーカイブされています",
                zh_cl: "方存檔",
                zh_cn: "存档中",
                zh_hk: "存檔中",
                zh_tw: "存檔中"
            };
            easy.lang.being_deleted = {
                en_us: "being deleted",
                ja_jp: "削除されています",
                zh_cl: "方刪削",
                zh_cn: "删除中",
                zh_hk: "刪除中",
                zh_tw: "刪除中"
            };
            easy.lang.already_archived = {
                en_us: "archived",
                ja_jp: "すでにアーカイブされました",
                zh_cl: "已存檔",
                zh_cn: "已存档",
                zh_hk: "已存檔",
                zh_tw: "已存檔"
            };
            easy.lang.already_deleted = {
                en_us: "deleted",
                ja_jp: "すでに削除されました",
                zh_cl: "已刪削",
                zh_cn: "已删除",
                zh_hk: "已刪除",
                zh_tw: "已刪除"
            };
            easy.lang.others_talk_elaborate = {
                en_us: "This page is another user's talk page. You cannot archive the topics on this page for him/her",
                ja_jp: "この会話ページは他人の利用者会話ページです。Easy Archive によって他人の代わりにアーカイブできません。",
                zh_cl: "此議論之頁屬於他人，君無以代爲存檔。",
                zh_cn: "这是另一名用户的讨论页面，您不能代替另一名用户存档。",
                zh_hk: "這是另一名用戶的討論頁面，您不能代替另一名用戶存檔。",
                zh_tw: "這是另一名用戶的討論頁面，您不能代替另一名用戶存檔。"
            };
            easy.lang.page_not_supported = {
                en_us: "This page is not supported by Easy Archive.",
                ja_jp: "このページが Easy Archive にサポートされていません。",
                zh_cl: "是頁無以行 Easy Archive。",
                zh_cn: "本页面不支持 Easy Archive。",
                zh_hk: "本頁面不支持 Easy Archive。",
                zh_tw: "本頁面不支持 Easy Archive。"
            };
            easy.lang.page_not_supported_elaborate = {
                en_us: "<div>These pages are not supported by Easy Archive: </div><div>File, Template, Module, MediaWiki, Category, Special, JavaScript, CSS, JSON.</div>",
                ja_jp: "<div>これらのページが Easy Archive にサポートされません：</div><div>File、Template、Module、MediaWiki、Category、Special、JavaScript、CSS、JSON。</div>",
                zh_cl: "<div>下記，皆 Easy Archive 所不能及：</div><div>File、Template、Module、MediaWiki、Category、Special、JavaScript、CSS、JSON。</div>",
                zh_cn: "<div>这些页面不受 Easy Archive 支持：</div><div>File、Template、Module、MediaWiki、Category、Special、JavaScript、CSS、JSON。</div>",
                zh_hk: "<div>這些頁面不受 Easy Archive 支持：</div><div>File、Template、Module、MediaWiki、Category、Special、JavaScript、CSS、JSON。</div>",
                zh_tw: "<div>這些頁面不受 Easy Archive 支持：</div><div>File、Template、Module、MediaWiki、Category、Special、JavaScript、CSS、JSON。</div>"
            };
            easy.lang.cancelled = {
                en_us: "<div>Cancelled</div>",
                ja_jp: "<div>キャンセルしました</div>",
                zh_cl: "<div>未然</div>",
                zh_cn: "<div>已取消</div>",
                zh_hk: "<div>已取消</div>",
                zh_tw: "<div>已取消</div>"
            };
            easy.lang.clickable_questionmark_split_before = {
                en_us: " (<a href='${1}'>?</a>)",
                ja_jp: "（<a href='${1}'>？</a>）",
                zh_cl: "（<a href='${1}'>？</a>）",
                zh_cn: "（<a href='${1}'>？</a>）",
                zh_hk: "（<a href='${1}'>？</a>）",
                zh_tw: "（<a href='${1}'>？</a>）"
            };
            easy.lang.problem_with_archive_location_main_space = {
                en_us: "<div>Currently the archive location of this page, \"${1}\", is under the article namespace, where archives should not be normally directed to. </div><div>Please check if you have the correct archive location.</div>",
                ja_jp: "<div>今のところ、このページのアーカイブ先は「${1}」であり、記事名前空間にあります。</div><div>通常は記事名前空間にアーカイブするべきではないので、アーカイブ先が正しいかどうか、チェックしてください。</div>",
                zh_cl: "<div>今本頁所存檔，在「${1}」，屬條目名稱空間。</div><div>條目名稱空間所屬，多不存檔，宜熟視所書地址。</div>",
                zh_cn: "<div>本页面目前的存档地址是“${1}”，在条目名称空间之下。</div><div>一般而言不应向条目名称空间进行存档，请检查存档地址。</div>",
                zh_hk: "<div>本頁面當前的存檔地址是「${1}」，在條目名稱空間之下。</div><div>一般而言不應向條目名稱空間進行存檔，請檢查存檔地址。</div>",
                zh_tw: "<div>本頁面當前的存檔地址是「${1}」，在條目名稱空間之下。</div><div>一般而言不應向條目名稱空間進行存檔，請檢查存檔地址。</div>"
            };
            easy.lang.problem_with_archive_location_same_page = {
                en_us: "<div>Currently the archive location of this page, \"${1}\", is this page itself, Easy archive cannot operate like this. </div>",
                ja_jp: "<div>今のところ、このページのアーカイブ先は「${1}」であり、このページ自身です。Easy Archive はこのまま働けません。</div>",
                zh_cl: "<div>今本頁所存檔，悉在「${1}」，其名同於本頁。Easy Archive 無以按址存檔。</div>",
                zh_cn: "<div>本页面目前的存档地址是“${1}”，和本页面名称相同。Easy Archive 无法按此地址存档。</div>",
                zh_hk: "<div>本頁面當前的存檔地址是「${1}」，和本頁面名稱相同。Easy Archive 無法按此地址存檔。</div>",
                zh_tw: "<div>本頁面當前的存檔地址是「${1}」，和本頁面名稱相同。Easy Archive 無法按此地址存檔。</div>"
            };
            easy.lang.archive_summary = {
                en_us: "archive section",
                ja_jp: "セクションをアーカイブ",
                zh_cl: "以此節存檔",
                zh_cn: "存档段落",
                zh_hk: "存檔段落",
                zh_tw: "存檔段落"
            };
            easy.lang.delete_summary = {
                en_us: "delete section",
                ja_jp: "セクションを削除",
                zh_cl: "刪削此節",
                zh_cn: "删除段落",
                zh_hk: "刪除段落",
                zh_tw: "刪除段落"
            };
            easy.lang.turn_off_summary = {
                en_us: "Disable Easy Archive on this page.",
                ja_jp: "このページで Easy Archive をオフにします。",
                zh_cl: "休 Easy Archive。",
                zh_cn: "在本页面停用 Easy Archive。",
                zh_hk: "在本頁停用 Easy Archive。",
                zh_tw: "在本頁停用 Easy Archive。"
            };

        })();

        (function(){

            function sanitize_html(string)
            {
                return string
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/'/g, "&apos;")
                    .replace(/"/g, "&quot;");
            }

            // multi language selector definition

            var ml = function (tag, para_list, lang_code) // multi-lang
            {
                "use strict";

                if(window.bluedeck.language_code_overwrite)
                {
                    lang_code = window.bluedeck.language_code_overwrite;
                }

                if(!lang_code)
                    lang_code = easy.lang_code;
                if(!para_list)
                    para_list = [];

                try
                {
                    var lang_content = easy.lang[tag][lang_code];

                    for(var has_unfulfilled_para = true, i=0; has_unfulfilled_para; i++)
                    {
                        var search = "${" + (i+1) + "}";
                        if(lang_content.indexOf(search) === -1)
                            has_unfulfilled_para = false;
                        else
                        {
                            if(para_list[i])
                                lang_content = lang_content.split(search).join(para_list[i]);
                            else
                                lang_content = lang_content.split(search).join("");
                        }
                    }

                    return lang_content;
                }
                catch(e)
                {
                    return "(!) undefined language content";
                }
            };

            function actual_section(nominal_section_number)
            {
                var less = 0;
                for(var i=0; i<nominal_section_number; i++)
                {
                    if(nominal_sections[i] === true)
                    {
                        less++;
                    }
                }
                return nominal_section_number - less;
            }

            // ... interface done

            // archiving logic injection

            function report_doneness_ui(section_number, doneness_type, to, ongoing_or_done)
            {
                var tag_ding, tag_section, ding_type, ding_ttl;

                if(ongoing_or_done === "ongoing")
                {
                    ding_type = "info";
                    ding_ttl = "long";
                    if(doneness_type === "delete")
                    {
                        tag_ding = "deleting_section_i";
                        tag_section = "being_deleted";
                    }
                    else if(doneness_type === "archive")
                    {
                        tag_ding = "loading_section_i";
                        tag_section = "being_archived";
                    }
                }

                else if(ongoing_or_done === "done")
                {
                    ding_type = "success";
                    ding_ttl = false;
                    if(doneness_type === "delete")
                    {
                        tag_ding = "done_deleting_section_i";
                        tag_section = "already_deleted";
                    }
                    else if(doneness_type === "archive")
                    {
                        tag_ding = "done_section_i";
                        tag_section = "already_archived";
                    }
                }

                var actions = {
                    "ding": function(){
                        ding(ml(tag_ding, [section_number.toString(), to]), ding_type, ding_ttl, false, false);
                    },
                    "section_link": function(){
                        var node = document.getElementsByClassName("bluedeck-easy-archive-section-id-span-order-" + section_number)[0];
                        var pnode = node.parentNode;
                        for(var i=1; i<pnode.childNodes.length-2; i++)
                        {
                            pnode.childNodes[i].style.display = "none";
                        }
                        node.innerHTML = ml(tag_section);
                        node.style.display = "inline";
                        node.style.color = "rgba(0,0,0,0.5)";
                    }
                };

                return actions;

            }

            var delete_section_core = function (section_number, nominal, callback)
            {
                var actual_section_number = actual_section(section_number);
                report_doneness_ui(nominal, "delete", "", "ongoing").ding();
                expose.d(mw.config.values.wgPageName, actual_section_number, function(){
                    report_doneness_ui(nominal, "delete", "", "done").ding();
                    report_doneness_ui(nominal, "delete", "", "done").section_link();
                    nominal_sections[section_number] = true;
                    typeof callback === "function" ? callback() : void null;
                }, ml("delete_summary"));
            };

            easy.delete_section = function(section_number, nominal){
                report_doneness_ui(nominal, "delete", "", "ongoing").section_link();
                go.chain(function(reso){
                    delete_section_core(section_number, nominal, reso);
                });
            };

            var archive_section_core = function(section_number, nominal, callback)
            {
                var actual_section_number = actual_section(section_number);
                var to = easy.settings.find("arc-loc");
                report_doneness_ui(nominal, "archive", to, "ongoing").ding();
                expose.a(mw.config.values.wgPageName, actual_section_number, to, function(){
                    report_doneness_ui(nominal, "archive", to, "done").ding();
                    report_doneness_ui(nominal, "archive", to, "done").section_link();
                    nominal_sections[section_number] = true;
                    typeof callback === "function" ? callback() : void null;
                }, ml("archive_summary"));
            };

            easy.archive_section = function(section_number, nominal){
                var to = easy.settings.find("arc-loc");
                report_doneness_ui(nominal, "archive", to, "ongoing").section_link();
                go.chain(function(reso){
                    archive_section_core(section_number, nominal, reso);
                });
            };

            easy.archive_sections = function (starting_section_number, count) {

                if(starting_section_number < 1)
                    return;  // cannot allow section 0 archiving. much less anything negative.

                for(var i=starting_section_number; i<(count+starting_section_number); i++)
                {
                    easy.ding(ml("loading_section_i", [i]), "info");
                }
                setTimeout(function(){easy.ding(ml("done_section_i", [starting_section_number, sanitize_html(settings.find("arc-loc"))]), "success");},1000);
            };

            easy.mass_archive_all = function() {easy.mass_archive_percentage(1);};
            easy.mass_archive_percentage = function(percentage) {easy.mass_archive_oldest(Math.ceil((easy.section_count) * percentage));};
            easy.mass_archive_leave_latest = function(amount_to_leave_behind) {easy.mass_archive_oldest(easy.section_count - amount_to_leave_behind);};

            easy.mass_archive_oldest = function(amount_to_archive)
            {
                if(amount_to_archive > easy.section_count)
                    amount_to_archive = easy.section_count;
                else if(amount_to_archive < 0)
                    amount_to_archive = 0;

                easy.archive_sections(1, amount_to_archive);
            };

            easy.turn_off = function(stage)
            {
                "use strict";
                if(stage === 0)
                    easy.elaborate_notice(227);
                else if(stage === 1)
                    easy.elaborate_notice(27);
            };

            easy.change_location = function(para)
            {
                "use strict";
                if(para === 0)
                    easy.elaborate_notice(395);
                else
                    easy.elaborate_notice(37);
            };

            easy.elaborate_notice = function(notice_tag_acronym)
            {
                // acronym scheme: refer to qwerty keyboard layout. (p=9)

                var notice_tag_dictionary = {
                    27:   ["stop_manually", "warning"],
                    37:   ["change_manually", "warning"],
                    227:  ["warning_stop_using", "warning", "long", false, true],
                    395:  ["change_location_to", "info", "long", false, true],
                    933:  ["please_enable_elaborate"],
                    953:  ["others_talk_elaborate"],
                    3163: ["cancelled", "warning", 1000],
                    3959: ["enable_on_generic_page"],
                    9219: ["problem_with_archive_location_main_space", "warning", "long", false, false, [sanitize_html(easy.settings.find("arc-loc"))]],
                    9220: ["problem_with_archive_location_same_page", "warning", "long", false, false, [sanitize_html(easy.settings.find("arc-loc"))]],
                    9623: ["page_not_supported_elaborate"]
                };

                var notice_set = notice_tag_dictionary[notice_tag_acronym] ? notice_tag_dictionary[notice_tag_acronym] : false;

                if(notice_set !== false)
                {
                    var ntag = notice_set[0];
                    var ntype = notice_set[1];
                    var nttl = notice_set[2] ? notice_set[2] : 9000;
                    var nhist = notice_set[3];
                    var npersist = notice_set[4];
                    var nsubst = notice_set[5];
                    easy.ding(ml(ntag, nsubst), ntype, nttl, nhist, npersist);
                }
            };

            // ding and its prerequisites.

            if(!document.getElementById("bluedeck_ding"))
            {
                document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", "<style>#bluedeck_ding button{margin: 0 0.2em; background:transparent; border:0.2em solid white; border-radius: 9em; padding: 0 0.7em; box-sizing: border-box; color: inherit; font-weight: inherit;}#bluedeck_ding button:active{background:rgba(255,255,255,0.6)}</style>");
                document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", "<div id='bluedeck_ding'></div>");
            }

            if(!document.getElementById("bluedeck_ding_history"))
            {
                document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", "<div id='bluedeck_ding_history'></div>");
            }

            easy.ding = function(message, type, ttl, history, persist)  // default type="info", ttl=3500, history=true, persist = false.
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

            var ding = easy.ding;


            // real deal here
            // interface injection - prepare

            var i = 0, for_loop_sentinel, j = 0, escape_counter, ele, element_for_manipulation, nominal, actual;
            var pipe_html = '<span style="margin:0 0.2em; opacity:0.7">|</span>';
            var section_delete_interface_inhibit = easy.settings.find("sec-del") === "0" || easy.settings.find("data-init") === "0";
            var section_archive_interface_inhibit = easy.settings.find("sec-arc") === "0" || easy.settings.find("data-init") === "0";
            var page_top_control_bar_inhibit = easy.settings.find("top-bar") === "0";
            var section_delete_interface_html;
            var section_archive_interface_html;
            var section_id_span_html = '<span class="bluedeck-easy-archive-section-id-span bluedeck-easy-archive-section-id-span-order-@@" style="display: none;">section</span>';

            var footer_info_ele, position_of_insertion;
            if(document.getElementById("footer-info"))
            {
                footer_info_ele = document.getElementById("footer-info");
                position_of_insertion = "afterbegin";
            }
            else
            {
                footer_info_ele = {insertAdjacentHTML: function(){}};
                position_of_insertion = "";
            }

            // ... interface injection - logic

            if(easy.on_article || easy.on_hist_version)
            {
                // insert no interface on an article page or a history version.
            }
            else if((function(black_list){
                    for(var i=0; i<black_list.length; i++)
                    {
                        if(black_list[i].test(mw.config.values.wgPageName))
                            return true;
                    }
                    return false;
                })(easy.never_enable_on_these_pages_regex))
            {
                // insert no interface if the page name is blacklisted.
            }
            else if((function(black_list){
                    for(var i=0; i<black_list.length; i++)
                    {
                        if(black_list[i].test(mw.config.values.wgPageName))
                            return true;
                    }
                    return false;
                })(easy.dis_support_these_pages_regex))
            {
                // insert not supported notice if the page name indicates that it is not supported.

                footer_info_ele.insertAdjacentHTML(position_of_insertion, "<li id='bluedeck_easy_archive_enable_notice'><a style='color:inherit' href='javascript:window.bluedeck.easy_archive.elaborate_notice(9623)'>" + ml("page_not_supported") + "</a></li>");
            }
            else if(mw.config.values.wgPageName === easy.settings.find("arc-loc"))
            {
                easy.elaborate_notice(9220);
            }
            else if(easy.has_template && !easy.others_user_talk)
            {
                // any page that has template that's not others' talk page. function normally.

                // !! the archive location in main space and needs attention !!
                if(/.+:.+/.test(easy.settings.find("arc-loc")) !== true)
                {
                    easy.elaborate_notice(9219);
                }

                var normal_function_inject_interface = function()
                {

                    var editSectionCollection = document.getElementsByClassName("mw-editsection");

                    for (i = 0; i < editSectionCollection.length; i++) {

                        ele = editSectionCollection[i];
                        var ve = /[&?]veaction=edit/.test(ele.childNodes[1].href);
                        var child_node_number = ve ? 3 : 1;

                        if ((ele.parentNode.tagName === "H2" || ele.parentNode.tagName === "h2") && decodeURIComponent(ele.childNodes[child_node_number].href.split(/[?&]title=/)[1].split("&")[0]) === mw.config.values.wgPageName)
                        {

                            actual = parseInt(ele.childNodes[child_node_number].href.split(/[&?]section=/)[1].split("&")[0]);

                            nominal = i - j + 1;

                            section_delete_interface_html = section_delete_interface_inhibit ? "" : pipe_html +
                                '<a href="javascript:window.bluedeck.easy_archive.delete_section(' + actual + ', ' + nominal + ')">' + ml("delete") + '</a>';
                            section_archive_interface_html = section_archive_interface_inhibit ? "" : pipe_html +
                                '<a href="javascript:window.bluedeck.easy_archive.archive_section(' + actual + ', ' + nominal + ')">' + ml("archive") + '</a>';

                            ele.childNodes[child_node_number].insertAdjacentHTML("afterend",
                                section_delete_interface_html + section_archive_interface_html + section_id_span_html.replace("@@", nominal.toString()));
                        }
                        else {
                            j++;
                        }
                    }

                    easy.section_count = i - j + 1;

                    footer_info_ele.insertAdjacentHTML(position_of_insertion,
                        "<li>" + ml("supports") + ml("left_par_split") +
                        //     "<a href='javascript:window.bluedeck.easy_archive.mass_archive_all()'>" + ml("arc_all") + "</a>" + pipe_html +
                        //     "<a href='javascript:window.bluedeck.easy_archive.mass_archive_percentage(0.5)'>" + ml("arc_old_percent", ["50%"]) + "</a>" + pipe_html +
                        //     "<a href='javascript:window.bluedeck.easy_archive.mass_archive_oldest(5)'>" + ml("arc_old", ["5", "s"]) + "</a>" + pipe_html +
                        //     "<a href='javascript:window.bluedeck.easy_archive.mass_archive_leave_latest(5)'>" + ml("arc_all_but", ["5", "s"]) + "</a>" + pipe_html +
                        //     "<a href='javascript:window.bluedeck.easy_archive.turn_to_settings()'>" + ml("settings") + "</a>" + pipe_html +
                        "<a href='javascript:window.bluedeck.easy_archive.turn_off(0)'>" + ml("stop_using") + "</a>"+
                        ml("right_par") + ml("full_stop_split") + "</li>" +
                        "<li>"+ ml("archive_path_colon_split") +"<a href='/wiki/" + sanitize_html(easy.settings.find("arc-loc")) + "'" + ">" + sanitize_html(easy.settings.find("arc-loc"))
                        //     + "</a>（<a href='javascript:window.bluedeck.easy_archive.change_location(0)'>" + ml("change") + "</a>）"
                    );

                };

                normal_function_inject_interface();

            }
            else if(easy.others_user_talk === true)
            {
                // others user talk.

                footer_info_ele.insertAdjacentHTML(position_of_insertion, "<li id='bluedeck_easy_archive_enable_notice'><a style='color:inherit' href='javascript:window.bluedeck.easy_archive.elaborate_notice(953)'>" + ml("others_page") + "</a></li>");
            }
            else if(easy.my_user_talk === false)
            {
                // a generic page that did not enable easy archive.

                footer_info_ele.insertAdjacentHTML(position_of_insertion, "<li id='bluedeck_easy_archive_enable_notice'><a style='color:inherit' href='javascript:window.bluedeck.easy_archive.elaborate_notice(3959)'>" + ml("to_enable") + "</a></li>");
            }
            else // then assert: (easy.my_user_talk === true), (easy.has_template === false).
            {
                // my user talk -- installed easy archive but lacking template.

                footer_info_ele.insertAdjacentHTML(position_of_insertion, "<li id='bluedeck_easy_archive_enable_notice'><a style='color:inherit' href='javascript:window.bluedeck.easy_archive.elaborate_notice(933)'>" + ml("please_enable") + "</a></li>");
            }

            var nominal_sections = (function(count){
                var arr = new Array(count);
                for(var i=0; i<count; i++)
                {
                    arr[i] = false;
                }
                return arr;
            })(easy.section_count);

        })();

    })(window.bluedeck.easy_archive);
}
