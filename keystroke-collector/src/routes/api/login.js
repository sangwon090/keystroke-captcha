function getFormBody(body) {
    return [...body.entries()].reduce((data, [k, v]) => {
      let value = v;
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      if (k in data)
        data[k] = Array.isArray(data[k]) ? [...data[k], value] : [data[k], value];
      else data[k] = value;
      return data;
    }, {});
  }

export async function post(req) {
    console.log(getFormBody(req.body));
    let res = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        body: JSON.stringify(getFormBody(req.body)),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return {
        body: await res.text(),
    }
}