<script>
    export let content;
    export let typed;

    /*
    const conversionMap = {
        ' ': '　',
    }

    function normalize(str) {
        let result = [];
        
        for(let i=0; i<str.length; i++) {
            let charCode = str[i].charCodeAt();
            if(charCode >= 0x21 && charCode <= 0x7E) {
                result.push(String.fromCharCode(charCode + 0xFEE0));
            } else {
                result.push(conversionMap[str[i]] || str[i]);
            }
        }

        return result.join('');
    }
    */
</script>

<style>
    p {
        font-family: 'Noto Sans KR';
        font-size: 24px;
        text-align: justify;
        word-break: break-all;
        white-space: break-spaces;
        color: black;

        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .correct {
        background-color: hsl(141, 53%, 53%);
    }

    .wrong {
        background-color: hsl(348, 100%, 61%);
    }
</style>

<p id="scriptViewer">{#each typed as typedChar, i}{#if typedChar == content[i]}<span class="correct">{typedChar}</span>{:else}<span class="wrong">{typedChar}</span>{/if}{/each}<span>{content.substring(typed.length, content.length)}</span></p>