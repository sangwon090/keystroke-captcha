<script>
    export let content = '';
    export let typed = '';

    function trim(str) {
        return str.replace(/ /gi, '\xa0\xa0').replace(/,/gi, ',\xa0').replace(/\./gi, '.\xa0')
    }
</script>

<style>
    p {
        font-family: 'D2Coding';
        font-size: 24px;
        text-align: justify;
        word-break: break-all;
        color: black;
    }

    .correct {
        background-color: hsl(141, 53%, 53%);
    }

    .wrong {
        background-color: hsl(348, 100%, 61%);
    }
</style>

<p id="scriptViewer">
    {#each typed as typedChar, i}{#if typedChar == content[i]}<span class="correct">{trim(typedChar)}</span>{:else}<span class="wrong">{trim(typedChar)}</span>{/if}{/each}<span>{trim(content.substring(typed.length, content.length))}</span>
</p>