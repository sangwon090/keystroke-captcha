<script>
    import Navbar from '../components/navbar.svelte';
    import Textarea from '../components/textarea.svelte';
    import ScriptViewer from '../components/scriptviewer.svelte';

    import { onMount } from 'svelte';

    let expected = '';
    let typed = '';

    let timer;
    let queue = [];

    function onKeyUp(event) {
        queue.push({
            type: 'up',
            key: event.keyCode,
            elapsed: getElapsedTime(),
        });
    }

    function onKeyDown(event) {
        queue.push({
            type: 'down',
            key: event.keyCode,
            elapsed: getElapsedTime(),
        });
    }

    function getElapsedTime() {
        if(timer == null) {
            timer = new Date().getTime();
            return 0;
        }

        let elapsed = new Date().getTime() - timer;
        return elapsed;
    }

    onMount(async () => {
        fetch('/api/get_script').then((res) => {
            res.text().then((result) => {
                expected = result;
            })
        });
    });
</script>

<Navbar/>
<div class="container" style="height: calc(100% - 52px);">
    <div class="columns is-vcentered" style="height: 100%;">
        <div class="column">
            <div class="box">
                <ScriptViewer bind:content={expected} bind:typed={typed}/>
                <br/>
                <Textarea bind:text={typed} on:keyup={onKeyUp} on:keydown={onKeyDown}/>
            </div>
        </div>
    </div>
</div>
