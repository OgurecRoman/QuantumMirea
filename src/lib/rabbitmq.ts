const amqp = require('amqplib');
import * as configurationServer from '../servers/configurations/configuration.js'

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

  async assertQueue(queueName: string){
    const channel = await this.getChannel();
    await channel.assertQueue(queueName, {
      durable: true
    });

    console.log(`Add queue ${queueName}`);
  }

  async check_connection() {
    const channel = await this.getChannel();
    
    const configurations = await configurationServer.getConfiguration()
    for (const conf of configurations){
        const queueInfo = await this.channel.checkQueue(`${conf.id}-queue`);
        if (queueInfo.consumerCount == 0){
            console.log(`соединение с ${conf.id}-queue было потеряно, конфигурация отключена`)
            configurationServer.turnOffConfiguration(conf.id);
        } 
    }
  }

  async sendToQueue(queueName: string, message: any) {
    const channel = await this.getChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
      persistent: true
    });
  }
}

const rabbitMQ = new RabbitMQService();

export { rabbitMQ }
