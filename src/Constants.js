
export default class Constants
{
    static get dbTable()
    {
        return {
            users: "users",
            trainers: "trainers",
            seekers: "seekers",
            requests: "requests"
        };
    }

    static get userTypes()
    {
        return {
            trainer: "trainer",
            seeker: "seeker",
        };
    }

    static get requestStatus()
    {
        return {
            pending: "pending",
            active: "active"
        };
    }

}