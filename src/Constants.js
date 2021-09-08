
export default class Constants
{
    static get dbTable()
    {
        const dbTable = {
            users: "users",
            trainers: "trainers",
            seekers: "seekers",
            requests: "requests"
        };
        return dbTable;
    }

    static get userTypes()
    {
        const userTypes = {
            trainer: "trainer",
            seeker: "seeker",
        };
        return userTypes;
    }

    static get requestStatus()
    {
        const userTypes = {
            pending: "pending",
            accepted: "accepted"
        };
        return userTypes;
    }

}