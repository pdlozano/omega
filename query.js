const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function query(search) {
    return fetch(
        "https://api-us-west-2.graphcms.com/v2/ck8kzgr080n8v01xmbi0m49t1/master",
        {
            method: "POST",
            body: JSON.stringify({
                query: search,
            }),
        }
    ).then((res) => res.json());
}

module.exports = {
    query,
}
