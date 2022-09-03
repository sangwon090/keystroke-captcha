<script>
    import { onMount } from 'svelte';

    const header = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache',
        },
        credentials: 'include',
    };


    onMount(async () => {
        fetch('/api/auth/logout', header).then(async (res) => {
            if(res.status == 500) {
                alert('로그아웃을 하는 도중 오류가 발생했습니다.\n관리자에게 문의하세요.');
            }

            window.location.href = '/';
        });
    });
</script>