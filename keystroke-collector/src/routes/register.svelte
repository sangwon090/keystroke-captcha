<script>
    import Navbar from '../components/navbar.svelte';
    import Message from '../components/message.svelte';

    import { onMount } from 'svelte';
    import { getParameter } from '../utils/query.js';

    let status = 0;

    const errorMessage = {
        0: '아이디 형식이 올바르지 않습니다.\n아이디는 영문과 숫자를 포함하며 4글자 이상, 16글자 이하여야 합니다.',
        1: '이메일 형식이 올바르지 않습니다.',
        2: '비밀번호 확인이 올바르지 않습니다.',
        3: '비밀번호 형식이 틀립니다.\n비밀번호는 대문자 소문자 숫자를 모두 포함하며 8글자 이상, 64글자 이하여야 합니다.',
        4: '메모 형식이 올바르지 않습니다.\n메모는 128글자 이하여야 합니다.',
        5: '이미 가입된 계정입니다.',
        500: '알 수 없는 서버 오류가 발생했습니다. 관리자에게 문의하세요.',
    };

    onMount(() => {
        status = getParameter('status', window.location.href);
    });
</script>
<Navbar/>
<div class="columns" style="align-items: center; height: calc(100vh - 52px);">
    <div class="column is-4 is-offset-4">
        <form action="/api/auth/register" method="POST">
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
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="text" name="memo" placeholder="메모">
                    <span class="icon is-small is-left">
                    <i class="fas fa-sticky-note"></i>
                    </span>
                </p>
            </div>
            {#if status != undefined }
                <Message message={errorMessage[status]} style="is-danger"/>
            {/if}
            <div class="buttons is-right">
                <button class="button is-success">회원가입</button>
            </div>
        </form>
    </div>
</div>
