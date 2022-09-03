<script>
    import * as Api from '../utils/api.js';
    import { onMount } from 'svelte';

    let authorized = false;
    let account = {};
    let data = [];

    onMount(async () => {
        authorized = await Api.isAuthorized();

        if(authorized) {
            const res = await JSON.parse(await Api.request('/api/debug/get_data'));
            account = res.account;
            data = res.data;
            console.log(JSON.stringify(data));
        }
    });
</script>

<style>
    p {
        color: hsl(348, 100%, 61%);
    }
</style>

<div class="container">
    <br/>
    <h1 class="title">Hidden Page</h1>
    <br/>

    {#if authorized}
        <h1 class="subtitle">Account</h1>
        <table class="table is-bordered is-hoverable">
            <tbody>
                <tr>
                    <th>id</th>
                    <td>{account.id}</td>
                </tr>
                <tr>
                    <th>email</th>
                    <td>{account.email}</td>
                </tr>
                <tr>
                    <th>memo</th>
                    <td>{account.memo}</td>
                </tr>
                <tr>
                    <th>progress</th>
                    <td>{account.progress}</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <h1 class="subtitle">Data</h1>
        <table class="table is-bordered is-hoverable">
            <thead>
                <tr>
                    <th>_id</th>
                    <th>agent</th>
                    <th>progress</th>
                </tr>
            </thead>
            <tbody>
                {#each data as datum}
                    <tr>
                        <td>{datum._id}</td>
                        <td>{datum.agent}</td>
                        <td>{datum.progress}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <p>Access Denied</p>
    {/if}
</div>
