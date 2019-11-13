export function Post(route, object) {
    return fetch(
        route,
        {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
}