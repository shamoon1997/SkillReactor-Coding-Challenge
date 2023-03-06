import express, { Router, Request, Response } from 'express';

const router = express.Router();

const { v1: uuidv1 } = require('uuid');

const Redis = require('ioredis');
const redis = new Redis();

router.post('/store', async (req: Request, res: Response) => {
  try {
    const imageName: string = req.body?.imageName;
    const imageLink: string = req.body?.imageLink;

    console.log('imageName', imageName);
    console.log('imageLink', imageLink);

    const uniqueID: string = uuidv1();
    await redis.set(
      uniqueID,
      JSON.stringify({
        imageName: imageName,
        imgLink: imageLink,
      })
    );

    const data = JSON.parse(await redis.get(uniqueID));
    res.status(200).send(uniqueID);
  } catch (error) {
    console.log(error);
  }
});

router.get('/get', async (req: Request, res: Response) => {
  const keys = await redis.keys('*');
  let values = [];
  for (let i = 0; i < keys.length; i++) {
    values.push(JSON.parse(await redis.get(keys[i])));
  }
  res.status(200).send(values);
});

router.get('/get/name/:name', async (req: Request, res: Response) => {
  const name: string = req.params.name;
  console.log('name', name);
  const keys: string[] = await redis.keys('*');
  let values = [];
  for (let i = 0; i < keys.length; i++) {
    values.push(JSON.parse(await redis.get(keys[i])));
  }
  const found = values.filter((value) => {
    if (value.imageName.toLowerCase().includes(name.toLowerCase())) {
      return value;
    }
  });
  res.status(200).send(found);
});

export default router;
