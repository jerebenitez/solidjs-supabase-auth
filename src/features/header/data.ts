import { NotificationSchema } from "./schemas";

export const notifications: NotificationSchema[] = [
    {
        id: 1,
        from: {
            photo: "https://res.cloudinary.com/jerrick/image/upload/v1680958924/643165cc56d4cd001d205b3c.jpg",
            name: "Albert Einstein"
        },
        read: false,
        type: "message",
        message: "Life is like riding a bicycle: To keep your balance, you must keep moving.",
        createdOn: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }, {
        id: 2,
        from: {
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjRzc1zHhqYFCEW1Chqwjv2oR3dR5KX2efZQ&s",
            name: "Richard Feynman"
        },
        read: true,
        type: "like",
        target: {
            url: "/comment/123",
            type: "comment"
        },
        createdOn: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }
]
