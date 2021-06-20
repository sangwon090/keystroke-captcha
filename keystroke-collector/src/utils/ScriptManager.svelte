<script context="module">
    export async function downloadScript() {
        let res = await fetch('/get_script');
    
        console.log(res);
    }
</script>