// pages/api/register.js
import { hash } from 'bcryptjs';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword,
    createdAt: new Date(),
  };

  await db.collection('users').insertOne(newUser);

  res.status(201).json({ message: 'User created' });
}
