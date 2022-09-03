<script>
    import Navbar from '../components/navbar.svelte';
    import Textarea from '../components/textarea.svelte';
    import ScriptViewer from '../components/scriptviewer.svelte';

    import * as Api from '../utils/api.js';
    import * as Hangul from '../utils/hangul.js';
    import { onMount } from 'svelte';

    const language = {
        'ko': '한국어',
        'en': '영어',
    }

    let authorized = false;
    let submitting = false;
    let typed = '';
    let timer;
    let queue = [];
    let script = {
        language: 'ko',
        progress: 0,
        content: '',
        status: 0,
    };

    function onKeyUp(event) {
        if((script.language == 'en' && event.keyCode != 229) ||(script.language == 'ko' && (event.keyCode == 32))){
            queue.push({
                type: 'up',
                key: event.keyCode,
                elapsed: getElapsedTime(),
            });

            console.log(`[U] ${event.keyCode}`);
        }
    }

    async function onKeyDown(event) {
        if(event.keyCode === 8 || event.keyCode === 13) {
            event.preventDefault();
            return false;
        }

        if((script.language == 'en' && event.keyCode != 229) || (script.language == 'ko' && (event.keyCode == 32))){
            queue.push({
                type: 'down',
                key: event.keyCode,
                elapsed: getElapsedTime(),
            });

            console.log(`[D] ${event.keyCode}`);
        }

        await submitData();
    }

    async function onKeyPress(event) {
        if(script.language == 'ko'){
            queue.push({
                type: 'press',
                key: Hangul.getKeyCode(event.data),
                elapsed: getElapsedTime(),
            });

            console.log(`[P] ${Hangul.getKeyCode(event.data)}`);
        }

        await submitData();
    }
    
    async function updateScript() {
        script = await Api.requestScript();

        typed = '';

        if(script.status == 0) {
            document.getElementById('editor').disabled = false;
            document.getElementById('editor').focus();
        } else if(script.status == 100) {
            script.content = '입력을 모두 마쳤습니다. 감사합니다.';
        }
    }

    async function submitData() {
        if(submitting) return;
        submitting = true;

        if(((typed.length === script.content.length) && ((typed[typed.length - 1] === script.content[script.content.length - 1]))) || typed.length >= script.content.length) {
            const data = {
                agent: navigator.userAgent,
                language: script.language,
                progress: script.progress,
                data: queue,
            };

            await Api.submitData(JSON.stringify(data));
            document.getElementById('editor').disabled = true;
            await updateScript();
        }

        submitting = false;
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
        if(await Api.isAuthorized()) {
            authorized = true;
            await updateScript();
        }
    });
</script>

<Navbar bind:authorized={authorized}/>

<div class="container" style="height: calc(100% - 52px);">
    <div class="columns is-vcentered" style="height: 100%;">
        <div class="column">
            {#if authorized}
                <div class="box">
                    <p>아래의 텍스트를 <b>오타 수정 없이</b> 그대로 입력하세요.</p>
                    <br/>
                    <p>언어: {language[script.language]}</p>
                    <p>진행도: {script.progress}/40</p>
                    <hr/>
                    <ScriptViewer bind:content={script.content} bind:typed={typed}/>
                    <br/>
                    <Textarea bind:typed={typed} on:keyup={onKeyUp} on:keydown={onKeyDown} on:compositionupdate={onKeyPress}/>
                </div>
            {:else}
                <h1 class="title" style="text-align: center;">로그인이 필요합니다.</h1>
                <p style="text-align: center;"><a href="/login">로그인</a>이나 <a href="/register">회원가입</a>을 하세요.</p>
            {/if}  
        </div>
    </div>
</div>
