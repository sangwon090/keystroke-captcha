<script>
    import * as Hangul from '../utils/hangul.js';

    let language = 'en';
    let queue = [];
    let timer;
    

    function onKeyUp(event) {
        if(event.keyCode == 13) submit();
        if(language != 'en') return;

        queue.push({
            type: 'up',
            key: event.keyCode,
            elapsed: getElapsedTime(),
        })

        console.log(`[U] ${event.keyCode}`)
    }

    function onKeyDown(event) {
        if(language != 'en') return;

        queue.push({
            type: 'down',
            key: event.keyCode,
            elapsed: getElapsedTime(),
        })

        console.log(`[D] ${event.keyCode}`)
    }

    function onKeyPress(event) {
        if(language != 'ko') return;

        queue.push({
            type: 'press',
            key: event.keyCode,
            elapsed: getElapsedTime(),
        })

        console.log(`[P] ${Hangul.getKeyCode(event.data)}`);
    }

    function getElapsedTime() {
        if(timer == null) {
            timer = new Date().getTime();
            return 0;
        }

        let elapsed = new Date().getTime() - timer;
        return elapsed;
    }

    function submit() {
        console.log(JSON.stringify(queue));
    }
</script>

<div class="container" style="height: calc(100%);">
    <div class="columns is-vcentered" style="height: 100%;">
        <div class="column is-half is-offset-one-quarter">
            <div class="box">
                <!--<p class="title is-6">아래의 텍스트를 입력하세요</p>-->
                <p class="subtitle is-4">가을 속의 별들을 다 헬 듯합니다.</p>
                <p class="subtitle is-4">The car turned the corner.</p>
                <div class="level">
                    <input class="input " type="text" style="width: 100%" on:keyup={onKeyUp} on:keydown={onKeyDown} on:compositionupdate={onKeyPress}>&nbsp;&nbsp;&nbsp;
                    <button class="button is-success" >확인</button>
                </div>
            </div>
        </div>
    </div>
</div>