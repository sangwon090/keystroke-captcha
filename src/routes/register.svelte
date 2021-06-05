<script>
    import Navbar from '../components/navbar.svelte';
    import Message from '../components/message.svelte';

    import { onMount } from 'svelte';

    let error = '';

    const errorMessage = {
        'INVALID_ID': '아이디는 소문자 또는 숫자를 포함하여 3자 이상 16자 이하이어야 합니다.',
        'INVALID_EMAIL': '이메일 형식이 올바르지 않습니다.',
        'INVALID_PASSWORD': '비밀번호는 소문자, 대문자, 특수문자, 숫자를 모두 포함하여 8자 이상이어야 합니다.',
        'CHECK_PASSWORD': '비밀번호를 확인하세요.',
    };

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    onMount(() => {
        error = errorMessage[getUrlParameter('err')];
    });
</script>
<Navbar/>
<div class="columns" style="align-items: center; height: calc(100vh - 52px);">
    <div class="column is-4 is-offset-4">
        <form action="/api/register" method="POST">
            <h1 class="title">회원가입</h1>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="text" name="id" placeholder="아이디" required>
                    <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="email" name="email" placeholder="이메일">
                    <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" name="password" placeholder="비밀번호" required>
                    <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" name="password_check" placeholder="비밀번호 확인" required>
                    <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            {#if error != undefined }
                <Message message={error} style="is-danger"/>
            {/if}
            <div class="buttons is-right">
                <button class="button is-success">회원가입</button>
            </div>
        </form>
    </div>
</div>
