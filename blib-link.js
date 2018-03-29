
(function(ele, txt, time, condition){
    if(!condition) return;
    ele.innerHTML = "";
    (function(ele, txt, time){
        txt = txt.split("");
        var len = txt.length, rate = time/len;
        for(var i=0; i<len; i++) setTimeout(function(){ele.innerHTML += txt.shift();}, i*rate);
    })(ele, txt, time);
})(document.getElementById("blib-link"), "2018.3.5 / ab13", 400, document.getElementById("8c23b4144bd58c689e192c6ab912a3b75c76f6849977518b8bedefd5e347d67f"));

(function(){

    const dom_id = "bldk_dom_id_fbc2343a21e23222a82b9891f175532b8";
    const lib_url_prefix = "User:Bluedecklibrary/";

    (function(){

        const global_css_addition = `<style>
h1 span.${dom_id} {font-size: 20px;}
h2 span.${dom_id} {font-size: 19px;}
h3 span.${dom_id} {font-size: 17px;}
</style>`;

        document.getElementsByTagName("body")[0].insertAdjacentHTML("afterbegin", global_css_addition);


    })();

    (function(){

        const acc_lang_package = (function(){

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

        const ui_interface_dict = {
            "lib": {
                "en_us": "Library",
                "ja_jp": "図書館",
                "zh_cn": "图书馆",
                "zh_hk": "圖書館",
            }
        };

        const final_lang = acc_lang_package(
            window.wgUserLanguage || mw.config.values.wgUserLanguage || navigator.language,
            ["en_us", "ja_jp", "zh_cn", "zh_hk"]
        );

        const final_dict = ui_interface_dict["lib"][final_lang];

        const nsym = Symbol("page name");

        const list_of_anchors = [...document.getElementsByTagName("a")];

        const narrowing_down_0 = list_of_anchors.filter(x => /new/.test(x.className));

        const narrowing_down_1 = narrowing_down_0.filter(x => x.href.substr(0, 43) === "https://zh.wikipedia.org/w/index.php?title=");

        const narrowing_down_2 = narrowing_down_1.filter(x => x.href.indexOf("&action=edit&redlink=1") !== -1);

        const name_dict = {};

        const names = [];

        if("// always include the name of this page") {

            const this_page_name = window.wgPageName || mw.config.values.wgPageName || null;

            if(this_page_name)
                names.push(this_page_name);
        }

        const batch_name_limit = 30;  // best perf pending test

        narrowing_down_2.forEach(ele => {

            const name = lib_url_prefix + decodeURIComponent(ele.href.substr(43).split("&")[0]);

            ele[nsym] = name;

            name_dict[name] = null;

            names.push(name);

        });

        handler_0();

        function handler_0() {

            let batch_names = [];

            for(let i=0; i<batch_name_limit && names.length > 0; i++)
                batch_names.push(names.pop());

            const query_dict = {
                "format": "json",
                "action": "query",
                "prop": "revisions",
                "rvprop": "",
                "formatversion": "2",
                "titles": batch_names.map(encodeURIComponent).join("|"),
            };

            try {

                let query_str = "";

                for(let x in query_dict)
                    query_str += ("&" + x + "=" + query_dict[x]);

                query_str = "/w/api.php?" + query_str;

                const xhr = new XMLHttpRequest();
                xhr.open("GET", query_str, true);

                xhr.onreadystatechange = handler_1;
                xhr.send();
            }
            catch(e) {

                console.warn(e);
            }
        }

        function handler_1() {

            if(this.readyState === 4) {
                const returnobj = JSON.parse(this.responseText);
                if(returnobj["batchcomplete"] && returnobj["query"] && returnobj["query"]["pages"]) {

                    for(let i in returnobj["query"]["pages"]) {

                        const name = returnobj["query"]["pages"][i]["title"];
                        const exist = !(returnobj["query"]["pages"][i]["missing"]);

                        name_dict[name] = exist;
                    }

                    if(names.length !== 0)
                        handler_0();
                    else
                        handler_2();
                }
            }

        }

        function handler_2() {

            const narrowing_down_3 = narrowing_down_2.filter(ele => name_dict[ele[nsym]]);

            narrowing_down_3.forEach(ele => {

                let insert =
                    `<a href="/wiki/${ele[nsym].replace(/"/g, "&quot;")}">` +
                    `<span style="font-weight:normal;background:#eef4ff;border-radius:0.15em;font-size:0.8em;padding:0.2em 0.3em;margin:0 0.5em;color:#47c;white-space:nowrap;">` +
                    `<img style="display:inline;height:1.4em;line-height:1em;" src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Documents_icon_-_noun_project_5020_-_navy.svg" />` +
                    ` ` + final_dict +
                    `</span></a>`;

                insert = `<span class="${dom_id}">${insert}</span>`;

                ele.insertAdjacentHTML("afterend", insert);

            });

            if("// check if this page is deleted and show a notice telling the user there's a library archive if so") {

                const this_page_exists = Number((window.wgArticleId || mw.config.values.wgArticleId || 0)) > 0;
                const this_page_name = window.wgPageName || mw.config.values.wgPageName || null;
                const this_page_lib_name = lib_url_prefix + this_page_name;
                const this_page_lib_exists = name_dict[this_page_lib_name];
                const mw_content_text = document.getElementById("mw-content-text");
                const trigger_condition = (!this_page_exists) && this_page_lib_exists && !!(mw_content_text);

                if(trigger_condition) {

                    mw_content_text.insertAdjacentHTML(
                        "afterbegin",
                        `<div style="border-radius: 0.22em; background: rgba(255, 125, 25, 0.1); border-left: 0.31em solid rgba(255, 175, 125, 0.4); padding: 1em 1.25em; color: rgba(100,40,0,1);">` +
                        `<div><strong>图书馆提示</strong></div>` +
                        `<div>本页面存在<a href="/wiki/${lib_url_prefix}${this_page_name.replace(/"/g, "&quot;")}">图书馆存档</a>。</div>` +
                        `</div>`
                    );
                }
            }

        }

    })();

})();
