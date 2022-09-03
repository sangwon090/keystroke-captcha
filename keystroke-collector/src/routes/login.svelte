<script>
    import Navbar from '../components/navbar.svelte';
    import Message from '../components/message.svelte';

    import { onMount } from 'svelte';
    import { getParameter } from '../utils/query.js';

    let status = 0;

    const errorMessage = {
        0: '아이디가 존재하지 않거나 비밀번호가 틀립니다.',
        500: '알 수 없는 서버 오류가 발생했습니다. 관리자에게 문의하세요.',
    };

    onMount(() => {
        status = getParameter('status', window.location.href);
    });
</script>

<Navbar/>
<div class="columns" style="align-items: center; height: calc(100vh - 52px);">
    <div class="column is-4 is-offset-4">
        <form action="/api/auth/login" method="POST">
            <h1 class="title">로그인</h1>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="text" name="id" placeholder="아이디" required>
                    <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" name="password" placeholder="비밀번호" required>
                    <span class="icon is-small is-left"><i class="fas fa-lock"></i></span>
                </p>
            </div>
            {#if status != undefined }
                <Message message={errorMessage[status]} style="is-danger"/>
            {/if}
            <div class="buttons is-right">
                <button class="button is-success" type="submit">로그인</button>
            </div>
        </form>
    </div>
</div>
