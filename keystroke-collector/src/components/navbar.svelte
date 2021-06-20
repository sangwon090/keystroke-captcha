<script>
    let loggedin = false;
</script>

<nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/">키스트로크 수집기</a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
            {#if loggedin }
                <a class="navbar-item" href="/logout">로그아웃</a>
            {:else}
                <a class="navbar-item" href="/login">로그인</a>
                <a class="navbar-item" href="/register">회원가입</a>
            {/if}
        </div>
    </div>
</nav>