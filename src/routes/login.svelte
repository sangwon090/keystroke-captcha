<script>
    import Navbar from '../components/navbar.svelte';
    import Message from '../components/message.svelte';
</script>

<Navbar/>
<div class="columns" style="align-items: center; height: calc(100vh - 52px);">
    <div class="column is-4 is-offset-4">
        <form action="/api/login" method="POST">
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
            <Message message="아이디 또는 비밀번호가 다릅니다." style="is-danger"/>
            <div class="buttons is-right">
                <button class="button is-success" type="submit">로그인</button>
            </div>
        </form>
    </div>
</div>
