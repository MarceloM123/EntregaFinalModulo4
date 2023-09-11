export default class API {
    static port = 8001;
    static host = "192.168.1.74";

    static URL(path) {
        return `http://${this.host}:${this.port}/${path}`;
    }

    static async POST(path, body) {
        const url = this.URL(path);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        })
        //.then(response => response.json()).then(data => console.log(data))

        if (!response.ok) {
            throw new Error(`POST request to ${url} failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
}
