export const securityQueryRepository = {

    async findActiveSessionById(id: string) {
        return [
            {
                "ip": "string",
                "title": "string",
                "lastActiveDate": "string",
                "deviceId": "string"
            }
        ]
    }
}