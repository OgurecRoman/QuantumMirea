const amqp = require('amqplib');

async function connectRabbit(){
    try{
        const client = await amqp.connect({
            hostname: "localhost",
            port: 5672,
            username: "guest",
            password: "guest",
            vhost: "/",
        });
        return client;
    } catch (error) {
        console.error('RabbitMQ connection error:', error);
        throw error;
    }
}

export { connectRabbit }
