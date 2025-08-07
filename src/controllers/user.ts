import { Request, Response } from 'express';
import * as userServer from '../servers/user/user.js';
import * as gatesServer from '../servers/user/gates.js';
import * as algorithmsServer from '../servers/user/algorithms.js';

function getAuth(req: Request, res: Response): [string, string] | null{
  const provider = req.headers['provider'];
  const userId = req.headers['id'];

  if (!provider || !userId || typeof provider != 'string' || typeof userId != 'string') {
    res.status(400).json({ 
        message: 'provider, id are wrong',
        received: req.body
    });
    return null;
  }
  return [provider, userId]
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const user = await userServer.getUser(provider, userId);

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Gates

export async function getGates(req: Request, res: Response) {  
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const gates = await gatesServer.getUserGates(provider, userId);
    res.json(gates);
  } catch (error) {
    res.status(500).json({ error: 'Error getting gates' });
  }
};

export const postGate = async (req: Request, res: Response) => {
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const gates = req.body.gates;

    const canAdd = await userServer.canAddCustomGatesBulk(provider, userId, gates.length)

    if (canAdd){
      const status = await gatesServer.upsertUserWithMultipleGates(provider, userId, gates);
      res.json(status);
    }
  
  } catch (error) {
    res.status(500).json({ error: 'Error adding gates' });
  }
};

export const patchGate = async (req: Request, res: Response) => {
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const gate = req.body;

    await userServer.getUser(provider, userId);

    const status = await gatesServer.updateUserGate(provider, userId, gate);
    res.json(status);
  
  } catch (error) {
    res.status(500).json({ error: 'Error updating gates' });
  }
};

export const deleteGate = async (req: Request, res: Response) => {
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const gateId = req.body.id;

    await userServer.getUser(provider, userId);

    const status = await gatesServer.deleteUserGate(provider, userId, gateId);
    res.json(status);
  
  } catch (error) {
    res.status(500).json({ error: 'Error deleting gates' });
  }
};

// Algorithms

export const getAllAlgorithms = async (req: Request, res: Response) => {
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const algorithms = await algorithmsServer.getUserAlgorithms(provider, userId);
    res.json(algorithms);
  } catch (error) {
    res.status(500).json({ error: 'Error getting algorithms' });
  }
};

export const postAlgorithm = async (req: Request, res: Response) => {
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const algorithm = req.body;

    const canAdd = await userServer.canAddCustomAlgorithm(provider, userId)

    if (canAdd){
      const status = await algorithmsServer.upsertUserWithAlgorithm(provider, userId, algorithm);
      res.json(status);
    }
  
  } catch (error) {
    res.status(500).json({ error: 'Error adding algorithm' });
  }
};

export const patchAlgorithm = async (req: Request, res: Response) => {
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const algorithm = req.body;

    await userServer.getUser(provider, userId);

    const status = await algorithmsServer.updateUserAlgorithm(provider, userId, algorithm);
    res.json(status);
  
  } catch (error) {
    res.status(500).json({ error: 'Error updating algorithm' });
  }
};

export const deleteAlgorithm = async (req: Request, res: Response) => {
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const algorithmId = req.body.id;

    await userServer.getUser(provider, userId);

    const status = await algorithmsServer.deleteUserAlgorithm(provider, userId, algorithmId);
    res.json(status);
  
  } catch (error) {
    res.status(500).json({ error: 'Error deleting algorithm' });
  }
};

// CompositeGates

export async function getCompositeGates(req: Request, res: Response) {  
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const gates = await gatesServer.getCompositeGates(provider, userId);
    res.json(gates);
  } catch (error) {
    res.status(500).json({ error: 'Error getting composite gates' });
  }
};

export const postCompositeGates = async (req: Request, res: Response) => {
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const gates = req.body.gates;

    await userServer.getUser(provider, userId);

    const status = await gatesServer.upsertUserWithMultipleCompositeGates(provider, userId, gates);
    res.json(status);
  
  } catch (error) {
    res.status(500).json({ error: 'Error adding composite gates' });
  }
};

export const patchCompositeGates = async (req: Request, res: Response) => {
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const gate = req.body;

    await userServer.getUser(provider, userId);

    const status = await gatesServer.updateCompositeGate(provider, userId, gate);
    res.json(status);
  
  } catch (error) {
    res.status(500).json({ error: 'Error updating composite gates' });
  }
};

export const deleteCompositeGates = async (req: Request, res: Response) => {
  try {
    const authResult = getAuth(req, res);
    if (!authResult)
      return;

    const [provider, userId] = authResult;
    const gateId = req.body.id;

    await userServer.getUser(provider, userId);

    const status = await gatesServer.deleteCompositeGate(provider, userId, gateId);
    res.json(status);
  
  } catch (error) {
    res.status(500).json({ error: 'Error deleting composite gates' });
  }
};