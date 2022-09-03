export async function request(url, method, body) {
    const req = await fetch(url, {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    });

    return await req.text();
}

export async function isAuthorized() {
    const res = await request('/api/auth/is_authorized', 'GET');

    return (JSON.parse(res).result === true) ? true : false;
}

export async function requestScript() {
    const res = await request('/api/script/download', 'GET');

    return await JSON.parse(res);
}

export async function submitData(data) {
    const res = await request('/api/script/submit', 'POST', data);

    return res;
}