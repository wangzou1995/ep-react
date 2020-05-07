
const GlobalNotification = (type: React.ReactText, nessage: string, description: string) => {
    //@ts-ignore
    notification[type]({
        message: nessage,
        description:
            description,
    });
};
export default GlobalNotification