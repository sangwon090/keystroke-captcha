<script>
    export let typed;
</script>

<textarea id="editor" class="textarea" bind:value={typed} on:keyup on:keydown on:compositionupdate disabled/>