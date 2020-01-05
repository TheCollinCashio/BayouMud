export function Post(route: string, object: any) {
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