export async function get() {
    let res = await fetch('http://127.0.0.1:5000/get_script');

    return {
        body: await res.text(),
    }
}