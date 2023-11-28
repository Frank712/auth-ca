import express from "express";

export interface Options {
  port?: number;
}

export class Server {
  public readonly app = express();
  public readonly port: number;

  constructor(options: Options) {
    const { port = 3100 } = options;
    this.port = port;
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`Server running in port ${this.port}`);
    });
  }
}
