const amqp = require('amqplib');

class RabbitMQService {
  private client: any;
  private channel: any;
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try{
        this.client = await amqp.connect({
            hostname: process.env.RABBITMQ_HOST,
            port: process.env.RABBITMQ_PORT,
            username: process.env.RABBITMQ_USERNAME,
            password: process.env.RABBITMQ_PASSWORD,
            vhost: process.env.RABBITMQ_VHOST,
        });
        
        this.channel = await this.client.createChannel();
        this.isInitialized = true;

        console.log("Success connection to RabbitMQ")
    }catch (error) {
        console.error('RabbitMQ connection error:', error);
        throw error;
    }
  } 

  async getChannel() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.channel;
  }

  async sendToQueue(queueName: string, message: any) {
    const channel = await this.getChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
      persistent: true
    });
  }

  async assertQueue(queueName: string){
    const channel = await this.getChannel();
    await channel.assertQueue(queueName, {
      durable: true
    });

    console.log(`Add queue ${queueName}`);
  }
}

const rabbitMQ = new RabbitMQService();

export { rabbitMQ }
