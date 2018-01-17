
(function(ele, txt, time, condition){
    if(!condition) return;
    if(!ele) return;
    ele.innerHTML = "";
    (function(ele, txt, time){
        txt = txt.split("");
        var len = txt.length, rate = time/len;
        for(var i=0; i<len; i++) setTimeout(function(){ele.innerHTML += txt.shift();}, i*rate);
    })(ele, txt, time);
})(document.getElementById("blib"), "2017.10.3 / abs11", 400, document.getElementById("8c23b4144bd58c689e192c6ab912a3b75c76f6849977518b8bedefd5e347d67f"));

(function(){

    var acc_lang_package = (function(){

        const PREVENT_INFINITE_LOOP = 1000;

        const accepted_languages_dict = {

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
        };

        const Language_proximity_group = class{
            constructor(desc)
            {
                this.parent = null;
                this.desc = desc;
                this.sub_groups = [];
                this.languages = [];
            }

            all()
            {
                let all_codes = [];
                for(let i=0; i<this.languages.length; i++)
                    all_codes = all_codes.concat(this.languages[i]);
                for(let i=0; i<this.sub_groups.length; i++)
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
                for(let i=0; i<arguments.length; i++)
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
                    for(let i=0; i<this.sub_groups.length; i++)
                    {
                        let search_result = this.sub_groups[i].group_of(code_or_desc);
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

        const group_north_am_eng = new Language_proximity_group("en_north_american").add("en_us", "en_ca");
        const group_australian_eng = new Language_proximity_group("en_au_nz").add("en_nz", "en_au");
        const group_dominant_english = new Language_proximity_group("en_native").add("en_uk", group_north_am_eng, group_australian_eng);
        const group_english = new Language_proximity_group("en").add(group_dominant_english, "en_sg", "en_hk");
        const group_french = new Language_proximity_group("fr").add("fr_fr", "fr_ch");
        const group_german = new Language_proximity_group("de").add("de_de", "de_ch", "de_li");
        const group_swedish = new Language_proximity_group("sv").add("sv_se", "sv_fi");
        const group_finnish = new Language_proximity_group("fi").add("fi_fi");
        const group_north_eu = new Language_proximity_group("european_northern").add(group_swedish, group_finnish);
        const group_european = new Language_proximity_group("european").add(group_english, group_french, group_german, group_north_eu);

        const group_zh_hans = new Language_proximity_group("zh_hans").add("zh_cn", "zh_sg", "zh_mo");
        const group_zh_hant = new Language_proximity_group("zh_hant").add("zh_hk", "zh_tw");
        const group_zh = new Language_proximity_group("zh").add(group_zh_hans, group_zh_hant);
        const group_japanese = new Language_proximity_group("ja").add("ja_jp");
        const group_asian = new Language_proximity_group("asian").add(group_zh, group_japanese);

        const group_world = new Language_proximity_group("world").add(group_asian, group_european);

        const accepted_languages = function(raw_lang_code, all_acceptable_codes = null)
        {
            const processed_lang_code = String(raw_lang_code).toLowerCase().replace(/[^a-z]/g, "").slice(0,4);
            const processed_lang_code_short = processed_lang_code.slice(0,2);
            let best_match;

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
                let current_group = group_world.group_of(best_match);
                if(current_group === null)
                    return all_acceptable_codes[0];

                // this was originally a while(true) loop, but i changed it into a for loop that will force quit if it runs more than a specified length,
                // just as a fail safe in case the current_group.parent somehow referred to itself.
                for(let i=0; i<PREVENT_INFINITE_LOOP; i++)
                {
                    let close_match_group = current_group.all();
                    for(let i=0; i<close_match_group.length; i++)
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
    var TPR = "user:bluedecklibrary/";
    var PG = mw.config.values.wgPageName || wgPageName;
    var TPN = TPR + PG;

    var LNG = {
        "CMT": {
            "en_us": "Save to library",
            "ja_jp": "図書館にアーカイブ",
            "zh_cn": "存档至图书馆",
            "zh_hk": "存檔至圖書館"
        },
        "LT0": {
            "en_us": "Save to library",
            "ja_jp": "図書館にアーカイブ",
            "zh_cn": "存档至图书馆",
            "zh_hk": "存檔至圖書館"
        },
        "LT1": {
            "en_us": "Saving ...",
            "ja_jp": "アーカイブしています",
            "zh_cn": "正在存档",
            "zh_hk": "正在存檔"
        },
        "LT2": {
            "en_us": "Saved",
            "ja_jp": "アーカイブしました",
            "zh_cn": "已存档",
            "zh_hk": "已存檔"
        },
        "LT3": {
            "en_us": "Check",
            "ja_jp": "見に行く",
            "zh_cn": "查看",
            "zh_hk": "檢視"
        },
    };
    var RLC = mw.config.values.wgUserLanguage || wgUserLanguage || navigator.language;
    var LNC = acc_lang_package(RLC, ["en_us", "ja_jp", "zh_cn", "zh_hk"]);
    var CMT = LNG["CMT"][LNC];
    var LT0 = LNG["LT0"][LNC];
    var LT1 = LNG["LT1"][LNC];
    var LT2 = LNG["LT2"][LNC];
    var LT3 = " (<a href='/wiki/${TPN}'>${CHK}</a>)".replace("${CHK}", LNG["LT3"][LNC]).replace("${TPN}", TPN.replace(/'/g, "&apos;"));

    if(PG.substr(0, TPR.length).toLowerCase() === TPR.toLowerCase())
        return;

    var LI = document.createElement("li");
    var A = document.createElement("a");
    LI.appendChild(A);
    A.innerHTML = LT0;
    A.id = "bluedeck_dom_blib_archive_link_228598fbbb33470ef75056179b3800c543c0d2187e708f3a70f0827ac48b5b3b";
    A.href = "javascript:void null;";
    A.addEventListener("click", put_to_lib_action);

    var stage = 1;

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

        function getPage(a, fn)		// a: pagename / fn: callback
        {
            var z="action=query&prop=revisions&rvprop=ids|flags|timestamp|user|userid|size|comment|tags|content&format=json&titles=";
            asyncPost(glb.a, z+eur(a), fn);
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

        function getPageContent(p, f1)
        {
            var f2 = function(){
                if(this.readyState === 4)
                    f1(pickPageContent(this.responseText));
            };

            getPage(p, f2)
        }

        return {
            a: edit,
            b: getPageContent,
        };

    })();

    function regulate_for_library(page_name, wiki_text)
    {
        return "{{user:bluedeck/infr/library.card.js|1=${page_name}|time=${new Date().toISOString()}|jst=${Date.now()}|revid=${wgCurRevisionId}|pageid=${wgArticleId}}}"
                .replace("${wgArticleId}", wgArticleId)
                .replace("${wgCurRevisionId}", wgCurRevisionId)
                .replace("${Date.now()}", Date.now())
                .replace("${new Date().toISOString()}", new Date().toISOString())
                .replace("${page_name}", page_name)
            + wiki_text
                .replace(/\{\{/g, "{{((}}")
                .replace(/\[\[[Cc]ategory:/g, "[[:Category:")
                .replace(/\[\[分类:/g, "[[:分类:")
                .replace(/\[\[分類:/g, "[[:分類:");
    }

    function put_to_lib_action()
    {
        var interfere = interfere_with_ui;

        var f0 = function(txt)
        {
            expose.a(TPN, regulate_for_library(PG, txt), CMT, null, interfere);
        };

        expose.b(PG, f0);

        interfere();

    }

    function interfere_with_ui()
    {
        if(stage === 1)
            LI.innerHTML = "<span style='color:#888'>" + LT1 + "</span>", stage++;
        else if(stage === 2)
            LI.innerHTML = "<span style='color:#888'>" + LT2 + "</span>" + LT3, stage++;
    }

    document.getElementById("p-tb-label").nextElementSibling.firstElementChild.appendChild(LI);

})();
